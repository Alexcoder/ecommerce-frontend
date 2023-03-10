const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")

const app = express();
dotenv.config()

mongoose.connect(process.env.CONNECTION_URL).then(()=>console.log("DB Connection Successfull!"))
.catch((err)=> {console.log(err)})

app.use(express.json());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);

app.listen(process.env.PORT || 5000, ()=>{
    console.log("Backend Server Connected ")
});;

mongoose.set('strictQuery', true);