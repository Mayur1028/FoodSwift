const mongoose = require('mongoose');
//uri to connect to Mongodb Compass 
const mongoURI = "mongodb+srv://foodswift:mayur1001@cluster0.vem5avr.mongodb.net/foodswiftdb?w=majority&retryWrites=true"
const mongoDB = async () => {
  try {
    //connecting to mongoDB Compass
    await mongoose.connect(mongoURI);
    console.log('Connected!');

    //fetcing the data from collection food_items in database 
    let fetched_data = await mongoose.connection.db.collection("food_item");
    let data = fetched_data.find({}).toArray(async function (error, data) {

      //fetching to which catogory it belongs to
      const foodCat = await mongoose.connection.db.collection("foodCategory");

      foodCat.find({}).toArray(async function (error, catData) {
        if (error) console.log(error);
        else {
          //we are settting the data globally so that we can use it in frontend
          global.food_item = data;
          global.foodCat = catData;
        }
      })
    })
  } catch (error) {
    console.log('err: ', error);
  }
};

module.exports = mongoDB();