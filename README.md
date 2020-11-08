![ad-meme-logo](https://raw.githubusercontent.com/anzemur/ad-meme/master/chrome-extension/images/ad-meme.png)

# AdMeme
Why remove ads when you can replace them with memes?

AdMeme is a Chrome extension which replaces ads on websites with the latest handpicked memes! 
You can also upload your own memes for you and your friends to enjoy.

AdMeme consists of a Google Chrome extension written in pure javascript and a backend service written in Node. Memes are stores on a AWS S3 bucket.

## Installation

### 1. Setup AWS and MongoDB

Create your own AWS S3 bucket and add the credentials to the `.env` file. For MongoDB you can run a `docker` instance or get a free instance on Atlas.

### 2. Setup environment variables

Insert your own environment variables in the `.env` file. Below is an example.

```
AWS_ACCESS_KEY_ID=<you-aws-access-key-id>
AWS_SECRET_KEY=<you-aws-secret-key>
AWS_BUCKET=<aws-bucket>
ENV=dev
DB_URL=<mongodb-connection-link>
DB_NAME=memes
PORT=3000
API_VERSION=v1
APP_URL=
AWS_REG=<aws-s3-bucket-region>
HOST_NAME=http://localhost:3000
```

### 3. Running

In the `api` directory run the following commands to install required libraries and start the backend service that handles memes serving.

```
$ npm install
$ npm start
```


For the Google Chrome extension open `chrome://extensions` and enable developer mode. Then click on the `load unpacked` button and select the `chrome-extension` folder to install the extension. 

### Enjoy the memes!
