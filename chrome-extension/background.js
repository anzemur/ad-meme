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

$('#test').on('click', function () {
    console.log("hej")
    var key = ""
    var url = ""
    debugger;

    var client = new HttpClient();
    client.get('http://localhost:3000/api/v1/file-upload/signed-url', function(response) {
        try {
            response = JSON.parse(response)
            key = response.key
            url = response.url

            var formData = new FormData($('form')[0]);

            var xhr = new XMLHttpRequest();
            xhr.open("PUT", url, true);
            // xhr.setRequestHeader('Content-type','application/json; charset=utf-8');
            xhr.onload = function () {
              var users = JSON.parse(xhr.responseText);
              if (xhr.readyState == 4 && xhr.status == "200") {
                console.table(users);
              } else {
                console.error(users);
              }
            }
            xhr.send(formData);

            $.ajax({
                // Your server script to process the upload
                url: url,
                type: 'PUT',
            
                // Form data
                data: new FormData($('form')[0]),
            
                // Tell jQuery not to process data or worry about content-type
                // You *must* include these options!
                cache: false,
                contentType: false,
                processData: false,
            
                // Custom XMLHttpRequest
                xhr: function () {
                  var myXhr = $.ajaxSettings.xhr();
                  if (myXhr.upload) {
                    // For handling the progress of the upload
                    myXhr.upload.addEventListener('progress', function (e) {
                      if (e.lengthComputable) {
                        $('progress').attr({
                          value: e.loaded,
                          max: e.total,
                        });
                      }
                    }, false);
                  }
                  return myXhr;
                }
              });

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


