import * as Umzug from 'umzug';
import db from '../models';

export const umzug = new Umzug({
  migrations: {
    path: __dirname,
    pattern: /\.migration\.ts$/,
    params: [
      db.sequelize.getQueryInterface(),
      db,
    ]
  },
  // indicates that the migration data should be store in the database
  // itself through sequelize. The default configuration creates a table
  // named `SequelizeMeta`.
  storage: 'sequelize',
  storageOptions: {
    sequelize: db.sequelize,
    tableName: 'SequelizeMeta'
  }
});
