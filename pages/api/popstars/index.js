import dbConnect from "@/db/connect";
import Popstar from "@/db/models/popstars";

export default async function handler(request, response) {
  const connection = await dbConnect();

  if (!connection) {
    return response.status(500).json({ error: "Connection lost" });
  }

  if (request.method === "GET") {
    const popArtist = await Popstar.find();
    if (!popArtist) {
      return response.status(404).json({ error: "No Artists there" });
    }
    response.status(200).json(popArtist);
  }
}
