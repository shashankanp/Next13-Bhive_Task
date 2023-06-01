import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../../../utils/firebase";

const post = async (req: any, res: any) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const fileBuffer = Buffer.from(req.body, "binary"); // Convert the binary data to a Buffer
        const id = uuidv4(); // Generate unique id for the filename
        const storageRef = ref(storage, `images/${id}.jpeg`);
        await uploadBytes(storageRef, fileBuffer);

        // Note: getDownloadURL only gets a public URL for the file, which is different from the signed URL
        // and does not require any authentication to access
        const downloadUrl = await getDownloadURL(storageRef);

        res.status(200).json({ url: downloadUrl });
      } catch (error) {
        console.log("Failed: ", error);
        res.status(400).json({ success: false, error: error });
      }
  }
};
export default post;
