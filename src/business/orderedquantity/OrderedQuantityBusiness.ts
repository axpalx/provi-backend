import { OrderedQuantityDatabase } from "../../data/orderedquantity/OrderedQuantityDatabase";
import { OrderedQuantity } from "../../model/orderedquantity/OrderedQuantity";
import { OrderedQuantityDTO } from "../../model/orderedquantity/OrderedQuantityDTO";
import { PhoneNumber } from "../../model/phonenumber/PhoneNumber";
import { Authenticator } from "../../services/Authenticator";
import { IdGenerator } from "../../services/IdGenerator";

export class OrderedQuantityBusiness {
  async orderedQuantity(input: OrderedQuantityDTO) {
    const authentication = new Authenticator();
    const token = authentication.getData(input.token);

    const orderedQuantityDatabase = new OrderedQuantityDatabase();
    const findIdOrderedQuantity = await orderedQuantityDatabase.getById(
      token.id
    );

    let updateDate = new Date().toLocaleDateString();
    const updatedAt = updateDate + " " + new Date().toLocaleTimeString();

    const idGenerator = new IdGenerator();
    const id = idGenerator.generateId();

    if (!findIdOrderedQuantity) {
      const orderedQuantity = new OrderedQuantity(
        id,
        token.id,
        input.orederedquantity as number,
        updatedAt
      );
      await orderedQuantityDatabase.registerPhoneNumber(orderedQuantity);
    } else {
      if (findIdOrderedQuantity.getPhoneNumber() === input.orederedquantity) {
        const orderedQuantity = new PhoneNumber(
          findIdOrderedQuantity.getId(),
          token.id,
          findIdOrderedQuantity.getPhoneNumber(),
          updatedAt
        );
        await orderedQuantityDatabase.updatePhoneNumberDateTime(
          orderedQuantity
        );
      } else {
        const orderedQuantity = new OrderedQuantity(
          id,
          token.id,
          input.orederedquantity as number,
          updatedAt
        );
        await orderedQuantityDatabase.updatePhoneNumber(orderedQuantity);
      }
    }
  }
}
