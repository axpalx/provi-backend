import { Database } from "../Database/Database";
import { User } from "../../model/user/User";

export class UserDatabase extends Database {
  private static TABLE_NAME = "User";

  public static getTableName = (): string => UserDatabase.TABLE_NAME;

  async createUser(input: User): Promise<void> {
    try {
      const id = input.getId();
      const email = input.getEmail();
      const password = input.getPassword();
      await this.getConnection()
        .insert({
          id,
          email,
          password,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(id: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ id });
      const data = result[0];
      const user = new User(data.id, data.email, data.password);
      return user;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getByEmail(email: string): Promise<User> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(UserDatabase.TABLE_NAME)
        .where({ email });

      const data = result[0];

      if (!data) {
        return data;
      }

      const user = new User(data.id, data.email, data.password);
      return user;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
