import connectMongo from "../../../../utils/connectMongo";
import Input from "../../../../models/inputData";

console.log("CONNECTING TO MONGO");
connectMongo();
console.log("CONNECTED TO MONGO");
export default async (req: any, res: any) => {
  const { method, body } = req;
  switch (method) {
    case "GET":
      try {
        console.log("FETCHING DOCUMENTS");
        const inputs = await Input.find();
        console.log("FETCHED DOCUMENTS");
        res.status(200).json({ data: inputs });
        return {
          props: {
            inputs: JSON.parse(JSON.stringify(inputs)),
          },
        };
      } catch (error) {
        console.log(error);
        return {
          notFound: true,
        };
      }
      break;
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
  }
};
