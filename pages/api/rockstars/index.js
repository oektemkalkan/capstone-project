import dbConnect from "@/db/connect";
import Rockstar from "@/db/models/rockstars";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection) {
    return response.status(500).json({ error: "Connection lost" });
  }
  if (request.method === "GET") {
    const rockArtist = await Rockstar.find();
    if (!rockArtist) {
      return response.status(404).json({ error: "No Artists there" });
    }
    response.status(200).json(rockArtist);
  }
}
