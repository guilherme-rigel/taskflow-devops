
terraform {
  required_providers {
    local = {
      source  = "hashicorp/local"
      version = "~> 2.5"
    }
  }
}

resource "local_file" "configuracao_taskflow" {
  filename = "${path.module}/ambiente/config.json"

  content = jsonencode({
    projeto     = "TaskFlow"
    ambiente    = "desenvolvimento"
    porta       = 3000
    tecnologia  = "Node.js"
    integracao  = "GitHub Actions"
    gerenciado_por = "Terraform"
  })
}

output "arquivo_configuracao" {
  description = "Caminho do arquivo provisionado"
  value       = local_file.configuracao_taskflow.filename
}
