const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/user');

const db = mongoose.connection

db.on('connected',(err)=>{
    if(err){
        consolr.log("Database is not connected");
        return false;
    }
    console.log("database is connected");
})

