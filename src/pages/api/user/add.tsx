import connectMongo from "../../../../utils/connectMongo";
import User from "../../../../models/firebaseUser";

const add = async (req: any, res: any) => {
  console.log("Connecting to Mongo");
  await connectMongo();
  console.log("Connected to Mongo");

  const { method } = req;
  switch (method) {
    case "POST":
      try {
        const user = await User.create(req.body);
        console.log("Succesfully Created User: ", user);
        res.status(200).json({ success: true, value: user });
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
export default add;
