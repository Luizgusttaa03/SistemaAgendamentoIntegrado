#!/bin/bash

# Script para testar a API do sistema de agendamento de barbearia

echo "🚀 Iniciando testes da API..."

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    local token=$5
    
    echo ""
    echo "📡 Testando: $description"
    echo "   $method $url"
    
    if [ -n "$token" ]; then
        if [ -n "$data" ]; then
            curl -s -X $method "http://localhost:3000$url" \
                -H "Content-Type: application/json" \
                -H "Authorization: Bearer $token" \
                -d "$data" | jq . 2>/dev/null || echo "Erro no JSON"
        else
            curl -s -X $method "http://localhost:3000$url" \
                -H "Authorization: Bearer $token" | jq . 2>/dev/null || echo "Erro no JSON"
        fi
    else
        if [ -n "$data" ]; then
            curl -s -X $method "http://localhost:3000$url" \
                -H "Content-Type: application/json" \
                -d "$data" | jq . 2>/dev/null || echo "Erro no JSON"
        else
            curl -s -X $method "http://localhost:3000$url" | jq . 2>/dev/null || echo "Erro no JSON"
        fi
    fi
}

# Aguardar a aplicação iniciar
echo "⏳ Aguardando aplicação iniciar..."
sleep 3

# 1. Testar endpoint de saúde
test_endpoint "GET" "/" "" "Endpoint de saúde"

# 2. Registrar um usuário admin
echo ""
echo "👤 Registrando usuário admin..."
REGISTER_RESPONSE=$(curl -s -X POST "http://localhost:3000/auth/register" \
    -H "Content-Type: application/json" \
    -d '{"email": "admin@barbearia.com", "senha": "senha123"}')

echo "$REGISTER_RESPONSE" | jq . 2>/dev/null || echo "Erro no registro"

# 3. Fazer login e obter token
echo ""
echo "🔑 Fazendo login..."
LOGIN_RESPONSE=$(curl -s -X POST "http://localhost:3000/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email": "admin@barbearia.com", "senha": "senha123"}')

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.access_token' 2>/dev/null)
echo "Token obtido: ${TOKEN:0:50}..."

# 4. Criar um barbeiro
test_endpoint "POST" "/barbeiros" '{"nome": "João Silva"}' "Criar barbeiro" "$TOKEN"

# 5. Listar barbeiros
test_endpoint "GET" "/barbeiros" "" "Listar barbeiros"

# 6. Criar um cliente
test_endpoint "POST" "/clientes" '{"nome": "Maria Santos", "telefone": "(11) 99999-9999"}' "Criar cliente"

# 7. Criar um serviço
test_endpoint "POST" "/servicos" '{"nome": "Corte de Cabelo", "duracaoMinutos": 30, "preco": 2500}' "Criar serviço" "$TOKEN"

# 8. Listar serviços
test_endpoint "GET" "/servicos" "" "Listar serviços"

echo ""
echo "✅ Testes concluídos!"
echo "🌐 Aplicação rodando em: http://localhost:3000"
echo "📚 Documentação: Veja o README.md para mais exemplos"
