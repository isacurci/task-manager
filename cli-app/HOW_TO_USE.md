# Como Usar o Task CLI

## 1. Instalação e Configuração

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

## 2. Uso

### Login

Antes de criar tarefas, você precisa fazer login com um usuário que exista no seu banco de dados.

```bash
# Uso: task-cli login <email> <senha>
task-cli login "seu-email@exemplo.com" "sua-senha"
```

Se for bem-sucedido, seu token de autenticação será salvo localmente.

### Criar uma Tarefa

Uma vez logado, você pode criar uma nova tarefa.

```bash
# Uso: task-cli create-task <título> [descrição]
task-cli create-task "Minha nova tarefa" "Adicione uma descrição (opcional)."
```

A nova tarefa será impressa no console após a criação.

### Logout

Quando terminar, você pode fazer logout. Isso limpará seu token de autenticação salvo.

```bash
task-cli logout
``` 