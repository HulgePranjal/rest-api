//now I'm going to create connection code.

let express = require('express'),
    path = require('path'),
    mongoose = require('mongoose'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    mongoDb = require('./database/db');

mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected successfully !!")
},
    error => {
        console.log("Database Error:" + error)
    })

//Now I'm going to create port & server

const bookRoute = require("./node-backend/routes/bookroutes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cors());
//Now create statick path
app.use('/',express.static(path.join(__dirname, 'angular')));
//API Root
app.use('/api', bookRoute);
//port create
const port = process.env.port || 8000;
app.listen(port, () => {
    console.log('Port is Listening at:' + port);
})

//404 Error handler..
app.use((req,res,next)=>{
    next(createError(404));
});

//Base Route
app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});

app.use((req,res,next)=>{
    res.sendFile(__dirname, 'index.html');
});

app.use(function(error,req,res,next){
    console.log(error.message);
    if(!err.statusCode)err.statusCode=500;
    res.status(err.statusCode).send(err.message);
});