const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);
const port = process.env.PORT || 4202;

const db = require('./db/crud/crud');

//const sanitize = require('../utils/sanitize');
// serves a file in /public if it exists
app.use(express.static(path.join(__dirname, '../public')));

// redirects all other files to main.js
app.get('/*', (req, res) => {
  //req.url = sanitize(req.url);

  //modifies the req object so that all paths get routed to /. This doesn't modify anything the user can see. Main.js routes requests based on window.location.pathname.
  if (!req.url.includes('.')) {
    req.url = '/';
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});


io.on('connection', (socket) => {
  // console.log('server: connected.');

  socket.on('createPost', async (post, acknowledge) => {

    let err;
    let result;

    if (!!await db.readPost(post.name)) {
      err = `There is already a blog post with the name ${post.name}. Please choose a different name.`;
    } else {
      result = await db.createPost(post.name, post.content);
      // console.log('created', result);
    }
    acknowledge(err, result);

  });
  socket.on('readPost', async (name, acknowledge) => {
    let err;
    let result;

    result = await db.readPost(name);

    if (!result) err = `Could not find a blog post with the name ${name}.`;
    // console.log('read', result);
    acknowledge(err, result);
  });
  socket.on('readAllPosts', async (name, acknowledge) => {
    let err;
    let result;

    result = await db.readAllPosts(name);

    if (!result) err = `Could not find any blog posts.`;
    // console.log('read', result);
    acknowledge(err, result);
  });
  socket.on('updatePost', async (post, acknowledge) => {
    let err;
    let result;

    if (!await db.readPost(post.name)) {
      err = `There is no blog post with the name ${post.name}.`;
    } else {
      result = await db.updatePost(post.name, post.content);
      // console.log('updated', result);
    }
    acknowledge(err, result);
  });
  socket.on('updateName', async (post, acknowledge) => {
    let err;
    let result;

    if (!await db.readPost(post.name)) {
      err = `There is no blog post with the name ${post.name}.`;
    } else {
      result = await db.updateName(post.name, post.content);
      // console.log('updated name:', result);
    }
    acknowledge(err, result);
  });
  socket.on('deletePost', async (name, acknowledge) => {
    let err;
    let result;

    result = await db.deletePost(name);

    if (!result) err = `Could not find a blog post with the name ${name}.`;
    // console.log('deleted', result);
    acknowledge(err, result);
  });
  socket.on('deleteAllPosts', async (password, acknowledge) => {
    let err;
    let result;

    result = await db.deleteAllPosts(sanitize(password));
    if (result === true) {
       err = 'Incorrect password.';
    } else if (!result) err = `Could not find any blog posts.`;
    // console.log('deleted', result);
    acknowledge(err, result);
  });
});

server.listen(port, () => {console.log(`http server listening on port ${port}`)});
