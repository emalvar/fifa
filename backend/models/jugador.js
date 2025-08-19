const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Jugador = sequelize.define(
    "Jugador",
    {
      player_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        primaryKey: true,
      },
      sofifa_id: {
        type: DataTypes.INTEGER,
        unique: true,
      },
      player_url: {
        type: DataTypes.STRING
      },
      fifa_version: {
        type: DataTypes.INTEGER,
      },
      fifa_update: {
        type: DataTypes.INTEGER,
      },
      fifa_update_date: {
        type: DataTypes.DATE,
      },
      short_name: {
        type: DataTypes.STRING,
      },
      long_name: {
        type: DataTypes.STRING,
      },
      player_positions: {
        type: DataTypes.STRING,
      },
      overall: {
        type: DataTypes.INTEGER,
      },
      potential: {
        type: DataTypes.INTEGER,
      },
      value_eur: {
        type: DataTypes.INTEGER,
      },
      wage_eur: {
        type: DataTypes.INTEGER,
      },
      age: {
        type: DataTypes.INTEGER,
      },
      dob: {
        type: DataTypes.DATE,
      },
      height_cm: {
        type: DataTypes.INTEGER,
      },
      weight_kg: {
        type: DataTypes.INTEGER,
      },
      league_id: {
        type: DataTypes.INTEGER,
      },
      league_name: {
        type: DataTypes.STRING,
      },
      league_level: {
        type: DataTypes.INTEGER,
      },
      club_team_id: {
        type: DataTypes.INTEGER,
      },
      club_name: {
        type: DataTypes.STRING,
      },
      club_position: {
        type: DataTypes.STRING,
      },
      club_jersey_number: {
        type: DataTypes.INTEGER,
      },
      club_loaned_from: {
        type: DataTypes.STRING,
      },
      club_joined_date: {
        type: DataTypes.DATE,
      },
      club_contract_valid_until_year: {
        type: DataTypes.INTEGER,
      },
      nationality_id: {
        type: DataTypes.INTEGER,
      },
      nationality_name: {
        type: DataTypes.STRING,
      },
      nation_team_id: {
        type: DataTypes.INTEGER,
      },
      nation_position: {
        type: DataTypes.STRING,
      },
      nation_jersey_number: {
        type: DataTypes.INTEGER,
      },
      preferred_foot: {
        type: DataTypes.STRING,
      },
      weak_foot: {
        type: DataTypes.INTEGER,
      },
      skill_moves: {
        type: DataTypes.INTEGER,
      },
      international_reputation: {
        type: DataTypes.INTEGER,
      },
      work_rate: {
        type: DataTypes.STRING,
      },
      body_type: {
        type: DataTypes.STRING,
      },
      real_face: {
        type: DataTypes.STRING,
      },
      release_clause_eur: {
        type: DataTypes.INTEGER,
      },
      player_tags: {
        type: DataTypes.STRING,
      },
      player_traits: {
        type: DataTypes.STRING,
      },
      pace: {
        type: DataTypes.INTEGER,
      },
      shooting: {
        type: DataTypes.INTEGER,
      },
      passing: {
        type: DataTypes.INTEGER,
      },
      dribbling: {
        type: DataTypes.INTEGER,
      },
      defending: {
        type: DataTypes.INTEGER,
      },
      physic: {
        type: DataTypes.INTEGER,
      },
      attacking_crossing: {
        type: DataTypes.INTEGER,
      },
      attacking_finishing: {
        type: DataTypes.INTEGER,
      },
      attacking_heading_accuracy: {
        type: DataTypes.INTEGER,
      },
      attacking_short_passing: {
        type: DataTypes.INTEGER,
      },
      attacking_volleys: {
        type: DataTypes.INTEGER,
      },
      skill_dribbling: {
        type: DataTypes.INTEGER,
      },
      skill_curve: {
        type: DataTypes.INTEGER,
      },
      skill_fk_accuracy: {
        type: DataTypes.INTEGER,
      },
      skill_long_passing: {
        type: DataTypes.INTEGER,
      },
      skill_ball_control: {
        type: DataTypes.INTEGER,
      },
      movement_acceleration: {
        type: DataTypes.INTEGER,
      },
      movement_sprint_speed: {
        type: DataTypes.INTEGER,
      },
      movement_agility: {
        type: DataTypes.INTEGER,
      },
      movement_reactions: {
        type: DataTypes.INTEGER,
      },
      movement_balance: {
        type: DataTypes.INTEGER,
      },
      power_shot_power: {
        type: DataTypes.INTEGER,
      },
      power_jumping: {
        type: DataTypes.INTEGER,
      },
      power_stamina: {
        type: DataTypes.INTEGER,
      },
      power_strength: {
        type: DataTypes.INTEGER,
      },
      power_long_shots: {
        type: DataTypes.INTEGER,
      },
      mentality_aggression: {
        type: DataTypes.INTEGER,
      },
      mentality_interceptions: {
        type: DataTypes.INTEGER,
      },
      mentality_positioning: {
        type: DataTypes.INTEGER,
      },
      mentality_vision: {
        type: DataTypes.INTEGER,
      },
      mentality_penalties: {
        type: DataTypes.INTEGER,
      },
      mentality_composure: {
        type: DataTypes.INTEGER,
      },
      defending_marking_awareness: {
        type: DataTypes.INTEGER,
      },
      defending_standing_tackle: {
        type: DataTypes.INTEGER,
      },
      defending_sliding_tackle: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_diving: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_handling: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_kicking: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_positioning: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_reflexes: {
        type: DataTypes.INTEGER,
      },
      goalkeeping_speed: {
        type: DataTypes.INTEGER,
      },
      ls: {
        type: DataTypes.STRING,
      },
      st: {
        type: DataTypes.STRING,
      },
      rs: {
        type: DataTypes.STRING,
      },
      lw: {
        type: DataTypes.STRING,
      },
      lf: {
        type: DataTypes.STRING,
      },
      cf: {
        type: DataTypes.STRING,
      },
      rf: {
        type: DataTypes.STRING,
      },
      rw: {
        type: DataTypes.STRING,
      },
      lam: {
        type: DataTypes.STRING,
      },
      cam: {
        type: DataTypes.STRING,
      },
      ram: {
        type: DataTypes.STRING,
      },
      lm: {
        type: DataTypes.STRING,
      },
      lcm: {
        type: DataTypes.STRING,
      },
      cm: {
        type: DataTypes.STRING,
      },
      rcm: {
        type: DataTypes.STRING,
      },
      rm: {
        type: DataTypes.STRING,
      },
      lwb: {
        type: DataTypes.STRING,
      },
      ldm: {
        type: DataTypes.STRING,
      },
      cdm: {
        type: DataTypes.STRING,
      },
      rdm: {
        type: DataTypes.STRING,
      },
      rwb: {
        type: DataTypes.STRING,
      },
      lb: {
        type: DataTypes.STRING,
      },
      lcb: {
        type: DataTypes.STRING,
      },
      cb: {
        type: DataTypes.STRING,
      },
      rcb: {
        type: DataTypes.STRING,
      },
      rb: {
        type: DataTypes.STRING,
      },
      gk: {
        type: DataTypes.STRING,
      },
      player_face_url: {
        type: DataTypes.STRING,
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "jugadores",
      timestamps: true,
    }
  );

  return Jugador;
};
