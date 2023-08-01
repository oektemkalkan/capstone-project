import dbConnect from "@/db/connect";
import Rapstar from "@/db/models/rapstars";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const raps = await Rapstar.findById(request.query.id);

    if (!raps) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(raps);
  }
}
