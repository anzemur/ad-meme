var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open("GET", aUrl, true);            
        anHttpRequest.send(null);
    }

    this.post = function(aUrl, body, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() { 
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
      }

      anHttpRequest.open("POST", aUrl, true);
      anHttpRequest.setRequestHeader('Content-type','application/json; charset=utf-8');
      anHttpRequest.send(body);
    }


    this.put = function(aUrl, body, aCallback) {
      var anHttpRequest = new XMLHttpRequest();
      anHttpRequest.onreadystatechange = function() { 
        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
            aCallback(anHttpRequest.responseText);
      }

      anHttpRequest.open("PUT", aUrl, true);            
      anHttpRequest.send(body);
    }
}

$('#img-file').on('change', function () {
  $("#success-msg").addClass('hidden');

  var key = ""
  var url = ""

  var client = new HttpClient();
  client.get('http://localhost:3000/api/v1/file-upload/signed-url', function(response) {
    try {
      response = JSON.parse(response)
      key = response.key
      url = response.url

      var file = document.getElementById("img-file").files[0];
      client.put(url, file, function(response) {
        var postData = JSON.stringify({ key: key })
        client.post('http://localhost:3000/api/v1/memes/', postData, function(response) {
          $("#success-msg").removeClass('hidden');
        })
      })
    } catch (error) {
      console.log(error);
    }
  });
});

var client = new HttpClient();
client.get('http://localhost:3000/api/v1/memes', function(response) {
    try {
        response = JSON.parse(response)
        console.log(response)
        for (var i = 0; i < response.length; i++) {
            console.log(response[i])
            $('#topMemes').append('<div class="img-wrapper"><div class="likes">' + response[i].likes + ' likes</div><img class="meme-image" src="' + response[i].imageUrl + '"/></div>');
        }
    } catch (error) {
        console.log(error);
    }
});


