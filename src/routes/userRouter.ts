import express from "express";
import { login } from "../controllers/user/Login";
import { registerAddress } from "../controllers/address/RegisterAddress";
import { registerCpf } from "../controllers/cpf/RegisterCpf";
import { registerDateBirth } from "../controllers/datebirth/RegisterDateBirth";
import { registerName } from "../controllers/name/RegisterName";
import { registerPhoneNumber } from "../controllers/phonenumber/RegisterPhoneNumber";
import { signup } from "../controllers/user/Signup";
import { orderedQuantity } from "../controllers/orderedquantity/OrderedQuantity";

export const userRouter = express.Router();

userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/registercpf", registerCpf);

userRouter.post("/registername", registerName);

userRouter.post("/registeraddress", registerAddress);

userRouter.post("/registerdatebirth", registerDateBirth);

userRouter.post("/registerphonenumber", registerPhoneNumber);

userRouter.post("/orderedquantity", orderedQuantity);
