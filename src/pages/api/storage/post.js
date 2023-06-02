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

const post = async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { file: base64String, contentType } = req.body;

        if (!base64String || !contentType) {
          throw new Error("Invalid request: file and contentType are required");
        }

        const extension = contentType.split("/")[1];
        const fileBuffer = Buffer.from(base64String, "base64");
        const id = uuidv4();
        const storageRef = ref(storage, `images/${id}.${extension}`);

        await uploadBytes(storageRef, fileBuffer);

        const downloadURL = await storageRef.getDownloadURL();

        res.status(200).json({ url: downloadURL });
      } catch (error) {
        console.log("Failed: ", error);
        res
          .status(400)
          .json({
            success: false,
            error: error,
            reqBody: req.body,
            file: file,
          });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default post;
