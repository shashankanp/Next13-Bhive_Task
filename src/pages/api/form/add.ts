import connectMongo from "../../../../utils/connectMongo";
import Input from "../../../../models/inputData";
import type { NextApiRequest, NextApiResponse } from "next";

console.log("Connecting to Mongo");
connectMongo();
console.log("Connected to Mongo");

export default async (req: any, res: any) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const inputs = await Input.find();
        res.status(200).json({
          success: true,
          value: inputs,
        });
      } catch (error) {
        console.log("Failed: ", error);
        res.status(400).json({ success: false, error: error });
      }
      break;

    case "POST":
      try {
        const input = await Input.create(req.body);
        console.log("Succesfully Created Input: ", input);
        res.status(200).json({ success: true, value: input });
      } catch (error) {
        console.log("Failed: ", error);
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};