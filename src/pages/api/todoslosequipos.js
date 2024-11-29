// pages/api/todoslosequipos.js
import pool from '../../../db';
import Cors from 'cors';
import { runMiddleware } from '../../corsMiddleware';

// Inicializa el middleware de CORS
const cors = Cors({
  methods: ['GET'],
});

export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  if (req.method === 'GET') {
    try {
      const result = await pool.query('SELECT nombre FROM equipos');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error al obtener datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
