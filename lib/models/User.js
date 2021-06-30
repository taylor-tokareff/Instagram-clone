import jwt from 'jsonwebtoken';
import pool from '../utils/pool.js';

export default class User {
  id;
  userName;
  passwordHash;
  profilePhotoUrl;

  constructor(row) {
    this.id = row.id;
    this.userName = row.user_name;
    this.passwordHash = row.password_hash;
    this.profilePhotoUrl = row.profile_photo_url;
  }

  static async insert({ userName, passwordHash, profilePhotoUrl }) {
    console.log(profilePhotoUrl);
    const { rows } = await pool.query(
      'INSERT INTO users (user_name, password_hash, profile_photo_url) VALUES ($1, $2, $3) RETURNING *',
      [userName, passwordHash, profilePhotoUrl]
    );

    return new User(rows[0]);
  }

  static async findByUserName(userName) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE userName = $1',
      [userName]
    );

    if (!rows[0]) return null;
    return new User(rows[0]);
  }

  authToken() {
    return jwt.sign({ ...this }, process.env.APP_SECRET, {
      expiresIn: '24h'
    });
  }

  toJSON() {
    return {
      id: this.id,
      userName: this.userName,
      profilePhotoUrl: this.profilePhotoUrl
    };
  }
}
