import { Request, Response } from "express";
import { RegisterCpfBusiness } from "../../business/cpf/RegisterCpfBusiness";
import { ValidCpf } from "../../business/cpf/ValidCpf";
import { RegisterCpfInputDTO } from "../../model/cpf/RegisterCpfInputDTO";

export const registerCpf = async (req: Request, res: Response) => {
  try {
    const validCpf = new ValidCpf();
    const cpfReturn = await validCpf.CpfValid(req.body.cpf);
    if (cpfReturn) {
      const cpfData: RegisterCpfInputDTO = {
        token: req.body.token,
        cpf: req.body.cpf,
      };

      const cpfBusiness = new RegisterCpfBusiness();
      await cpfBusiness.registerCpf(cpfData);

      res.status(200).send({ success: true, "next-end-point": "Full name" });
    } else {
      throw new Error("Cpf not is valid");
    }
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
