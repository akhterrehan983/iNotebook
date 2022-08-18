const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?readPreference=primary&ssl=false";

const connectToMongo = () => {
    mongoose.connect(mongoURI,()=>{console.log("DataBases connected successfully")})
}

module.exports = connectToMongo