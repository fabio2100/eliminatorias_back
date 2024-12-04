// pages/api/editarpartido.js
import pool from "../../../db";
import cors, { runMiddleware } from "../../corsMiddleware";

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  const {
    id,
    nombreequipolocal,
    nombreequipovisitante,
    golequipolocal,
    golequipovisitante,
  } = req.body;

  if (
    !id ||
    !nombreequipolocal ||
    !nombreequipovisitante ||
    golequipolocal === undefined ||
    golequipovisitante === undefined
  ) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    const client = await pool.connect();
    const result = await client.query(
      `UPDATE partidos 
       SET nombreequipolocal = $1, nombreequipovisitante = $2, golequipolocal = $3, golequipovisitante = $4 
       WHERE id = $5`,
      [
        nombreequipolocal,
        nombreequipovisitante,
        golequipolocal,
        golequipovisitante,
        id,
      ]
    );
    client.release();

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Match not found" });
    }

    res.status(200).json({ message: "Match updated successfully" });
  } catch (error) {
    console.error("Error updating match:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
