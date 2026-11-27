#!/usr/bin/env bash

set -euo pipefail

echo "Iniciando deploy da aplicacao TaskFlow..."

echo "Construindo imagem Docker e iniciando container..."
docker compose up -d --build --wait --wait-timeout 120

echo "Verificando status do container..."
docker compose ps

echo "Validando Health Check..."
curl --fail --silent --show-error http://localhost:3000/health

echo ""
echo "Exibindo logs da aplicacao..."
docker compose logs --tail=20

echo "Deploy realizado com sucesso!"