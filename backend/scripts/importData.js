require('dotenv').config();

const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const { DataTypes, Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
  }
);

const Jugador = require('../models/Jugador')(sequelize);

const parseNumericValue = (value) => {
  const parsed = parseInt(value);
  return isNaN(parsed) ? null : parsed;
};

const importCSV = (filePath, gender) => {
  return new Promise((resolve, reject) => {
    let players = [];
    const batchSize = 1000;

    const stream = fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', async (data) => {
        stream.pause();
        
        const player = {
          player_id: parseNumericValue(data.player_id),
          player_url: data.player_url,
          fifa_version: parseNumericValue(data.fifa_version),
          fifa_update: parseNumericValue(data.fifa_update),
          fifa_update_date: data.fifa_update_date,
          short_name: data.short_name,
          long_name: data.long_name,
          player_positions: data.player_positions,
          overall: parseNumericValue(data.overall),
          potential: parseNumericValue(data.potential),
          value_eur: parseNumericValue(data.value_eur),
          wage_eur: parseNumericValue(data.wage_eur),
          age: parseNumericValue(data.age),
          dob: data.dob,
          height_cm: parseNumericValue(data.height_cm),
          weight_kg: parseNumericValue(data.weight_kg),
          league_id: parseNumericValue(data.league_id),
          league_name: data.league_name,
          league_level: parseNumericValue(data.league_level),
          club_team_id: parseNumericValue(data.club_team_id),
          club_name: data.club_name,
          club_position: data.club_position,
          club_jersey_number: parseNumericValue(data.club_jersey_number),
          club_loaned_from: data.club_loaned_from,
          club_joined_date: data.club_joined_date,
          club_contract_valid_until_year: parseNumericValue(data.club_contract_valid_until_year),
          nationality_id: parseNumericValue(data.nationality_id),
          nationality_name: data.nationality_name,
          nation_team_id: parseNumericValue(data.nation_team_id),
          nation_position: data.nation_position,
          nation_jersey_number: parseNumericValue(data.nation_jersey_number),
          preferred_foot: data.preferred_foot,
          weak_foot: parseNumericValue(data.weak_foot),
          skill_moves: parseNumericValue(data.skill_moves),
          international_reputation: parseNumericValue(data.international_reputation),
          work_rate: data.work_rate,
          body_type: data.body_type,
          real_face: data.real_face,
          release_clause_eur: parseNumericValue(data.release_clause_eur),
          player_tags: data.player_tags,
          player_traits: data.player_traits,
          pace: parseNumericValue(data.pace),
          shooting: parseNumericValue(data.shooting),
          passing: parseNumericValue(data.passing),
          dribbling: parseNumericValue(data.dribbling),
          defending: parseNumericValue(data.defending),
          physic: parseNumericValue(data.physic),
          attacking_crossing: parseNumericValue(data.attacking_crossing),
          attacking_finishing: parseNumericValue(data.attacking_finishing),
          attacking_heading_accuracy: parseNumericValue(data.attacking_heading_accuracy),
          attacking_short_passing: parseNumericValue(data.attacking_short_passing),
          attacking_volleys: parseNumericValue(data.attacking_volleys),
          skill_dribbling: parseNumericValue(data.skill_dribbling),
          skill_curve: parseNumericValue(data.skill_curve),
          skill_fk_accuracy: parseNumericValue(data.skill_fk_accuracy),
          skill_long_passing: parseNumericValue(data.skill_long_passing),
          skill_ball_control: parseNumericValue(data.skill_ball_control),
          movement_acceleration: parseNumericValue(data.movement_acceleration),
          movement_sprint_speed: parseNumericValue(data.movement_sprint_speed),
          movement_agility: parseNumericValue(data.movement_agility),
          movement_reactions: parseNumericValue(data.movement_reactions),
          movement_balance: parseNumericValue(data.movement_balance),
          power_shot_power: parseNumericValue(data.power_shot_power),
          power_jumping: parseNumericValue(data.power_jumping),
          power_stamina: parseNumericValue(data.power_stamina),
          power_strength: parseNumericValue(data.power_strength),
          power_long_shots: parseNumericValue(data.power_long_shots),
          mentality_aggression: parseNumericValue(data.mentality_aggression),
          mentality_interceptions: parseNumericValue(data.mentality_interceptions),
          mentality_positioning: parseNumericValue(data.mentality_positioning),
          mentality_vision: parseNumericValue(data.mentality_vision),
          mentality_penalties: parseNumericValue(data.mentality_penalties),
          mentality_composure: parseNumericValue(data.mentality_composure),
          defending_marking_awareness: parseNumericValue(data.defending_marking_awareness),
          defending_standing_tackle: parseNumericValue(data.defending_standing_tackle),
          defending_sliding_tackle: parseNumericValue(data.defending_sliding_tackle),
          goalkeeping_diving: parseNumericValue(data.goalkeeping_diving),
          goalkeeping_handling: parseNumericValue(data.goalkeeping_handling),
          goalkeeping_kicking: parseNumericValue(data.goalkeeping_kicking),
          goalkeeping_positioning: parseNumericValue(data.goalkeeping_positioning),
          goalkeeping_reflexes: parseNumericValue(data.goalkeeping_reflexes),
          goalkeeping_speed: parseNumericValue(data.goalkeeping_speed),
          ls: data.ls,
          st: data.st,
          rs: data.rs,
          lw: data.lw,
          lf: data.lf,
          cf: data.cf,
          rf: data.rf,
          rw: data.rw,
          lam: data.lam,
          cam: data.cam,
          ram: data.ram,
          lm: data.lm,
          lcm: data.lcm,
          cm: data.cm,
          rcm: data.rcm,
          rm: data.rm,
          lwb: data.lwb,
          ldm: data.ldm,
          cdm: data.cdm,
          rdm: data.rdm,
          rwb: data.rwb,
          lb: data.lb,
          lcb: data.lcb,
          cb: data.cb,
          rcb: data.rcb,
          rb: data.rb,
          gk: data.gk,
          player_face_url: data.player_face_url,
          gender: gender,
        };
        players.push(player);

        if (players.length >= batchSize) {
          try {
            await Jugador.bulkCreate(players, { ignoreDuplicates: true });
            console.log(`Importados ${players.length} registros de ${gender}...`);
            players = [];
          } catch (error) {
            console.error(`Error al insertar lote de ${gender}:`, error);
          }
        }
        stream.resume();
      })
      .on('end', async () => {
        if (players.length > 0) {
          try {
            await Jugador.bulkCreate(players, { ignoreDuplicates: true });
            console.log(`Importados ${players.length} registros restantes de ${gender}...`);
          } catch (error) {
            console.error(`Error al insertar lote final de ${gender}:`, error);
          }
        }
        console.log(`Datos de ${gender} importados exitosamente.`);
        resolve();
      })
      .on('error', (error) => {
        console.error(`Error al leer el archivo CSV de ${gender}:`, error);
        reject(error);
      });
  });
};

const runImport = async () => {
  try {
    console.log('Sincronizando la base de datos...');
    await sequelize.sync();
    console.log('Sincronización completa. Importando datos...');

    const maleCSV = path.join(__dirname, 'male_players.csv');
    const femaleCSV = path.join(__dirname, 'female_players.csv');

    await importCSV(maleCSV, 'm');
    await importCSV(femaleCSV, 'f');

    console.log('¡Importación de datos finalizada!');
  } catch (error) {
    console.error('Error durante el proceso de importación:', error);
  } finally {
    await sequelize.close();
    console.log('Conexión a la base de datos cerrada.');
  }
};

runImport();
