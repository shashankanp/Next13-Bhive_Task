import User from "../../../../models/firebaseUser";
import connectMongo from "../../../../utils/connectMongo";

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req: any, res: any) => {
  console.log("Connecting to Mongo");
  await connectMongo();
  console.log("Connected to Mongo");

  const { method } = req;
  const { name } = req.body;
  console.log(req);

  switch (method) {
    case "GET":
      try {
        const users = await User.findOne({ firebase_name: name });
        return res.json({ pic_url: users.display_pic });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      // res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default post;
