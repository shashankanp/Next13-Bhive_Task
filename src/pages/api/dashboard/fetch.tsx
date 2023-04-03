import connectMongo from "../../../../utils/connectMongo";
import Input from "../../../../models/inputData";

console.log("CONNECTING TO MONGO");
connectMongo();
console.log("CONNECTED TO MONGO");
export default async (req: any, res: any) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        console.log("req data: ", req.body);

        const inputs = await Input.find({ firebase_uid: body.data?.uid });
        return res.json({
          data: inputs,
        });
      } catch (error) {
        console.log(error);
        return {
          notFound: true,
        };
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
};
