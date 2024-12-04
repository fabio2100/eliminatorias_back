// pages/api/posiciones.js
// pages/api/posiciones.js
import pool from '../../../db';
import cors, { runMiddleware } from '../../corsMiddleware';


export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT * FROM vista_clasificacion');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
