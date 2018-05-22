const URL = 'http://localhost:3000';

let mainId = null;
let photoId = null;
const clearHtml = '';

$(document).ready(() => {
  $.get(`${URL}/users`, data => {
    buildUserList(data);
  });

});

const buildUserList = userData => {
  userData.forEach(user => {
    const { id, name} = user;
    const html = `<a href="#!" user-id=${id} class="collection-item user-list-item">${name}</a>`;
    $('#user-list').append(html);
  });

  $('.user-list-item').click(function() {
    const userId = $(this).attr('user-id');
    const userAlbum = userData[userId -1];
    const html = `<li class="collection-header"><h4>${userAlbum.name}'s Albums</h4></li>`;
    $('#album-list').html(html);
    $('#photo-list').html(clearHtml);
    $('#photo-card').html(clearHtml);
    mainId = parseInt(userId);

    $.get(`${URL}/albums`, data => {
      buildAlbumList(data);
    });
    onSelectUser(userId);
  });
};

const buildAlbumList = albumData => {
  albumData.reduce((list, album) => {
    if( album.userId === mainId ) {
      const {id, title} = album;
      const html = `<a href="#photo-heading" album-id=${id} class="collection-item album-list-item">${title}</a>`;
      $('#album-list').append(html);
    }
  }, []);

  $('.album-list-item').click(function() {
    const albumId = $(this).attr('album-id');
    const userAlbum = albumData[albumId -1];
    const html = `<li class="collection-header" id="#photo-heading"><h4>${userAlbum.title}'s Albums</h4></li>`;
    $('#photo-list').html(html);
    $('#photo-card').html(clearHtml);
    photoId = parseInt(albumId);
    $.get(`${URL}/photos`, data => {
      buildPhotoList(data);
    });
  });
};

const buildPhotoList = photoData => {

  photoData.reduce((list, photo) => {
    if( photo.albumId === photoId ) {
      const {url, title} = photo;
      const html = `
      <div class="col s12 m6 l4" >
        <div class="card">
          <div class="card-image" id="image">
            <img src="${url}" alt="album picture">
          </div>
          <div class="card-title">
          <p>${title}</p>
        </div>
        </div>
      </div>`;
      $('#photo-card').append(html);
    }
  }, []);

};

const onSelectUser = userId => {
  console.log(`Now get user ${userId}'s albums...`);
};

$('.reload').click(function() {
  location.reload();
});
