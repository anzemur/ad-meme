var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}

$(':file').on('change', function () {
    var file = this.files[0];
  
    if (file.size > 1024) {
      alert('max upload size is 1k');
    }
});

$(':button').on('click', function () {

    var client = new HttpClient();
    client.get('http://localhost:3000/api/v1/file-upload/signed-url', function(response) {
        try {
            response = JSON.parse(response)
            for (var i = 0; i < response.length; i++) {
                console.log(response[i])
                $('#topMemes').append('<div class="img-wrapper"><div class="likes">' + response[i].likes + ' likes</div><img class="meme-image" src="' + response[i].imageUrl + '"/></div>');
            }
        } catch (error) {
            console.log(error);
        }    
        
    });


    $.ajax({
      // Your server script to process the upload
      url: 'http://localhost:3000/api/v1',
      type: 'POST',
  
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
  });

var client = new HttpClient();
client.get('http://localhost:3000/api/v1/memes', function(response) {
    try {
        response = JSON.parse(response)
        for (var i = 0; i < response.length; i++) {
            console.log(response[i])
            $('#topMemes').append('<div class="img-wrapper"><div class="likes">' + response[i].likes + ' likes</div><img class="meme-image" src="' + response[i].imageUrl + '"/></div>');
        }
    } catch (error) {
        console.log(error);
    }    
    
});


