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
    console.log('::You made it to the model::');
    const { rows } = await pool.query(
      `
        SELECT * 
        FROM posts
        `
    );
    return rows;
  }
}

module.exports = { Post };
