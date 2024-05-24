import "reflect-metadata";
import { DataSource } from "typeorm";
import { EnergyBills } from "./entitys/EnergyBillsEntity"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "challenge-lumi",
  synchronize: true,
  logging: false,
  entities: [EnergyBills],
  migrations: [],
  subscribers: [],
});