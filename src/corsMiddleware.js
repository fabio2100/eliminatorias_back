// middleware/corsMiddleware.js
import Cors from 'cors';

// Inicializa el middleware de CORS
const cors = Cors({
  methods: ['GET', 'HEAD','POST'],
});

// Helper para ejecutar middleware en Next.js
export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default cors;
