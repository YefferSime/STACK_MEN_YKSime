import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/producto/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT p.*, c.nombre_categoria FROM data.Producto p JOIN data.Categoria c ON p.id_categoria = c.id_categoria;');
        res.render('productos/list', { productos: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/producto/add', async (req, res) => {
    try {
        const [categorias] = await pool.query('SELECT * FROM data.Categoria');
        res.render('productos/add', { categorias });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/producto/add', async (req, res) => {
    try {
        const { nombre_producto, precio, id_categoria } = req.body;
        const newProducto = {
            nombre_producto,
            precio,
            id_categoria
        };
        await pool.query('INSERT INTO data.producto SET ?', [newProducto]);
        res.redirect('/producto/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.get('/producto/edit/:id_producto', async (req, res) => {
    try {
        const { id_producto } = req.params;
        const [producto] = await pool.query('SELECT * FROM data.producto WHERE id_producto = ?', [id_producto]);
        const productoEdit = producto[0];

        const [categorias] = await pool.query('SELECT * FROM data.categoria');
        
        res.render('productos/edit', { producto: productoEdit, categorias });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/producto/edit/:id_producto', async (req, res) => {
    try {
        const { nombre_producto, precio, id_categoria } = req.body;
        const { id_producto } = req.params;
        const editProducto = { nombre_producto, precio, id_categoria };
        await pool.query('UPDATE data.producto SET ? WHERE id_producto = ?', [editProducto, id_producto]);
        res.redirect('/producto/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/producto/delete/:id_producto',async(req,res)=>{
    try{
        const {id_producto}=req.params;
        await pool.query('DELETE FROM data.producto WHERE id_producto=?',[id_producto]);
        res.redirect('/producto/list');
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});




export default router;