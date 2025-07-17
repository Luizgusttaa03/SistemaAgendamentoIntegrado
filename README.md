# API de Agendamento de Barbearia

## Descrição
API backend desenvolvida em NestJS com TypeScript para sistema de agendamento de barbearia. Utiliza Prisma ORM para PostgreSQL, autenticação JWT, validação de DTOs e arquitetura modular.

## Tecnologias Utilizadas
- **NestJS** - Framework backend
- **TypeScript** - Linguagem de programação
- **Prisma ORM** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados
- **JWT** - Autenticação
- **class-validator** - Validação de DTOs
- **bcrypt** - Hash de senhas
- **ts-node-dev** - Hot reload para desenvolvimento

## Estrutura do Projeto
```
api/
├── src/
│   ├── barbeiro/           # Módulo Barbeiro
│   │   ├── dto/           # DTOs de validação
│   │   ├── barbeiro.controller.ts
│   │   ├── barbeiro.service.ts
│   │   └── barbeiro.module.ts
│   ├── prisma/            # Configuração do Prisma
│   │   ├── prisma.service.ts
│   │   └── prisma.module.ts
│   ├── app.module.ts      # Módulo principal
│   └── main.ts           # Arquivo de entrada
├── prisma/
│   └── schema.prisma     # Schema do banco de dados
├── .env                  # Variáveis de ambiente
└── package.json
```

## Entidades do Banco de Dados
- **Cliente**: id, nome, telefone, criadoEm
- **Barbeiro**: id, nome, criadoEm
- **Servico**: id, nome, duracaoMinutos, preco
- **Agendamento**: id, clienteId, barbeiroId, servicoId, dataAgendamento, criadoEm
- **Usuario**: id, email, senhaHash, criadoEm

## Configuração do Ambiente

