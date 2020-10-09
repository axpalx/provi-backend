import { Database } from "../Database/Database";
import { Cpf } from "../../model/cpf/Cpf";
import { PhoneNumber } from "../../model/phonenumber/PhoneNumber";

export class PhoneNumberDatabase extends Database {
  private static TABLE_NAME = "Userphonenumber";

  public static getTableName = (): string => PhoneNumberDatabase.TABLE_NAME;

  async registerPhoneNumber(input: PhoneNumber): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const phonenumber = input.getPhoneNumber();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          phonenumber,
          updatedat,
        })
        .into(PhoneNumberDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<PhoneNumber> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(PhoneNumberDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "DESC");

      const data = result[0];

      if (!data) {
        return data;
      }
      const phoneNumber = new PhoneNumber(
        data.id,
        data.user_id,
        data.phonenumber,
        data.updatedat
      );

      return phoneNumber;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updatePhoneNumber(input: PhoneNumber): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const phonenumber = input.getPhoneNumber();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          phonenumber,
          updatedat,
        })
        .into(PhoneNumberDatabase.TABLE_NAME);
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
        .into(PhoneNumberDatabase.TABLE_NAME)
        .orderBy("updatedat", "DESC");
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
