import { Request, Response } from "express";
import { RegisterCpfBusiness } from "../../business/cpf/RegisterCpfBusiness";
import { RegisterNameBusiness } from "../../business/name/RegisterNameBusiness";
import { RegisterCpfInputDTO } from "../../model/cpf/RegisterCpfInputDTO";
import { RegisterNameInputDTO } from "../../model/name/RegisterNameInputDTO";

export const registerName = async (req: Request, res: Response) => {
  try {
    const FullName = req.body.name;

    const fullNameArray = FullName.split(" ");
    const firstName = String(fullNameArray.splice([0], 1));
    const lastNameString = String(fullNameArray.splice([0], 10));
    const lastname = lastNameString.replace(/,/g, " ");

    const nameData: RegisterNameInputDTO = {
      token: req.body.token,
      firstname: firstName,
      lastname: lastname,
    };

    const nameBusiness = new RegisterNameBusiness();
    await nameBusiness.registerName(nameData);

    res.status(200).send({ success: true, "next-end-point": "Birth-date" });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
