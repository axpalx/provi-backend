import { Database } from "../Database/Database";
import { Address } from "../../model/address/Address";

export class AddressDatabase extends Database {
  private static TABLE_NAME = "Useraddress";

  public static getTableName = (): string => AddressDatabase.TABLE_NAME;

  async registerAddress(input: Address): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const cep = input.getCep();
      const street = input.getStreet();
      const housenumber = input.getHouseNumber();
      const complement = input.getComplement();
      const city = input.getCity();
      const state = input.getState();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          cep,
          street,
          housenumber,
          complement,
          city,
          state,
          updatedat,
        })
        .into(AddressDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getById(user_id: string): Promise<Address> {
    try {
      const result = await this.getConnection()
        .select("*")
        .from(AddressDatabase.TABLE_NAME)
        .where({ user_id })
        .orderBy("updatedat", "DESC");

      const data = result[0];

      if (!data) {
        return data;
      }
      const addressData = new Address(
        data.id,
        data.user_id,
        data.cep,
        data.street,
        data.housenumber,
        data.complement,
        data.city,
        data.state,
        data.updatedat
      );
      return addressData;
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateAddressDateTime(input: Address): Promise<void> {
    try {
      const id = input.getId();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .update({ updatedat })
        .where({ id })
        .into(AddressDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateAddress(input: Address): Promise<void> {
    try {
      const id = input.getId();
      const user_id = input.getUser_Id();
      const cep = input.getCep();
      const street = input.getStreet();
      const housenumber = input.getHouseNumber();
      const complement = input.getComplement();
      const city = input.getCity();
      const state = input.getState();
      const updatedat = input.getUpdatedAt();
      await this.getConnection()
        .insert({
          id,
          user_id,
          cep,
          street,
          housenumber,
          complement,
          city,
          state,
          updatedat,
        })
        .into(AddressDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
