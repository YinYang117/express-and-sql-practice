// Phase 2
const e = require('express');
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();
app.use(express.json()); // Allows the app to deserialize bodies with json content


// for clarity of what's being passed in the req.body
app.use((req, res, next) => {
  console.log('Request Body:', req.body);
  next();
});

app.get('/artists', (req, res, next) => {
  res.status(200);
  res.header = {
    'Content-Type': 'application/json'
  }
  res.send(getAllArtists());
})

app.post('/artists', (req, res, next) => {
  res.status(201);
  res.setHeader("Content-Type", "application/json");
  res.send(addArtist(req.body))
})

app.get('/artists/latest', (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.send(getLatestArtist());
})

app.get('/artists/latest/albums', (req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  res.send(getAlbumsForLatestArtist());
})

app.get('/artists/:artistId', (req, res, next) => {
  let id = req.params.artistId
  res.setHeader("Content-Type", 'application/json');
  res.send(getArtistByArtistId(id))
})

app.route('/artists/:artistId')
  .put((req, res, next) => {
    let id = req.params.artistId;
    res.setHeader("Content-Type", 'application/json');
    let updatedArtist = editArtistByArtistId(id, req.body);
    res.send(updatedArtist);
  })
  .patch((req, res, next) => {
  let id = req.params.artistId;
  res.setHeader("Content-Type", 'application/json');
  let updatedArtist = editArtistByArtistId(id, req.body);
  res.send(updatedArtist);
})

app.delete('/artists/:artistId', (req, res, next) => {
  let id = req.params.artistId;
  deleteArtistByArtistId(id);
  res.setHeader("Content-Type", 'application/json');
  res.send({"message": "Successfully deleted"});
})

app.get('/artists/:artistId/albums', (req, res, next) => {
  let id = req.params.artistId;
  res.setHeader("Content-Type", 'application/json');
  res.send(getAlbumsByArtistId(id));
})


// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}