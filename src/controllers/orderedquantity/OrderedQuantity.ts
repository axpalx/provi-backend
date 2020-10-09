import { Request, Response } from "express";
import { OrderedQuantityBusiness } from "../../business/orderedquantity/OrderedQuantityBusiness";
import { OrderedQuantityDTO } from "../../model/orderedquantity/OrderedQuantityDTO";

export const orderedQuantity = async (req: Request, res: Response) => {
  try {
    const oderderdQuantityData: OrderedQuantityDTO = {
      token: req.body.token,
      orederedquantity: req.body.orderedquantity as number,
    };

    const orderedQuantityBusiness = new OrderedQuantityBusiness();
    await orderedQuantityBusiness.orderedQuantity(oderderdQuantityData);

    res.status(200).send({ success: true, "next-end-point": "End" });
  } catch (error) {
    res.status(error.statusCode || 400).send({ error: error.message });
  }
};
