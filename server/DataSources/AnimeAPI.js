const { RESTDataSource } = require('apollo-datasource-rest');
const { Pool } = require('pg');

class AnimeAPI extends RESTDataSource {
  constructor() {
    super();
    this.pool = new Pool({
      host: process.env.HOST || '',
      port: '5432',
      user: process.env.USER || '',
      password: process.env.PASS || '',
      database: process.env.DB || '',
      max: 20,
      connectionTimeoutMillis: 0,
      idleTimeoutMillis: 0
      // ssl: {
      // rejectUnauthorized: false
      // }
    });
  }

  getAllAnime = () => {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client) => {
        if (err) {
          console.error('connection error', err);
          reject(err);
        }
        const selectQuery = `
        SELECT *
        FROM anime;
      `;
        const selectQuery2 = `
        SELECT *
        FROM characters;
      `;

        client.query(selectQuery, (err, anime) => {
          if (err) {
            console.error('Error running query.', err);
            reject(err);
          }

          let allAnime = anime.rows;

          client.query(selectQuery2, (err, characters) => {
            if (err) {
              console.error('Error running query.', err);
              reject(err);
            }

            allAnime.forEach((anime) => {
              anime.characters = [];
              characters.rows.forEach((char) => {
                if (parseInt(anime.id) === char.animeid) {
                  anime.characters.push(char);
                }
              });
            });

            resolve(allAnime);
          });
        });
      });
    });
  };

  getAllCharacters = () => {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client) => {
        if (err) {
          console.error('connection error', err);
          reject(err);
        }
        const selectQuery = `
			SELECT *
			FROM characters;
		`;

        client.query(selectQuery, (err, result) => {
          if (err) {
            console.error('Error running query.', err);
            reject(err);
          }

          resolve(result.rows);
        });
      });
    });
  };

  addNewAnime = (anime) => {
    const insertQuery = `
		INSERT INTO anime (
			id,
			title,
			episodes,
			status,
			rank,
			year,
			image
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7
		)
	`;
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client) => {
        if (err) {
          console.error('connection error', err);
          reject(err);
        }

        client.query(
          insertQuery,
          [
            anime.id,
            anime.title,
            anime.episodes,
            anime.status,
            anime.rank,
            anime.year,
            anime.image
          ],
          (err, result) => {
            if (err) {
              console.error('Error running query.', err);
              reject(err);
            }

            resolve(anime);
          }
        );
      });
    });
  };

  addNewCharacter = (character) => {
    const insertQuery = `
		INSERT INTO characters (
			id,
			name,
			favorites,
			about,
			image,
      animeid
		) VALUES (
			$1, $2, $3, $4, $5, $6
		)
	`;
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client) => {
        if (err) {
          console.error('connection error', err);
          reject(err);
        }

        client.query(
          insertQuery,
          [
            character.id,
            character.name,
            character.favorites,
            character.about,
            character.image,
            character.animeid
          ],
          (err, result) => {
            if (err) {
              console.error('Error running query.', err);
              reject(err);
            }

            resolve(character);
          }
        );
      });
    });
  };
}

module.exports = AnimeAPI;
