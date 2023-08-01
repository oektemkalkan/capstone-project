import dbConnect from "@/db/connect";
import Rapstar from "@/db/models/rapstars";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection) {
    return response.status(500).json({ error: "Connection lost" });
  }
  if (request.method === "GET") {
    const rapArtist = await Rapstar.find();
    if (!rapArtist) {
      return response.status(404).json({ error: "No Artists there" });
    }
    response.status(200).json(rapArtist);
  }
}