### Pré-requisitos
- Node.js (versão 16 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Clone o repositório e navegue para a pasta api:
```bash
cd api
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente no arquivo `.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/barbearia_db"
JWT_SECRET="sua_jwt_secret_aqui"
```

4. Execute as migrações do Prisma:
```bash
npx prisma migrate dev --name init
```

5. Gere o cliente do Prisma:
```bash
npx prisma generate
```

### Executando a Aplicação

#### Modo Desenvolvimento (com hot reload)
```bash
npm run start:dev
```

#### Modo Produção
```bash
npm run build
npm run start:prod
```

#### Outros comandos úteis
```bash
# Formatação do código
npm run format

# Linting
npm run lint

# Testes
npm run test

# Visualizar banco de dados
npx prisma studio
```

## Endpoints da API

### 🔐 Autenticação

#### POST /auth/register
Registra um novo usuário administrador.

**Body:**
```json
{
  "email": "admin@exemplo.com",
  "senha": "senha123"
}
```

**Validações:**
- email: obrigatório, formato de email válido
- senha: obrigatório, mínimo 6 caracteres

**Resposta:**
```json
{
  "id": "uuid",
  "email": "admin@exemplo.com",
  "criadoEm": "2025-07-16T20:30:00.000Z"
}
```

#### POST /auth/login
Autentica um usuário e retorna token JWT.

**Body:**
```json
{
  "email": "admin@exemplo.com",
  "senha": "senha123"
}
```

**Resposta:**
```json
{
  "access_token": "jwt-token-aqui",
  "user": {
    "id": "uuid",
    "email": "admin@exemplo.com",
    "criadoEm": "2025-07-16T20:30:00.000Z"
  }
}
```

### 👥 Barbeiros

#### GET /barbeiros (Pública)
Lista todos os barbeiros cadastrados.

#### POST /barbeiros (Protegida)
Cria um novo barbeiro.

**Headers:**
```
Authorization: Bearer jwt-token-aqui
```

**Body:**
```json
{
  "nome": "João Silva"
}
```

#### GET /barbeiros/:id (Protegida)
Busca um barbeiro específico por ID.

#### PUT /barbeiros/:id (Protegida)
Atualiza os dados de um barbeiro.

#### DELETE /barbeiros/:id (Protegida)
Remove um barbeiro.

### 👤 Clientes

#### POST /clientes (Pública)
Cria um novo cliente.

**Body:**
```json
{
  "nome": "Maria Santos",
  "telefone": "(11) 99999-9999"
}
```

**Validações:**
- nome: obrigatório, mínimo 2 caracteres
- telefone: obrigatório, formato válido, único

#### GET /clientes (Protegida)
Lista todos os clientes cadastrados.

#### GET /clientes/:id (Protegida)
Busca um cliente específico por ID com seus agendamentos.

#### PUT /clientes/:id (Protegida)
Atualiza os dados de um cliente.

#### DELETE /clientes/:id (Protegida)
Remove um cliente.

### 🎯 Serviços

#### GET /servicos (Pública)
Lista todos os serviços disponíveis.

#### POST /servicos (Protegida)
Cria um novo serviço.

**Body:**
```json
{
  "nome": "Corte de Cabelo",
  "duracaoMinutos": 30,
  "preco": 2500
}
```

**Validações:**
- nome: obrigatório, mínimo 2 caracteres
- duracaoMinutos: obrigatório, inteiro positivo
- preco: obrigatório, inteiro positivo (em centavos)

#### GET /servicos/:id (Pública)
Busca um serviço específico por ID.

#### PUT /servicos/:id (Protegida)
Atualiza os dados de um serviço.

#### DELETE /servicos/:id (Protegida)
Remove um serviço.

### 📅 Agendamentos

#### POST /agendamentos (Pública)
Cria um novo agendamento.

**Body:**
```json
{
  "clienteId": "uuid-do-cliente",
  "barbeiroId": "uuid-do-barbeiro",
  "servicoId": "uuid-do-servico",
  "dataAgendamento": "2025-07-17T14:00:00.000Z"
}
```

**Validações:**
- clienteId: obrigatório, UUID válido
- barbeiroId: obrigatório, UUID válido
- servicoId: obrigatório, UUID válido
- dataAgendamento: obrigatório, formato ISO de data

#### GET /agendamentos/admin (Protegida)
Lista todos os agendamentos (painel administrativo).

#### GET /agendamentos/cliente/:clienteId (Pública)
Lista agendamentos de um cliente específico.

#### GET /agendamentos/barbeiro/:barbeiroId (Protegida)
Lista agendamentos de um barbeiro específico.

#### GET /agendamentos/:id (Protegida)
Busca um agendamento específico por ID.

#### PUT /agendamentos/:id (Protegida)
Atualiza os dados de um agendamento.

#### DELETE /agendamentos/:id (Protegida)
Remove um agendamento.

### 🔒 Rotas Protegidas

Para acessar rotas protegidas, inclua o token JWT no cabeçalho:

```
Authorization: Bearer seu-jwt-token-aqui
```

## Estrutura de Resposta de Erro

```json
{
  "statusCode": 400,
  "message": ["erro de validação"],
  "error": "Bad Request"
}
```

## Exemplos de Uso Completos

### 1. Registrar um administrador:
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@exemplo.com", "senha": "senha123"}'
```

### 2. Fazer login:
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@exemplo.com", "senha": "senha123"}'
```

### 3. Criar um barbeiro (com token):
```bash
curl -X POST http://localhost:3000/barbeiros \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-jwt-token-aqui" \
  -d '{"nome": "João Silva"}'
```

### 4. Criar um cliente:
```bash
curl -X POST http://localhost:3000/clientes \
  -H "Content-Type: application/json" \
  -d '{"nome": "Maria Santos", "telefone": "(11) 99999-9999"}'
```

### 5. Criar um serviço (com token):
```bash
curl -X POST http://localhost:3000/servicos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu-jwt-token-aqui" \
  -d '{"nome": "Corte de Cabelo", "duracaoMinutos": 30, "preco": 2500}'
```

### 6. Criar um agendamento:
```bash
curl -X POST http://localhost:3000/agendamentos \
  -H "Content-Type: application/json" \
  -d '{
    "clienteId": "uuid-do-cliente",
    "barbeiroId": "uuid-do-barbeiro",
    "servicoId": "uuid-do-servico",
    "dataAgendamento": "2025-07-17T14:00:00.000Z"
  }'
```

### 7. Listar agendamentos (admin):
```bash
curl -X GET http://localhost:3000/agendamentos/admin \
  -H "Authorization: Bearer seu-jwt-token-aqui"
```

## Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Implemente as mudanças
4. Execute os testes
5. Faça um pull request

## Licença

Este projeto está sob a licença MIT.
