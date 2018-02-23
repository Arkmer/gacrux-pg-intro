const app = angular.module('songsApp', []);

app.controller('songsAppController', ['$http', function($http){
  console.log('songsAppController loaded');
  let self = this;
  
  self.playlist = []
  self.newSong = {};
  self.createNewSong = function(newSong){
    console.log('createNewSong', newSong);
    // self.playlist.push(angular.copy(self.newSong));
    // console.log('playlist', self.playlist);
    $http({
      method: 'POST',
      url: '/songs/add',
      data: newSong
    }).then(function(response){
      console.log('POST response:', response);
      self.getAllSongs();
    }).catch(function(error){
      console.log(error);
    });
  }

  self.getAllSongs = function(){
    $http({
      method: 'GET',
      url: '/songs'
    }).then(function(response){
      console.log('GET response:', response);
      self.playlist = {};
      self.playlist = response.data;
      console.log('playlist', self.playlist);
    }).catch(function(error){
      console.log(error);
    });
  }
}])

// $(document).ready(onReady);

// function onReady(){
//   console.log('Hello');
//   getAllSongs();

//   $('#btn-add').on('click', function(event){
//     event.preventDefault();
//     let song = getNewSong();
//     addSong(song);
//   })

//   function getAllSongs() {
//     $.ajax({
//       type: 'GET',
//       url: '/songs'
//     })
//     .done(function(response){
//       console.log('Getting all songs:', response);
//       displaySongs(response);
//     })
//     .fail(function(error){
//       console.log(error);
//     })   
//   }

//   function getNewSong() {
//     const song = {
//       track: $('#in-track').val(),
//       artist: $('#in-artist').val(),
//       published: $('#in-date').val(),
//       rank: $('#in-rank').val(),
//     }
//     return song;
//   }

//   function clearAddForm() {
//     $('#in-track').val('');
//     $('#in-artist').val('');
//     $('#in-date').val('');
//     $('#in-rank').val('');
//   }

//   function addSong(song) {
//     $.ajax({
//       type: 'POST',
//       url: '/songs/add',
//       data: song
//     })
//     .done(function(response){
//       console.log('Added song:', song);
//       clearAddForm();
//       getAllSongs();
//     })
//     .fail(function(error){
//       console.log(error);
//     })
//   }

//   function updateSongRating(id, newRating) {
//     $.ajax({
//       type: 'PUT',
//       url: `/songs/${id}`,
//       data: { rating: newRating }
//     })
//     .done(function (response) {
//       console.log('Updated song rating');
//       getAllSongs();
//     })
//     .fail(function (error){
//       console.log(error);
//     })
//   }

//   function deleteSong(id){
//     $.ajax({
//       type: 'DELETE',
//       url: `songs/${id}`,
//     })
//     .done(function (response){
//       console.log('Deleted song');
//       getAllSongs();
//     })
//     .fail(function(error) {
//       console.log(error);
//     })
//   }

//   function displaySongs(songs) {
//     for (let song of songs) {
//       $('#out-songs').append(`<tr><td>${song.track}</td>
//         <td>${song.artist}</td><td>${formatDate(song.published)}</td>
//         <td>${song.rank}</td></tr>`);
//     }
//   }

//   function formatDate(isoDateStr) {
//     let result = ''
//     if (isoDateStr != null) {
//       let date = new Date(isoDateStr);
//       result = date.toLocaleDateString();
//     }
//     return result;
//   }
// }