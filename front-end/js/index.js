const URL = "http://localhost:3000";

let mainId = null;

$(document).ready(() => {


  $.get(`${URL}/users`, data => {
    buildUserList(data);
  });

});

const buildUserList = userData => {
  console.log(userData);
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
    mainId = parseInt(userId);

    $.get(`${URL}/albums`, data => {
      buildAlbumList(data);
    });
    onSelectUser(userId);
  });

};

const buildAlbumList = albumData => {
  console.log('in albums', mainId);
  albumData.reduce((acc, album) => {
    if( album.userId === mainId ) {
      const {id, title} = album;
      const html = `<a href="#!" album-id=${id} class="collection-item user-list-item">${title}</a>`;
      $('#album-list').append(html);
    }
  }, []);
};

const onSelectUser = userId => {
  console.log(`Now get user ${userId}'s albums...`);

};
