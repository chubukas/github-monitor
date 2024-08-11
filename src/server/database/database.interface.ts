export interface IDatabase {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: number | string;
  dialect?: string;
  urlDatabase?: string;
  ssl?: boolean;
  dialectOptions?: object;
  protocol: string;
  logging?: boolean | ((query: string) => void);
}

export interface IDatabaseConfig {
  development: IDatabase;
  production: IDatabase;
}
