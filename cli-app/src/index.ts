#!/usr/bin/env node

import { Command } from 'commander';
import { login, createTask } from './api';
import { saveToken, getToken, clearToken } from './config';

const program = new Command();

program
  .name('task-cli')
  .description('A simple CLI to interact with the Task Manager API')
  .version('1.0.0');

program
  .command('login')
  .description('Login to the Task Manager API')
  .argument('<email>', 'Your email')
  .argument('<password>', 'Your password')
  .action(async (email, password) => {
    try {
      console.log('Attempting to log in...');
      const { token } = await login(email, password);
      saveToken(token);
      console.log('Login successful! Token saved.');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred.');
      }
      process.exit(1);
    }
  });

program
  .command('create-task')
  .description('Create a new task')
  .argument('<title>', 'Title of the task')
  .argument('[description]', 'Description of the task', '')
  .action(async (title, description) => {
    try {
      const token = getToken();
      if (!token) {
        console.error('You are not logged in. Please run the login command first.');
        process.exit(1);
      }
      console.log('Creating task...');
      const task = await createTask(title, description, token);
      console.log('Task created successfully!');
      console.log(JSON.stringify(task, null, 2));
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred.');
      }
      process.exit(1);
    }
  });

program
  .command('logout')
  .description('Log out and clear the saved token')
  .action(() => {
    try {
      clearToken();
      console.log('Logged out successfully.');
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Error: ${error.message}`);
      } else {
        console.error('An unknown error occurred.');
      }
      process.exit(1);
    }
  });

program.parse(process.argv); 