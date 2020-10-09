import { Request, Response } from "express";
import { SignupBusiness } from "../../business/user/SignupBusiness";

import { Database } from "../../data/Database/Database";
import { SignupInputDTO } from "../../model/user/SignupInputDTO";

export const signup = async (req: Request, res: Response) => {
  try {
    const userData: SignupInputDTO = {
      email: req.body.email,
      password: req.body.password,
    };

    const signupBusiness = new SignupBusiness();
    const token = await signupBusiness.signup(userData);

    res.status(200).send({ token });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
  await Database.destroyConnection();
};
