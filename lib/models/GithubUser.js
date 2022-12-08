const pool = require('../utils/pool.js');

module.exports = class GithubUser {
  id;
  login;
  avatar;

  constructor(row) {
    this.id = row.id;
    this.login = row.login;
    this.avatar = row.avatar;
  }

  static async getByLogin(login) {
    // return null;
    const { rows } = await pool.query(
      `SELECT *
        FROM github_users
        WHERE login=$1
        `,
      [login]
    );
    if (!rows[0]) return null;
    return new GithubUser(rows[0]);
  }

  static async insert({ login, avatar }) {
    if (!login) throw new Error('login required');
    const { rows } = await pool.query(
      `
        INSERT INTO github_users (login, avatar)
        VALUES ($1, $2)
        RETURNING *
        `,
      [login, avatar]
    );
    // console.log('GithubUser model inserted rows::', rows[0]);
    return new GithubUser(rows[0]);
  }
};
