import { Request, Response } from "express";
import { RegisterDateBirthBusiness } from "../../business/datebirth/RegisterDateBirthBusiness";
import { RegisterDateBirthInputDTO } from "../../model/datebirth/RegisterDateBirthInputDTO";

export const registerDateBirth = async (req: Request, res: Response) => {
  try {
    const dateBirthData: RegisterDateBirthInputDTO = {
      token: req.body.token,
      datebirth: req.body.datebirth,
    };

    const dateBirthBusiness = new RegisterDateBirthBusiness();
    await dateBirthBusiness.registerDateBirth(dateBirthData);

    res.status(200).send({ success: true, "next-end-point": "Phone-number" });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
