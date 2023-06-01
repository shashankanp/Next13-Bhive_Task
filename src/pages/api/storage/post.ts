import { getStorage, ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import * as admin from "firebase-admin";

const post = async (req: any, res: any) => {
  const { method } = req;
  switch (method) {
    case "POST":
      const file = req.body;
      const bucket = admin.storage().bucket();
      const id = uuidv4(); // Generate unique id for the filename
      const fileRef = bucket.file(`images/${id}.jpeg`);

      // Upload the image file to Firebase Storage
      await fileRef.save(file, {
        metadata: {
          contentType: "image/jpeg",
        },
      });

      // Get the download URL of the image file
      const downloadUrl = await fileRef.getSignedUrl({
        action: "read",
        expires: "03-17-3000",
      });

      res.status(200).json({ url: downloadUrl[0] });
  }
};
export default post;
