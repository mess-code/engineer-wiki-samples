import { Transaction } from 'sequelize';
import db from './models';
import { umzug } from './migrations';

const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const test1 = async (index: number) => {
  const t1 = await db.sequelize.transaction();
  const products = await db.Product.findAll({
    lock: Transaction.LOCK.UPDATE,
    transaction: t1,
  });
  console.timeLog();
  await sleep(5000);
  const product = products[0].get();
  console.log('====================================', product.amount);
  await db.Product.update({
    amount: product.amount - 1
  }, {
    where: { id: product.id },
    transaction: t1,
  });
  await t1.commit();
};


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

  const promises: Promise<void>[] = [];
  console.time();
  promises.push(test1(1));
  await sleep(2000);
  promises.push(test1(2));
  await Promise.all(promises);
  console.timeEnd();

})();
