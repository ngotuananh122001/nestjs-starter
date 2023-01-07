import { DataSource } from "typeorm";
require('dotenv').config();
import { databaseConfig } from "./database.config";

const datasource = new DataSource(databaseConfig); 
datasource.initialize();

export default datasource; 