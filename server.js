const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config({path:'variable.env'})

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
    console.error('Error: '+ error.message);
});

app.set('port',process.env.PORT || 7777);
const server = app.listen(app.get('port'), () => {
    console.log("Servidor rodando na porta: " + server.address().port)
})