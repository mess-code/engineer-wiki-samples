import { QueryInterface, DataTypes } from "sequelize";
import { DbInterface } from "../models";

export async function up(queryInterface: QueryInterface, db: DbInterface) {
  await queryInterface.createTable('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    }
  });

  await db.Product.create({
    name: 'test',
    amount: 1,
  });
}
