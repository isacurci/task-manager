# Sistema de Gerenciamento de Tarefas com Kanban

Um aplicativo full-stack de gerenciamento de tarefas construído com React, Express e Prisma, seguindo o padrão MVC.

## Estrutura do Projeto

```
kanban-mvc/
├── api-controller/     # Backend (Express + Prisma)
└── front-end-view/     # Frontend (React + TypeScript)
```

## Funcionalidades

- [X] Autenticação de usuários (login/registro).
- [X] Visualização de tarefas em um formato de quadro.
- [X] Gerenciamento de tarefas (criar, atualizar, excluir, mover).
- [X] Edição de tarefas

## Tecnologias

### Frontend (`front-end-view/`)
- React com TypeScript
- React Router para navegação
- Tailwind CSS para estilização
- Axios para chamadas de API
- Context API para gerenciamento de estado

### Backend (`api-controller/`)
- Node.js com Express
- TypeScript
- Prisma ORM
- Banco de dados PostgreSQL
- Autenticação JWT

## Endpoints da API

### Autenticação
- POST `/auth/register` - Registrar um novo usuário
- POST `/auth/login` - Login do usuário
- GET `/auth/me` - Obter informações do usuário atual

### Tarefas
- GET `/tasks` - Obter todas as tarefas
- POST `/tasks` - Criar uma nova tarefa
- GET `/tasks/:id` - Obter uma tarefa específica
- PUT `/tasks/:id` - Atualizar uma tarefa
- DELETE `/tasks/:id` - Excluir uma tarefa
- PATCH `/tasks/:id/move` - Mover uma tarefa para um status diferente

## Microsserviço de CLI

### Como Usar o Task CLI


#### 1. Instalação e Configuração

Primeiro, certifique-se de que o `api-controller` principal esteja em execução. Em seguida, siga estes passos para instalar e configurar o CLI.

```bash
# 1. Navegue até o diretório do CLI
cd cli-app

# 2. Instale as dependências
npm install

# 3. Compile o código TypeScript
npm run build

# 4. Vincule o CLI para torná-lo globalmente disponível no seu sistema
npm link
```

Após executar `npm link`, o comando `task-cli` estará disponível em qualquer diretório no seu terminal.

#### 2. Uso

##### Login

Antes de criar tarefas, você precisa fazer login com um usuário que exista no seu banco de dados.

```bash
# Uso: task-cli login <email> <senha>
task-cli login "seu-email@exemplo.com" "sua-senha"
```

Se for bem-sucedido, seu token de autenticação será salvo localmente.

##### Criar uma Tarefa

Uma vez logado, você pode criar uma nova tarefa.

```bash
# Uso: task-cli create-task <título> [descrição]
task-cli create-task "Minha nova tarefa" "Adicione uma descrição (opcional)."
```

A nova tarefa será impressa no console após a criação.

##### Logout

Quando terminar, você pode fazer logout. Isso limpará seu token de autenticação salvo.

```bash
task-cli logout
```
