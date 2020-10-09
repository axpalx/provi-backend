import { Database } from "../Database/Database";
import { Name } from "../../model/name/Name";

export class NameDatabase extends Database {
  private static TABLE_NAME = "Username";

  public static getTableName = (): string => NameDatabase.TABLE_NAME;

  async registerName(input: Name): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const firstname = input.getFirstName();
      const lastname = input.getLastName();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          firstname,
          lastname,
          updatedat,
        })
        .into(NameDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<Name> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(NameDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "DESC");

      const data = result[0];

      if (!data) {
        return data;
      }
      const nameData = new Name(
        data.id,
        data.user_id,
        data.firstname,
        data.lastname,
        data.updatedat
      );
      return nameData;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateNameDateTime(input: Name): Promise<void> {
    try {
      const id = input.getId();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .update({ updatedat })
        .where({ id })
        .into(NameDatabase.TABLE_NAME)
        .orderBy("updatedat", "DESC");
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateName(input: Name): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const firstname = input.getFirstName();
      const lastname = input.getLastName();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          firstname,
          lastname,
          updatedat,
        })
        .into(NameDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
