import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    "postgresql://handmade_user:7xjuDcK3PnbZ2Sk5n89PZghM2Rq1pkjt@dpg-ctu43ehopnds73cit67g-a.oregon-postgres.render.com/handmade_w129", {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default sequelize;