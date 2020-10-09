import { Database } from "../Database/Database";
import { Cpf } from "../../model/cpf/Cpf";
import { DateBirth } from "../../model/datebirth/DateBirth";

export class DateBirthDatabase extends Database {
  private static TABLE_NAME = "Userdatebirth";

  public static getTableName = (): string => DateBirthDatabase.TABLE_NAME;

  async registerDateBirth(input: DateBirth): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const datebirth = input.getDateBirth();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          datebirth,
          updatedat,
        })
        .into(DateBirthDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<DateBirth> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(DateBirthDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "DESC");

      const data = result[0];

      if (!data) {
        return data;
      }
      const dateBirth = new DateBirth(
        data.id,
        data.user_id,
        data.datebirth,
        data.updatedat
      );
      return dateBirth;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateDateBirth(input: DateBirth): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const datebirth = input.getDateBirth();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          datebirth,
          updatedat,
        })
        .into(DateBirthDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateDateBirthDateTime(input: DateBirth): Promise<void> {
    try {
      const id = input.getId();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .update({ updatedat })
        .where({ id })
        .into(DateBirthDatabase.TABLE_NAME)
        .orderBy("updatedat", "DESC");
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
