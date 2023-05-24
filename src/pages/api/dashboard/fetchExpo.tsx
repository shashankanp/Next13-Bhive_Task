import Input from "../../../../models/inputData";
import connectMongo from "../../../../utils/connectMongo";

console.log("CONNECTING TO MONGO");
connectMongo();
console.log("CONNECTED TO MONGO");
const fetch = async (req: any, res: any) => {
  const { method, body } = req;
  switch (method) {
    case "POST":
      try {
        console.log("req data: ", req.body);

        const inputs = await Input.find({ firebase_uid: body.data?.id });
        return res.json({
          data: inputs,
        });
      } catch (error) {
        console.log(error);
        return {
          notFound: true,
        };
      }

    default:
      res.status(400).json({ success: false });
      break;
  }
};

export default fetch;
