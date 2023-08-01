import dbConnect from "@/db/connect";
import Popstar from "@/db/models/popstars";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const pops = await Popstar.findById(request.query.id);

    if (!pops) {
      return response.status(404).json({ status: "Not Found" });
    }
    response.status(200).json(pops);
  }
}
