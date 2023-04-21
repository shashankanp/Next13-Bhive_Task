import connectMongo from "../../../../utils/connectMongo";
import Input from "../../../../models/inputData";

const fetch = async (req: any, res: any) => {
  console.log("Connecting to Mongo");
  await connectMongo();
  console.log("Connected to Mongo");

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

    default:
      res.status(400).json({ success: false });
      break;
  }
};
export default fetch;
