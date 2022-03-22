const { Pool } = require('pg');

class NotesService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylist(playlistid) {
    const query = {
      text: `
        SELECT playlists.id, playlists.name
        FROM playlists 
        WHERE id = $1 `,
      values: [playlistid],
    };

    const { rows } = await this._pool.query(query);
    return rows[0];
  }

  async getSongs(id) {
    const query = {
      text: `
        SELECT songs.id, songs.title, songs.performer FROM songs 
        LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
        WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };

    const { rows } = await this._pool.query(query);
    return rows;
  }
}

module.exports = NotesService;
