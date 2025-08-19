const { Op } = require('sequelize');
const db = require('../models');
const Jugador = db.Jugador;
const XLSX = require('xlsx');

exports.getJugadores = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const offset = (page - 1) * limit;

        const { name, club, nationality } = req.query;

        const whereClause = {};
        if (name) {
            whereClause.short_name = { [Op.like]: `%${name}%` };
        }
        if (club) {
            whereClause.club_name = { [Op.like]: `%${club}%` };
        }
        if (nationality) {
            whereClause.nationality_name = { [Op.like]: `%${nationality}%` };
        }

        const { count, rows } = await Jugador.findAndCountAll({
            where: whereClause,
            limit: limit,
            offset: offset,
            order: [['overall', 'DESC']],
        });

        const totalPages = Math.ceil(count / limit);

        res.status(200).json({
            status: 'success',
            data: rows,
            currentPage: page,
            totalPages: totalPages,
            totalPlayers: count,
        });

    } catch (error) {
        console.error('Error al obtener jugadores:', error);
        res.status(500).json({
            status: 'error',
            message: 'Ocurrió un error al obtener los jugadores.',
            error: error.message
        });
    }
};

exports.getJugadorById = async (req, res) => {
    try {
        const { id } = req.params;

        const jugador = await Jugador.findOne({
            where: { player_id: id }
        });

        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }

        res.status(200).json(jugador);

    } catch (error) {
        console.error('Error al obtener los detalles del jugador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.updateJugador = async (req, res) => {
    try {
        const { id } = req.params;
        const datosActualizados = req.body;

        const jugador = await Jugador.findOne({
            where: { player_id: id }
        });

        if (!jugador) {
            return res.status(404).json({ message: 'Jugador no encontrado' });
        }

        await jugador.update(datosActualizados);

        res.status(200).json({
            status: 'success',
            message: 'Jugador actualizado correctamente',
            data: jugador
        });

    } catch (error) {
        console.error('Error al actualizar el jugador:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

exports.createJugador = async (req, res) => {
    try {
        const nuevoJugadorData = req.body;

        nuevoJugadorData.player_id = Math.floor(Math.random() * 1000000000);

        const nuevoJugador = await Jugador.create(nuevoJugadorData);

        res.status(201).json({
            status: 'success',
            message: 'Jugador creado correctamente',
            data: nuevoJugador
        });

    } catch (error) {
        console.error('Error al crear el jugador:', error);
        res.status(500).json({
            status: 'error',
            message: 'Error interno del servidor al crear el jugador.',
            error: error.message
        });
    }
};


exports.exportJugadores = async (req, res) => {
    try {
        const { name, club, nationality } = req.query;

        const whereClause = {};
        if (name) {
            whereClause.short_name = { [Op.like]: `%${name}%` };
        }
        if (club) {
            whereClause.club_name = { [Op.like]: `%${club}%` };
        }
        if (nationality) {
            whereClause.nationality_name = { [Op.like]: `%${nationality}%` };
        }

        const jugadores = await Jugador.findAll({
            where: whereClause,
            attributes: ['short_name', 'club_name', 'nationality_name', 'overall', 'player_positions', 'gender'],
        });

        if (!jugadores.length) {
            return res.status(404).json({ message: 'No se encontraron jugadores con los filtros aplicados.' });
        }

        const jugadoresData = jugadores.map(jugador => jugador.get({ plain: true }));

        const ws = XLSX.utils.json_to_sheet(jugadoresData);
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Jugadores");

        const csvBuffer = XLSX.write(wb, { bookType: 'csv', type: 'buffer' });

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=jugadores.csv');

        res.send(csvBuffer);
        
    } catch (error) {
        console.error('Error al exportar jugadores:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};