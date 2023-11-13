

const express = require("express")

const app = express()

const cors = require("cors");
app.use(cors());
// to use (.env file access)

require('dotenv').config()


const dbConfig = require("./config/dbConfig")

const http = require("http").createServer(app)
const socketIo = require("socket.io"); // Require the Socket.io module

function intializeSocket(server) {
  const io = socketIo(server, {
      pingTimeout:60000,
      cors: {
          origin:["http://localhost:3000"]
       },
    });
    

  io.on('connection', (socket) => {
      socket.on('setup', (Data) => {

      // Data  -      userId
          socket.join(Data)
          socket.emit('connected')
          // console.log('A user connected123 ' +Data)
      });

      socket.on('join', (room) => {
          socket.join(room);
         
          // console.log("joined");
      })

      socket.on('chatMessage', (message) => {
     
         
          if (message.userId===message.senderId) {
      
            // console.log("seding ...to developer " +message.senderId);
              socket.in(message.developerId).emit("message recieved",message);
            
              

          }else{
            // console.log("seding ...to user  " +message.senderId );
          
              socket.in(message.userId).emit("message recieved", message);
          }
      });
     
      // socket.on("followNotification", (devId) => {
       
      //   if (devId) {
      //     socket.in(devId).emit("newNotification");
       
      //   }
      // });
   


      // socket.on('FirstChatNotificationMessage',(devId)=>{
      //   console.log("thisisalsoworking",devId)
      //   if(devId){
      //     const chatNotification=377
      //   }
      //   socket.in(devId).emit('newChatNotificationMessage',chatNotification)
      //   console.log("pakkaa")
      // })

      socket.on('disconnect', () => {
          // console.log('A user disconnected');
  });
});


}
  
// to destructure json type data from user as reqest 
app.use(express.json())

// user
const userRoute = require('./routes/userRoute')
// when ever this kind of end points come it will search in userRoute
app.use("/api/user", userRoute)

// developer
const developerRoute = require('./routes/developerRoute')
app.use("/api/developer", developerRoute)


//  developer
const adminRoute = require('./routes/adminRoute')
app.use("/api/admin", adminRoute)






const port = process.env.PORT || 5000;



const server = http.listen(port,()=>{
  console.log("server running");
})

intializeSocket(server)