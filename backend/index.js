const express = require('express')
const app = express()
const User = require('../backend/models/User')
const Order = require("../backend/models/Orders")
const UserMsg = require("../backend/models/ContactMsg")
const port = 5000
const mongoDB = require("./db");
mongoDB
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//this are the 32 character that jwt token uses to create a token
const jwtSec = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
})

app.get('/', (req, res) => {
  res.send("Hello World")
})


// This a api for creating user
app.use(express.json())
app.post('/createuser',
  async (req, res) => {

    // This is salt method used to create encrypted password
    const salt = await bcrypt.genSalt(10);
    let SecPassword = await bcrypt.hash(req.body.password, salt);

    try {
      //here we are awaiting to let the backend create a user schema taking the value from frontend
      //using req.body
      await User.create({
        name: req.body.name,
        password: SecPassword,
        address: req.body.address,
        email: req.body.email,
        date: new Date()
      })
      res.json({ success: true });
    }
    catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  });

// this is the api to let user to login if athuntication is done
app.use(express.json())
app.post('/loginuser',
  async (req, res) => {
    let email = req.body.email;
    try {
      //here were are to let server to find the user details with particular mail id in backend
      let userData = await User.findOne({ email });

      //If user not found error generated
      if (!userData) {
        return res.status(400).json({ error: "try login with correct credentials" })
      }

      //here we are comparing the password which we got from frontend with the encrypted password by bycrptjs  in the database
      const passwordCom = await bcrypt.compare(req.body.password,userData.password)

      //is password is not equals to the encrypted password then error is raised
      if (!passwordCom === userData.password) {
        return res.status(400).json({ error: "try login with correct credentials" })
      }

      //here we are collecting id of the user to pass it to jwtToken
      const data ={
        user:{
          id:userData.id
        }
      }

      //here we are creating the jwtToken which needs data and the 32 char we have defined
      const authToken = jwt.sign(data,jwtSec)
      return res.json({ success: true ,authToken: authToken})
    }
    catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  });



  app.post('/foodData',
  async (req, res) => {
    try {
      //we took the data from the db.js of the food item and the foot catogory which was declared global and send it as 
      //a response to front end
        res.send([global.food_item,global.foodCat])
    }
    catch(err){
        console.error(err.message);
        res.send("Server Error")
    }
  })


  app.post('/orderData',
  async (req, res) => {
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }

  })



  app.post('/myOrderData', async (req, res) => {
    try {
        console.log(req.body.email)
        let eId = await Order.findOne({ 'email': req.body.email })
        //console.log(eId)
        res.json({orderData:eId})
    } catch (error) {
        res.send("Error",error.message)
    }

});


//Here we are taking the contact details from contactpage frontend and giving it to contactmsg schema
app.use(express.json())
app.post('/usermsg',
  async (req, res) => {
    try {
      await UserMsg.create({
        name: req.body.name,
        email: req.body.email,
        message:req.body.message
      })
      res.json({ success: true });
    }
    catch (error) {
      console.log(error)
      res.json({ success: false });
    }
  });

app.listen(port, () => {
  console.log("Example app listening to port ", port)
})

