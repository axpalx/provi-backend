import { AddressDatabase } from "../../data/address/AddressDatabase";
import { Address } from "../../model/address/Address";
import { RegisterAddressInputDTO } from "../../model/address/RegisterAddressInputDto";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class RegisterAddressBusiness {
  async registerName(input: RegisterAddressInputDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const addresDatabase = new AddressDatabase();
    const findIdAddress = await addresDatabase.getById(token.id);

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    if (!findIdAddress) {
      const addressData = new Address(
        id,
        token.id,
        input.cep,
        input.street,
        input.housenumber,
        input.complement,
        input.city,
        input.state,
        updatedAt
      );

      await addresDatabase.registerAddress(addressData);
    } else {
      if (
        findIdAddress.getCep() === input.cep &&
        findIdAddress.getStreet() === input.street &&
        findIdAddress.getHouseNumber() === input.housenumber &&
        findIdAddress.getComplement() === input.complement &&
        findIdAddress.getCity() === input.city &&
        findIdAddress.getState() === input.state
      ) {
        const addressData = new Address(
          findIdAddress.getId(),
          token.id,
          findIdAddress.getCep(),
          findIdAddress.getStreet(),
          findIdAddress.getHouseNumber(),
          findIdAddress.getComplement(),
          findIdAddress.getCity(),
          findIdAddress.getState(),
          updatedAt
        );
        await addresDatabase.updateAddressDateTime(addressData);
      } else {
        const addressData = new Address(
          id,
          token.id,
          input.cep,
          input.street,
          input.housenumber,
          input.complement,
          input.city,
          input.state,
          updatedAt
        );
        await addresDatabase.updateAddress(addressData);
      }
    }
  }
}
