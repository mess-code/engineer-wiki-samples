import { Sequelize, Model, DataTypes, ModelAttributes, InitOptions } from 'sequelize';
import type { DbInterface } from '.';

export interface ProductAttributes {
  id?: string;
  name: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Product extends Model<ProductAttributes> {
  public static associate(models: DbInterface): void {
    // Product.hasMany(models.Post, { foreignKey: 'id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  }
}

export const createProductModel = (sequelize: Sequelize): typeof Product => {
  const attributes: ModelAttributes<Product, ProductAttributes> = {
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    }
  };

  const options: InitOptions<Product> = {
    sequelize,
    tableName: 'Product',
  }

  Product.init(attributes, options);

  return Product;
};
