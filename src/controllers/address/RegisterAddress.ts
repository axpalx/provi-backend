import { Request, Response } from "express";
import { RegisterAddressBusiness } from "../../business/address/RegisterAddressBusiness";
import { getValidCep } from "../../business/address/ValidCep";
import { ValidStreet } from "../../business/address/ValidStreet";
import { RegisterAddressInputDTO } from "../../model/address/RegisterAddressInputDto";

export const registerAddress = async (req: Request, res: Response) => {
  try {
    const address = await getValidCep(req.body.cep);
    console.log(address);
    if (address.erro === true) {
      throw new Error("Zip does not exist.");
    }

    const addressData: RegisterAddressInputDTO = {
      token: req.body.token,
      cep: req.body.cep,
      street: req.body.street,
      housenumber: req.body.housenumber,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
    };

    const apiStreet = ValidStreet(address.logradouro)
      .replace(/\s/g, "")
      .toLocaleLowerCase();

    const dataStreet = ValidStreet(addressData.street)
      .replace(/\s/g, "")
      .toLocaleLowerCase();

    if (apiStreet !== dataStreet) {
      throw new Error("Street entered does not match zip code.");
    }

    const apiCity = ValidStreet(address.localidade)
      .replace(/\s/g, "")
      .toLocaleLowerCase();
    const dataCity = ValidStreet(addressData.city)
      .replace(/\s/g, "")
      .toLocaleLowerCase();

    if (apiCity !== dataCity) {
      throw new Error("City entered does not match zip code.");
    }

    const apiState = ValidStreet(address.uf)
      .replace(/\s/g, "")
      .toLocaleLowerCase();
    const dataState = ValidStreet(addressData.state)
      .replace(/\s/g, "")
      .toLocaleLowerCase();

    if (apiState !== dataState) {
      throw new Error("State entered does not match zip code.");
    }

    const addressBusiness = new RegisterAddressBusiness();
    await addressBusiness.registerName(addressData);

    res.status(200).send({ message: "Address successfully registered." });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
