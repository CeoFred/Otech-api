// const webSocketServer = require("websocket").server;


// const socket = (http) =>  {
    
//     const wsServer = new webSocketServer({
//         httpServer: http
//     });
  
//     // I'm maintaining all active connections in this object
//     const clients = {};
  
//     // This code generates unique connectionID for everyuser.
//     const getUniqueID = () => {
//         const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
//         return s4() + s4() + "-" + s4();
//     };
//     var classMessage = [];
//     let userActivities = [];
//     let users = [];
  
//     wsServer.on("request", function (request) {
  
//         var connectionID = getUniqueID();
//         var uid;
//         var classroom_id;
  
//         console.log(" Recieved a new connection from " + request.origin + ". with connection id " + connectionID);
//         // You can rewrite this part of the code to accept only the requests from allowed origin
//         const connection = request.accept(null, request.origin);
//         clients[connectionID] = connection;
  
  
//         let initMessage = {
//             type: "allMessages",
//             value: classMessage
//         };
  
//         let conectionManifest = {
//             type: "connection_manifest",
//             value: connectionID
//         };
  
//         // send a mannifest for every new connection
//         connection.send(JSON.stringify(conectionManifest));
  
  
//         // send old messages to new connections for a classroom
//         connection.sendUTF(JSON.stringify(initMessage));
  
  
//         connection.on("message", function (message) {
  
  
//             if (message.type === "utf8") {
  
//                 let dataFromClient = JSON.parse(message.utf8Data);
//                 console.log(dataFromClient);
//                 if (dataFromClient.type === "classroom_message") {

//                     // push new activity
  
//                     userActivities.push(`${dataFromClient.user_id} sent a new message`);
//                     console.log("new Message from " + dataFromClient.user_id);
  
//                     // new classroom message object
//                     const newClassRoomMessage = {
//                         message: dataFromClient.message.value,
//                         by: dataFromClient.user_id,
//                         classroom_id:classroom_id,
//                         on:new Date().getUTCMilliseconds()
//                     };
//                     // normally we are meant to add the message to the table of the particular classroom ,let's just push                
//                     classMessage.push(newClassRoomMessage);
  
  
//                     //get new messages for the classroom the user belongs to and send to every member of the room
  
  
//                     //attempt to send 
//                     users.forEach((user) => {
//                     //get connection id for a user
                 
//                         let connectid = user.con_id;
                
//                         // send to only those in the classroom as the user that sent the message       
//                         if (user.classroom === classroom_id) { //if the user is in the same classroom as the client
  
//                             let initMessage = {
//                                 type: "new_classroom_message",
//                                 value: newClassRoomMessage
//                             };
  
//                             clients[connectid].send(JSON.stringify(initMessage));
//                         }
  
//                     });
  
//                     //  sendMessage(JSON.stringify(initMessage))
  
  
//                 } else if (dataFromClient.type === "client_manifest") {
//                 // someone joined a classroom
  
  
//                     uid = dataFromClient.value.user_id;
//                     classroom_id = dataFromClient.value.classroom_id;
                
//                     // add user for saving
  
//                     users.push({ user: uid, classroom: classroom_id, con_id: connectionID });
                
//                     console.log(`${uid} joined ${classroom_id}`);
  
                
//                     //send old messages to new client
//                     //get new messages for the classroom the user belongs to and send to every member of the room
  
//                     let filteredMessageForUserCassroom = classMessage.filter(msg => {
//                         return msg.classroom_id === dataFromClient.classroom_id;
//                     });
  
//                     clients[connectionID].send(JSON.stringify({
//                         type:"oldMessages",
//                         value:filteredMessageForUserCassroom
//                     }));
  
  
  
//                     // send a user joined message to everyone in the classroom
//                     let userJoined = {
//                         type: "user_joined",
//                         value: uid
//                     };
  
//                     users.forEach((user) => {
//                     //get connection id for every user
//                         let connectid = user.con_id;
//                         // send to only those in the classroom as the user that joined       
//                         if (user.classroom === classroom_id && user.user_id !== uid) {
//                             clients[connectid].send(JSON.stringify(userJoined));
//                         }
//                     });
  
  
//                 }
  
//             }
//         });
  
//         connection.on("close", function (connection) {
  
//             console.log(uid + " disconnected.");
//             userActivities.push(`${uid} left the classroom`);
//             const json = { type: "user_left", value: uid };
//             const newu = users.filter((user) => {
//                 return user.user !== uid;
//             });
//             users.forEach((user) => {
//             //get connection id for every user
//                 let connectid = user.con_id;
//                 // send to only those in the classroom as the user that joined       
//                 if (user.classroom === classroom_id) {
//                     clients[connectid].send(JSON.stringify(json));
//                 }
//             });
//             users = newu;
  
//         });
  
//     });
  
  
// };

// module.exports =  socket;