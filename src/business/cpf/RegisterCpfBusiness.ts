import { CpfDatabase } from "../../data/cpf/CpfDatabase";
import { Cpf } from "../../model/cpf/Cpf";
import { RegisterCpfInputDTO } from "../../model/cpf/RegisterCpfInputDTO";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class RegisterCpfBusiness {
  async registerCpf(input: RegisterCpfInputDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const cpfDatabase = new CpfDatabase();
    const findIdCpf = await cpfDatabase.getById(token.id);

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();
    if (!findIdCpf) {
      const cpf = new Cpf(id, token.id, input.cpf, updatedAt);

      await cpfDatabase.registerCpf(cpf);
    } else {
      if (findIdCpf.getCpf() === input.cpf) {
        const cpf = new Cpf(
          findIdCpf.getId(),
          token.id,
          findIdCpf.getCpf(),
          updatedAt
        );
        await cpfDatabase.updateCpfDateTime(cpf);
      } else {
        const cpf = new Cpf(id, token.id, input.cpf, updatedAt);
        await cpfDatabase.updateCpf(cpf);
      }
    }
  }
}
