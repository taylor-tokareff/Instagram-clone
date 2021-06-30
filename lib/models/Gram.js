import pool from '../utils/pool';

export default class Gram {
  id;
  userName;
  profilePhotoUrl;
  caption;
  tags;

  constructor(row) {
    this.id = row.id;
    this.userName = row.user_name;
    this.profilePhotoUrl = row.profile_photo_url;
    this.caption = row.caption;
    this.tags = row.tags;
  }

  static async insert({ userName, profilePhotoUrl, caption, tags }) {
    const { rows } = await pool.query(
      'INSERT INTO grams (user_name, profile_photo_url, caption, tags) VALUES ($1, $2, $3, $4) RETURNING *',
      [userName, profilePhotoUrl, caption, tags]
    );

    return new Gram(rows[0]);
  }
}
