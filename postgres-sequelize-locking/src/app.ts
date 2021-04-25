import db from './models';
import { umzug } from './migrations';
import { testSelectForUpdate } from './samples/selectForUpdate.sample';

(async () => {
  try {
    await db.sequelize.authenticate();
  } catch (error) {
    console.log('==================== Db authentication failed ====================');
    throw error;
  }

  try {
    await umzug.up();
    console.log('-------------------- All migrations are run successfully ----------------------');
  } catch (error) {
    console.log('==================== Migration failed ====================');
    throw error;
  }

  testSelectForUpdate();

})();
