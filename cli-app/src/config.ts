import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const homeDir = os.homedir();
const configPath = path.join(homeDir, '.task-cli-config.json');

interface Config {
  token?: string;
}

const readConfig = (): Config => {
  if (!fs.existsSync(configPath)) {
    return {};
  }
  const rawData = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(rawData);
};

const writeConfig = (config: Config) => {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
};

export const saveToken = (token: string) => {
  const config = readConfig();
  config.token = token;
  writeConfig(config);
};

export const getToken = (): string | null => {
  const config = readConfig();
  return config.token || null;
};

export const clearToken = () => {
  const config = readConfig();
  delete config.token;
  writeConfig(config);
}; 