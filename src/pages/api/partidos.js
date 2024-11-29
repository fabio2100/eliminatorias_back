// pages/api/partidos.js
import pool from '../../../db';
import Cors from 'cors';
import { runMiddleware } from '../../corsMiddleware';

// Inicializa el middleware de CORS
const cors = Cors({
  methods: ['POST'],
});

export default async function handler(req, res) {
  // Ejecuta el middleware de CORS
  await runMiddleware(req, res, cors);

  if (req.method === 'POST') {
    const { nombreequipolocal, nombreequipovisitante, golequipolocal, golequipovisitante } = req.body;

    if (!nombreequipolocal || !nombreequipovisitante || golequipolocal === undefined || golequipovisitante === undefined) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
      const result = await pool.query(
        'INSERT INTO partidos (nombreequipolocal, nombreequipovisitante, golequipolocal, golequipovisitante) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombreequipolocal, nombreequipovisitante, golequipolocal, golequipovisitante]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      console.error('Error al insertar datos:', error);
      res.status(500).json({ error: 'Error al insertar datos' });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
