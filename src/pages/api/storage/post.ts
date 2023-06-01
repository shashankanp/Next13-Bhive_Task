import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../utils/firebase";

const post = async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { file: base64String, contentType } = req.body;

        if (!base64String || !contentType) {
          throw new Error("Invalid request: file and contentType are required");
        }

        const extension = contentType.split("/")[1]; // Extract the file extension from the content type
        const fileBuffer = Buffer.from(base64String, "base64");
        const id = uuidv4();
        const storageRef = ref(storage, `images/${id}.${extension}`);

        const uploadTask = uploadBytesResumable(storageRef, fileBuffer, {
          contentType,
        });

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log("Failed: ", error);
            res.status(400).json({ success: false, error: error });
          },
          async () => {
            const downloadURL = await getDownloadURL(storageRef);
            res.status(200).json({ url: downloadURL });
          }
        );
      } catch (error) {
        console.log("Failed: ", error);
        res.status(400).json({ success: false, error: error });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
export default post;
