import { Transaction } from 'sequelize';
import db from '../models';
import { sleep } from "../utils";

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


export const testSelectForUpdate = async (): Promise<void> => {
  const promises: Promise<void>[] = [];
  console.time();
  promises.push(test1(1));
  await sleep(2000);
  promises.push(test1(2));
  await Promise.all(promises);
  console.timeEnd();
};
