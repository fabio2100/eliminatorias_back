import pool from "../../../db";
import cors, { runMiddleware } from "../../corsMiddleware";

export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  const { query } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }
  try {
    const client = await pool.connect();
    const result = await client.query(
      `SELECT id, nombreequipolocal, nombreequipovisitante, golequipolocal, golequipovisitante FROM partidos WHERE LOWER(nombreequipolocal) LIKE LOWER($1) OR LOWER(nombreequipovisitante) LIKE LOWER($1)`,
      [`%${query}%`]
    );
    client.release();
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No matches found" });
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching matches:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
