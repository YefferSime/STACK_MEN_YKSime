import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/registro/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT r.*, p.nombre_producto, p.precio, c.nombre_categoria FROM data.Registro r JOIN data.Producto p ON r.id_producto = p.id_producto JOIN data.Categoria c ON p.id_categoria = c.id_categoria;');
        res.render('registros/list', { registros: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;