import { Sequelize } from 'sequelize';
import config from '../config';
import { createProductModel, Product } from './product.model';

export interface DbInterface {
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
  Product: typeof Product;
}

const { host, port, username, password } = config.database;
const sequelize = new Sequelize({
  host,
  port,
  username,
  password,
  dialect: 'postgres',
  define: {
    timestamps: true,
    underscored: true,
  }
});

const db: DbInterface = {
  sequelize,
  Sequelize,
  Product: createProductModel(sequelize),
};

Object.keys(db).forEach(modelName => {
  if ((db as any)[modelName].associate) {
    (db as any)[modelName].associate(db);
  }
});

export default db;
