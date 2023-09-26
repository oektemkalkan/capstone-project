import dbConnect from "@/db/connect";
import Rockstar from "@/db/models/rockstars";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const raps = await Rockstar.findById(request.query.id);

    if (!raps) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(raps);
  }
}
