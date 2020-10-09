import { Request, Response } from "express";
import { RegisterPhoneNumberBusiness } from "../../business/phonenumber/RegisterPhoneNumberBusiness";
import { RegisterPhoneNumberInputDTO } from "../../model/phonenumber/RegisterPhoneNumberInputDTO";

export const registerPhoneNumber = async (req: Request, res: Response) => {
  try {
    const phoneNumberData: RegisterPhoneNumberInputDTO = {
      token: req.body.token,
      phonenumber: req.body.phonenumber as number,
    };

    const phoneNumberBusiness = new RegisterPhoneNumberBusiness();
    await phoneNumberBusiness.registerPhoneNumber(phoneNumberData);

    res.status(200).send({ success: true, "next-end-point": "Address" });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
