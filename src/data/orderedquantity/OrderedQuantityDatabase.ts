import { Database } from "../Database/Database";
import { Cpf } from "../../model/cpf/Cpf";
import { PhoneNumber } from "../../model/phonenumber/PhoneNumber";
import { OrderedQuantity } from "../../model/orderedquantity/OrderedQuantity";

export class OrderedQuantityDatabase extends Database {
  private static TABLE_NAME = "Userorderedquantity";

  public static getTableName = (): string => OrderedQuantityDatabase.TABLE_NAME;

  async registerPhoneNumber(input: OrderedQuantity): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const orderedquantity = input.getOrderedQuantity();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          orderedquantity,
          updatedat,
        })
        .into(OrderedQuantityDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<PhoneNumber> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(OrderedQuantityDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "DESC");

      const data = result[0];

      if (!data) {
        return data;
      }
      const orderedQuantityData = new PhoneNumber(
        data.id,
        data.user_id,
        data.orderedquantity,
        data.updatedat
      );

      return orderedQuantityData;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updatePhoneNumber(input: OrderedQuantity): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const orderedquantity = input.getOrderedQuantity();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          orderedquantity,
          updatedat,
        })
        .into(OrderedQuantityDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updatePhoneNumberDateTime(input: PhoneNumber): Promise<void> {
    try {
      const id = input.getId();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .update({ updatedat })
        .where({ id })
        .into(OrderedQuantityDatabase.TABLE_NAME)
        .orderBy("updatedat", "DESC");
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
