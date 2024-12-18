const {io} = require('../index');

//Mensajes de Sockets
io.on('connection',client =>{
    console.log('Cliente conectado');

    client.on('disconnect',() => {
        console.log('Cliente desconectado');
    }); 

    client.on('message',(payload) => {
        console.log('Nuevo mensaje:',payload);
        client.emit('message',{admin: 'Mensaje del admin'});
    });
});