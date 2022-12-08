const pool = require('../utils/pool');

class Post {
  id;
  detail;
  userId;

  constructor(row) {
    this.id = row.id;
    this.detail = row.detail;
    this.userId = row.user_id;
  }

  static async getAll() {
    const { rows } = await pool.query(
      `
        SELECT * 
        FROM posts
        `
    );
    return rows;
  }

  static async create({ detail, userId }) {
    const { rows } = await pool.query(
      `
        INSERT INTO
        posts (detail, user_id)
        VALUES
        ($1, $2)
        RETURNING *
        `,
      [detail, userId]
    );
    return new Post(rows[0]);
  }
}

module.exports = { Post };
