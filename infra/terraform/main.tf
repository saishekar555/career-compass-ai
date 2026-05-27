# Terraform — minimal Azure footprint for ResumeIQ Enterprise.
# Resource Group + ACR + AKS. Extend with PostgreSQL Flexible Server,
# Key Vault, Storage Account and Front Door for production.

terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 3.110" }
  }
  backend "azurerm" {
    # Configure via -backend-config in CI:
    #   resource_group_name, storage_account_name, container_name, key
  }
}

provider "azurerm" {
  features {}
}

variable "environment" { type = string }
variable "location"    { type = string  default = "eastus" }
variable "prefix"      { type = string  default = "resumeiq" }

locals {
  name = "${var.prefix}-${var.environment}"
  tags = {
    app         = "resumeiq"
    environment = var.environment
    managed_by  = "terraform"
  }
}

resource "azurerm_resource_group" "this" {
  name     = "rg-${local.name}"
  location = var.location
  tags     = local.tags
}

resource "azurerm_container_registry" "acr" {
  name                = replace("acr${local.name}", "-", "")
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  sku                 = "Standard"
  admin_enabled       = false
  tags                = local.tags
}

resource "azurerm_kubernetes_cluster" "aks" {
  name                = "aks-${local.name}"
  resource_group_name = azurerm_resource_group.this.name
  location            = azurerm_resource_group.this.location
  dns_prefix          = local.name

  default_node_pool {
    name       = "system"
    vm_size    = "Standard_D2s_v5"
    node_count = var.environment == "prod" ? 3 : 1
  }

  identity { type = "SystemAssigned" }
  tags     = local.tags
}

resource "azurerm_role_assignment" "aks_acr_pull" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
}

output "acr_login_server" { value = azurerm_container_registry.acr.login_server }
output "aks_name"         { value = azurerm_kubernetes_cluster.aks.name }
output "rg_name"          { value = azurerm_resource_group.this.name }
