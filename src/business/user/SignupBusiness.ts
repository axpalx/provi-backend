import { SignupInputDTO } from "../../model/user/SignupInputDTO";
import { UserDatabase } from "../../data/user/UserDatabase";
import { User } from "../../model/user/User";
import { HashManager } from "../../services/HashManager";
import { IdGenerator } from "../../services/IdGenerator";
import { Authenticator } from "../../services/Authenticator";

export class SignupBusiness {
  async signup(input: SignupInputDTO) {
    if (!input.email || input.email.indexOf("@") === -1) {
      throw new Error("Invalid E-mail");
    }

    const userDatabase = new UserDatabase();

    const findEmail = await userDatabase.getByEmail(input.email);

    if (findEmail) {
      throw new Error("Registered email");
    }

    if (!input.password || input.password.length < 6) {
      throw new Error("Password is less than 6 characters or empty");
    }

    const cipherText = await new HashManager().hash(input.password);

    const idGenerator = new IdGenerator();

    const id = idGenerator.generateId();

    const user = new User(id, input.email, cipherText);

    await userDatabase.createUser(user);

    const authenticator = new Authenticator();
    const token = authenticator.generateToken({ id });
    return token;
  }
}
