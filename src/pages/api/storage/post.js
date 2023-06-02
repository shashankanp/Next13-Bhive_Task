import multer from "multer";
import path from "path";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../utils/firebase";

// Initialize multer
const upload = multer();

export const config = {
  api: {
    bodyParser: false,
  },
};

const post = async (req, res) => {
  upload.single("file")(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const { method } = req;

    switch (method) {
      case "POST":
        try {
          // Get the file from multer's req.file instead of req.body
          const file = req.file;
          const ext = path.extname(file.originalname);
          console.log("File: ", file);

          const id = uuidv4();
          const storageRef = ref(storage, `images/${id}${ext}`);

          // Make sure to pass the buffer version of the file
          await uploadBytes(storageRef, file.buffer);

          const downloadURL = await getDownloadURL(storageRef);

          res.status(200).json({ url: downloadURL });
        } catch (error) {
          console.log("File: ", req.file);
          console.log("Failed: ", error);
          res.status(400).json({ success: false, error: error });
        }
        break;
      default:
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  });
};
export default post;
