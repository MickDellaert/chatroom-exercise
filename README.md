# Chatroom exercise

- Repository: `chatroom-exercise`
- Type of Challenge: `Learning`
- Duration: `2 - 4 days`
- Solo challenge

## Learning Objectives 
After this learning challenge, you'll be able to:
- Set up a node environment
- Make a connection between different clients and the servers
- Work with sockets
- Configure express and socket.io for node
- Make a basic chatroom

## The Mission
Now that you guys know how to configure a node server, let's make a chatroom to hang out with your friends and families!

### Steps

1. In the root of the project make a server and a client folder.
    - In the server folder, make a server.js file
    - In the client file make a html, css and js file. Link them in the html.
2. In the server folder, do the <code>npm init</code> command.
    - The default values for the following prompts are fine, but play around if you like.
    - This will generate a package.json with some information about our project and it's dependencies.
3. Next we are going to install express
    - <code>npm install express --save</code>
    - Go take a look at the package.json, it's there!
4. In the server.js file, let's require express and http
    - <code>const express = require('express');</code>
    - <code>const http = require('http');</code>
5. We will use express and http to make it easy to host our client
    - <code>const app = express();</code> To define our application
    - <code>const clientPath = \`${__dirname}/../client\`;</code> To give the path to our client
    - <code>app.use(express.static(clientPath));</code> To use express to host the client
    - <code>const server = http.createServer(app);</code> To use http to serve the app that express provides
    - One more step to get the server live
    - ```
      server.listen(8080, () =>{
         console.log("server running on "+port);
      });
      ```
    - <code>node server</code> and check your server out on localhost with the correct port!
6. Time to get socket.io installed
    - <code>npm install socket.io --save</code>
    - It's now inside of the package.json dependencies!
7. Time to set it up in the server
    - <code>const io = require('socket.io')(server);</code> to require socket.io!
    - The io variable is now the entry point of all the sockets connected to the server
8. The server now is ready to use socket.io, but for the client we still need to add the connection to socket.io
    - Add ```<script src="/socket.io/socket.io.js"></script>``` above your other script in the client html.
    - Add <code>let socket = io.connect();</code> to your script to define your socket.
9. Now we can start by making a connection from your client to your server
    - In your server.js, add the following code
    - ```
      io.on('connection', (socket) => {
          console.log('someone connected');
      });
      ```
    - If you open up your blank page at localhost 8080 nothing much will happen, but go take a look at the terminal which is running your server! In here you will see that someone connected!
10. At this moment you can connect with multiple devices to your server, try adding a little code to verify this.
    - In your server make a counter: <code>let counter = 0</code>
    - Change your console log in the connection to: <code>console.log(counter+' someone connected');</code>
    - Make the counter go up by 1 every time someone connects.
    - Now try connecting in 2 different browser tabs, in your terminal you will now see
    - ```
      0 someone connected
      1 someone connected
      ```
    - As you can see you can now connect with multiple devices to the same server.
11. Now let's make something happen, add an input field, 2 buttons and a target div.
    - The input will contain your message
    - 1 button that sends this message to all connected clients
    - 1 button that sends this message to you only
    - A target div where all messages will be displayed
12. On click of a button, do an emit to the server. The server will receive this and react appropriately after we give the server the instructions of what to do on said action.
    - For example, to send the message to everyone: <code>socket.emit('sendToAll', ('message'));</code>
    - Your server will now receive the call 'sendToAll', now we need to write code to make it react appropriately
13. In the connection function in your server, add the following:
    - ```
        socket.on('sendToAll', (message) =>{
            io.emit("displayMessage", (message));
        });
      ```
    - This is an observer that waits until the message "sendToAll" gets passed to the server.
    - When we press the button on the client, because of our emit on the client, the server will receive the 'sendToAll' call and execute the piece of code within on the server.
    - The io.emit on the server means that the server will now send the call to 'displayMessage' to ALL clients connected and also passes the message back as a parameter.
14. We have now sent the message from the client to the server, now we just need to receive it back from the server.
    - In the client add:
    - ```
        socket.on('displayMessage', (message) => {
            target.innerHTML += '<br>'+message;
        });
      ```
    - So now your client is waiting for the call to 'displayMessage' and then it will add that message to your target div.
    - Try connecting with a few browser tabs and sending messages to each other. 
15. So now we can send a message to everyone, let's see if we can send some messages that only the sender can see.
    - In your client, replicate the 'sendToAll' emit but now change it to be 'sendToMe'.
    - Now in the server you also have to make an observer for the message "sendToMe", so go ahead and replicate the "sendToAll" observer in the server.
    - Now instead of doing an io.emit, we are going to do a socket.emit. The difference here is that if you emit to io, all connected clients will receive the message, whereas the socket.emit will only send it back to the socket of which it received the message.
    - Try it out by opening some tabs and send a message to yourself. If only that client can see it, and the others don't receive it you've completed this step
16. Now we have all the tools we need to make a basic chatroom. The requirements you need to add will come with a small tip on how to achieve them.

### Must-have features

- Make a UI that makes it easy for people to send messages in this chatroom.
- It must be possible to send a message to everyone or to yourself
- Make sure we can identify who sent the message through a username.
    - We could make a local variable and prompt the user to choose a username
    - We can then emit this username along with the sent message to keep track of who sent what.
- Make a list to show everyone who is connected to the chatroom
- Implement something funny! The sky is the limit! (it can be very simple if you want)
    - For example, you could make a functionality to make someone else's font size obscurely small!
    - You could implement a feature where you can speak with someone else's username
    - AND SO MUCH MORE -> BE CREATIVE
    
### Nice-to-have features

- Instead of just asking for a username, we can make a user class with properties such as
    - username
    - password (if you make a login system)
    - avatar
    - font-color
    - ... whatever you want :D
    - ps: don't worry about security
- You can make different rooms to join by code
- Make it possible to send private messages to a person
- Add images, emojis, videos, gifs to your messages
- Bring back some features from MSN! (lol)
- Make a login / registration (a bit more difficult)
    - again, security is not a must
- PIMP IT

For the nice to haves, you definitely will need to research the documentation for a lot of them.
Go check it out at https://socket.io/docs/v4 


## MSN is BACK BABY

Can't wait to see what you come up with!

![agif!](https://media.giphy.com/media/11ZSwQNWba4YF2/giphy.gif)
