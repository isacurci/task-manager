# How to Use the Task CLI

This guide will walk you through setting up and using the `task-cli`.

## 1. Installation and Setup

First, make sure you have the main `api-controller` running. Then, follow these steps to install and set up the CLI.

```bash
# 1. Navigate to the CLI directory
cd cli-app

# 2. Install dependencies
npm install

# 3. Compile the TypeScript code
npm run build

# 4. Link the CLI to make it globally available on your system
npm link
```

After running `npm link`, the `task-cli` command will be available from any directory in your terminal.

## 2. Usage

Here are the commands you can use:

### Login

Before creating tasks, you need to log in with a user that exists in your database.

```bash
# Usage: task-cli login <email> <password>
task-cli login "your-email@example.com" "your-password"
```

If successful, your authentication token will be saved locally.

### Create a Task

Once logged in, you can create a new task.

```bash
# Usage: task-cli create-task <title> [description]
task-cli create-task "My new task" "This is an optional description."
```

The new task will be printed to the console upon creation.

### Logout

When you are finished, you can log out. This will clear your saved authentication token.

```bash
task-cli logout
``` 