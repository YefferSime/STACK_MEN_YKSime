import express from "express";
import morgan from 'morgan';
import { engine } from "express-handlebars";
import { join, dirname } from 'path';
import { fileURLToPath } from "url";

import clientesRoutes from './routes/clientes.routes.js';
import CategoriasRoutes from './routes/categorias.routes.js';
import ProductosRoutes from './routes/productos.routes.js';
import RegistrosRoutes from './routes/registros.routes.js';


import { handlebars } from './views/productos/handlebarsHelpers.js';

//Initializacion
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', join(__dirname, 'views'));
app.set('view engine', '.hbs'); 
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}));

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());            

//Routes
app.get('/', (req, res) => {
    res.render('index');
});

app.use(clientesRoutes);
app.use(CategoriasRoutes);
app.use(ProductosRoutes);
app.use(RegistrosRoutes)

//Public Files
app.use(express.static(join(__dirname, 'public')));

//Run server
app.listen(app.get('port'), () => {
    console.log('Cargando puerto', app.get('port'));
});
