const {io}  = require ('../index');
const Band = require ('../models/band');
const Bands = require ('../models/bands');


const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Green Day'));
bands.addBand(new Band('Good Charlotte'));
bands.addBand(new Band('Simple Plan'));

//Mensajes de Sockets
io.on('connection',client =>{
    console.log('Cliente conectado');

    client.on('disconnect',() => {
        console.log('Cliente desconectado');
    }); 

    client.emit('active-bands',bands.getBands());

    client.on('message',(payload) => {
        // console.log('Nuevo mensaje:',payload);
        client.emit('message',{admin: 'Mensaje del admin'});
    });

    client.on('send-message',(payload) => {
        client.broadcast.emit('new-message', payload);
    });

    client.on('vote-band',(payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });

    client.on('add-band',(payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands',bands.getBands());
    });

    client.on('delete-band',(payload) => {
        bands.deletBand(payload.id);
        io.emit('active-bands',bands.getBands());
    });
});