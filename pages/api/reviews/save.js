import { connectDB } from "../../../lib/mongodb";
import Review from "../../../models/Review";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { userId, language, reviewType, code, result, scores } = req.body;

    if (!userId || !language || !code || !result) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const review = await Review.create({
      userId,
      language,
      reviewType,
      code,
      result,
      scores,
    });

    return res.status(201).json({ success: true, review });
  } catch (err) {
    console.error("Save review error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}