import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_uri: process.env.DB_URI,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_access_secret: process.env.JWT_REFRESH_ACCESS_SECRET,
  jwt_refresh_access_secret_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  front_end_link: process.env.FRONT_END_LINK,
};
