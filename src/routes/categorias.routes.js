import { Router } from 'express';
import pool from '../database.js';

const router = Router();

router.get('/categoria/list', async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM categoria');
        res.render('categorias/list', { categorias: result });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/categoria/add', (req, res) => {
    res.render('categorias/add');
});


router.post('/categoria/add', async (req, res) => {
    try {
        const { nombre_categoria } = req.body;
        const newCategoria = {
            nombre_categoria
        };
        await pool.query('INSERT INTO data.categoria SET ?', [newCategoria]);
        res.redirect('/categoria/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/categoria/edit/:id_categoria', async (req, res) => {
    try {
        const { id_categoria } = req.params;
        const [categoria] = await pool.query('SELECT * FROM data.categoria WHERE id_categoria = ?', [id_categoria]);
        const categoriaEdit = categoria[0];
        res.render('categorias/edit', { categoria: categoriaEdit });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/categoria/edit/:id_categoria', async (req, res) => {
    try {
        const { nombre_categoria} = req.body;
        const { id_categoria } = req.params;
        const editCategoria = { nombre_categoria };
        await pool.query('UPDATE data.categoria SET ? WHERE id_categoria = ?', [editCategoria, id_categoria]);
        res.redirect('/categoria/list');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/categoria/delete/:id_categoria',async(req,res)=>{
    try{
        const {id_categoria}=req.params;
        await pool.query('DELETE FROM data.categoria WHERE id_categoria=?',[id_categoria]);
        res.redirect('/categoria/list');
    }catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;