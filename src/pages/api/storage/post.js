import multer from "multer";
import path from "path";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../utils/firebase";
import User from "../../../../models/firebaseUser";
import connectMongo from "../../../../utils/connectMongo";

const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  console.log("Connecting to Mongo");
  await connectMongo();
  console.log("Connected to Mongo");

  let { method } = req;
  let { name } = req.body;

  switch (method) {
    case "POST":
      upload.single("file")(req, res, async (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        let { method } = req;
        let { name } = req.body;

        console.log(req);
        try {
          const file = req.file;
          const ext = path.extname(file.originalname);
          // console.log("File: ", file);

          const id = uuidv4();
          const storageRef = ref(storage, `images/${id}${ext}`);

          await uploadBytes(storageRef, file.buffer);

          const downloadURL = await getDownloadURL(storageRef);
          try {
            await User.findOneAndUpdate(
              { firebase_name: name },
              {
                display_pic: downloadURL,
              }
            );
          } catch (error) {
            console.log("Failed: ", error);
            res.status(400).json({ success: false, error: error });
          }

          res.status(200).json({ url: downloadURL });
        } catch (error) {
          console.log("File: ", req.file);
          console.log("Failed: ", error);
          res.status(400).json({ success: false, error: error });
        }
      });
      break;

    case "GET":
      try {
        const users = await User.findOne({ firebase_name: name });
        return res.json({ pic_url: users.display_pic });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.setHeader("Allow", ["POST", "GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default post;
