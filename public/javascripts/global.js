var userListData = [];

$(document).ready(function(){
  populateTable();
  $('#btnAddUser').on('click', addUser);
  $('#pairingChart section').on('click', 'a.linkdeleteuser', deleteUser);
});

function populateTable(){
  var userInfo = '';
  var profilePicture = '';
  $.getJSON('/users/userlist', function(data){
    userListData = data;
    $.each(data, function(){
      // userInfo += '<div id="hover_over_' + this.username + '">' + this.username + '<br>' + this.fullname + '</div>';
      // userInfo += '<a href="#" class="linkdeleteuser" rel="' + this._id + '">delete</a>';
      $.get(this.githubProfile + "?client_id=c7858876a6ef8352b200&client_secret=f09d82db277445b1e9beb9f45a373d41edfba637", function(APIbody){
        userInfo += '<img src="' + APIbody.avatar_url + '" class="avatar-icon">';
        $('#pairingChart section').html(userInfo);
      });
    });
  });
}


function addUser(event) {
  event.preventDefault();
  var errorCount = 0; 
  $('#addUser input').each(function(index, val){
    if($(this).val() === '') {
      errorCount++;
    }
  });

  if(errorCount === 0){
    var newUser = {
      'username': $('#addUser fieldset input#inputUserName').val(),
      'fullname': $('#addUser fieldset input#inputFullName').val(),
      'githubProfile': "https://api.github.com/users/" + $('#addUser fieldset input#inputUserName').val()
    };

    $.ajax({
      type: 'POST',
      data: newUser,
      url: '/users/adduser',
      dataType: 'JSON'
    }).done(function(response){
      if (response.msg === ''){
        $('#addUser fieldset input').val('');
        populateTable();
      }
      else {
        alert('Error: ' + response.msg);
      }
    });
  }
  else {
    alert('Fill in all the fields you clown');
    return false;
  }
};

function deleteUser(event){
  event.preventDefault();
  var confirmation = confirm('Are you sure you want to delete this user?');
  if (confirmation === true) {
    $.ajax({
      type: 'DELETE',
      url: '/users/deleteuser/' + $(this).attr('rel')
    }).done(function(response){
      if (response.msg === '') {}
      else {
        alert('Error: ' + response.msg);
      }
      populateTable();
    });
  }
  else {
    return false;
  }
};


