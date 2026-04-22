import { connectDB } from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    const reviews = await Review.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    return res.status(200).json({ success: true, reviews });
  } catch (err) {
    console.error("Fetch history error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}