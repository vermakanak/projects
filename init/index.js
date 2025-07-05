
const mongoose = require("mongoose");
const initdata = require("./data.js");
const listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Airbnb';

main()
    .then(() => {
        console.log("connect to db");
    })
    .catch((err) => {
        console.log(err);
    });
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
    await listing.deleteMany({});
    initdata.data = initdata.data.map((obj) => ({
        ...obj,
        owner:"685bcac75f70e8931d316cfb",
    }));
    await listing.insertMany(initdata.data);
    console.log("data was initialized");
};

initDB();