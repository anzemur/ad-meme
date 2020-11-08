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
