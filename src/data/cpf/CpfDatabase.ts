import { Database } from "../Database/Database";
import { Cpf } from "../../model/cpf/Cpf";

export class CpfDatabase extends Database {
  private static TABLE_NAME = "Usercpf";

  public static getTableName = (): string => CpfDatabase.TABLE_NAME;

  async registerCpf(input: Cpf): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const cpf = input.getCpf();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          cpf,
          updatedat,
        })
        .into(CpfDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<Cpf> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(CpfDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "desc");

      const data = result[0];

      if (!data) {
        return data;
      }

      const cpf = new Cpf(data.id, data.user_id, data.cpf, data.updatedat);
      return cpf;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateCpf(input: Cpf): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const cpf = input.getCpf();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          cpf,
          updatedat,
        })
        .into(CpfDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateCpfDateTime(input: Cpf): Promise<void> {
    try {
      const id = input.getId();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .update({ updatedat })
        .where({ id })
        .into(CpfDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
