require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./database/db');
const jugadoresRoutes = require('./routes/jugadores');
const authRoutes = require('./routes/auth'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const waitForDb = async (retries = 5, delay = 5000) => {
    while (retries > 0) {
        try {
            await sequelize.authenticate();
            console.log('✅ Conexión a la base de datos establecida correctamente.');
            return;
        } catch (error) {
            console.error(`❌ Error al conectar o sincronizar la base de datos: ${error.message}`);
            console.log(`Reintentando en ${delay / 1000} segundos... (Intentos restantes: ${retries - 1})`);
            retries--;
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
    throw new Error('No se pudo conectar a la base de datos después de múltiples intentos.');
};

const startServer = async () => {
    try {
        await waitForDb();

        const User = require('./models/user');
        const Jugador = require('./models/Jugador');

        await sequelize.sync({ force: false });
        console.log('¡Base de datos y tablas sincronizadas!');

        app.use('/api/jugadores', jugadoresRoutes);
        
        app.use('/api/auth', authRoutes);

        app.get('/', (req, res) => {
            res.send('Servidor de FIFA API funcionando!');
        });

        const server = app.listen(PORT, () => {
            console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
        });

        server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                console.error(`❌ Error: El puerto ${PORT} ya está en uso.`);
            } else {
                console.error('❌ Error al iniciar el servidor:', err);
            }
            process.exit(1);
        });

    } catch (error) {
        console.error('❌ Error fatal al iniciar la aplicación:', error.message);
        process.exit(1);
    }
};

startServer();
