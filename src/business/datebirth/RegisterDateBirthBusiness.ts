import { CpfDatabase } from "../../data/cpf/CpfDatabase";
import { DateBirthDatabase } from "../../data/datebirth/DateBirthDatabase";
import { Cpf } from "../../model/cpf/Cpf";
import { DateBirth } from "../../model/datebirth/DateBirth";
import { RegisterDateBirthInputDTO } from "../../model/datebirth/RegisterDateBirthInputDTO";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class RegisterDateBirthBusiness {
  async registerDateBirth(input: RegisterDateBirthInputDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const dateBirthDatabase = new DateBirthDatabase();
    const findIdDateBirth = await dateBirthDatabase.getById(token.id);

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    if (!findIdDateBirth) {
      const dateBirthData = new DateBirth(
        id,
        token.id,
        input.datebirth,
        updatedAt
      );

      await dateBirthDatabase.registerDateBirth(dateBirthData);
    } else {
      if (findIdDateBirth.getDateBirth() === input.datebirth) {
        const dateBirthData = new DateBirth(
          findIdDateBirth.getId(),
          token.id,
          findIdDateBirth.getDateBirth(),
          updatedAt
        );
        await dateBirthDatabase.updateDateBirthDateTime(dateBirthData);
      } else {
        const dateBirthData = new DateBirth(
          id,
          token.id,
          input.datebirth,
          updatedAt
        );
        await dateBirthDatabase.updateDateBirth(dateBirthData);
      }
    }
  }
}
