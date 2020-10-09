import { PhoneNumberDatabase } from "../../data/phoneNumber/PhoneNumberDatabase";
import { PhoneNumber } from "../../model/phonenumber/PhoneNumber";
import { RegisterPhoneNumberInputDTO } from "../../model/phonenumber/RegisterPhoneNumberInputDTO";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class RegisterPhoneNumberBusiness {
  async registerPhoneNumber(input: RegisterPhoneNumberInputDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const phoneNumberDatabase = new PhoneNumberDatabase();
    const findIdPhoneNumber = await phoneNumberDatabase.getById(token.id);

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    if (!findIdPhoneNumber) {
      const phoneNumber = new PhoneNumber(
        id,
        token.id,
        input.phonenumber as number,
        updatedAt
      );
      await phoneNumberDatabase.registerPhoneNumber(phoneNumber);
    } else {
      if (findIdPhoneNumber.getPhoneNumber() === input.phonenumber) {
        const phoneNumber = new PhoneNumber(
          findIdPhoneNumber.getId(),
          token.id,
          findIdPhoneNumber.getPhoneNumber(),
          updatedAt
        );
        await phoneNumberDatabase.updatePhoneNumberDateTime(phoneNumber);
      } else {
        const phoneNumber = new PhoneNumber(
          id,
          token.id,
          input.phonenumber as number,
          updatedAt
        );
        await phoneNumberDatabase.updatePhoneNumber(phoneNumber);
      }
    }
  }
}
