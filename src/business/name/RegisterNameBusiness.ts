import { NameDatabase } from "../../data/name/NameDatabase";
import { Name } from "../../model/name/Name";
import { RegisterNameInputDTO } from "../../model/name/RegisterNameInputDTO";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class RegisterNameBusiness {
  async registerName(input: RegisterNameInputDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const nameDatabase = new NameDatabase();
    const findIdName = await nameDatabase.getById(token.id);

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    if (!findIdName) {
      const nameData = new Name(
        id,
        token.id,
        input.firstname,
        input.lastname,
        updatedAt
      );

      await nameDatabase.registerName(nameData);
    } else {
      if (
        findIdName.getFirstName() === input.firstname &&
        findIdName.getLastName() === input.lastname
      ) {
        const nameData = new Name(
          findIdName.getId(),
          token.id,
          findIdName.getFirstName(),
          findIdName.getLastName(),
          updatedAt
        );
        await nameDatabase.updateNameDateTime(nameData);
      } else {
        const nameData = new Name(
          id,
          token.id,
          input.firstname,
          input.lastname,
          updatedAt
        );
        await nameDatabase.updateName(nameData);
      }
    }
  }
}
