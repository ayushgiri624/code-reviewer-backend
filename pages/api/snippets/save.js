import { connectDB } from "../../../lib/mongodb";
import Snippet from "../../../models/Snippet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { userId, language, title, code } = req.body;

    if (!userId || !language || !title || !code) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const snippet = await Snippet.create({
      userId,
      language,
      title,
      code,
    });

    return res.status(201).json({ success: true, snippet });
  } catch (err) {
    console.error("Save snippet error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}