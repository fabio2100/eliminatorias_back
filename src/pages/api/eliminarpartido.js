import pool from "../../../db";
import cors, { runMiddleware } from "../../corsMiddleware";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const client = await pool.connect();
    const result = await client.query(`DELETE FROM partidos WHERE id = $1`, [
      id,
    ]);
    client.release();
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (error) {
    console.error("Error deleting match:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
