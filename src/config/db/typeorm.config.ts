import { config } from 'dotenv';
import { DataSourceOptions, DataSource } from 'typeorm';

config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../../db/**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../../db/migrations/*.{ts,js}'],
  synchronize: false,
};

export const AppDataSource = new DataSource(dataSourceOptions);
