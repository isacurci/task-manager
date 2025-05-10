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
