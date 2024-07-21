const express = require('express');
const serverConfig = require('./Config/serverConfig');
const { connectedDB } = require('./Config/dbConfig');
const routes = require('./Router/userRouter');
const cartRouter = require('./Router/cartRouter');
const authRouter = require('./Router/authRoute');
const cookieParser = require('cookie-parser');
const { isLoggedIn } = require('./Validations/authValidator');
const uploader = require('./Middleware/multerMiddleware');
const cloudinary = require('./Config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./Router/productRoute');
const orderRouter = require('./Router/orderRoutes');
const cors = require('cors');


const app = express();

app.use(cors({
    origin: 'https://wings-pizza-gpj.netlify.app/',
    // origin: http://localhost:5173/,
    credentials : true,
    // optionsSuccessStatus: 200,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

// this is the user Routers
app.use('/user', routes);

// this is the cart Routers
app.use('/cart', cartRouter);

app.use('/auth', authRouter);

// this is the product routes
app.use('/products', productRouter);

//this is the order routes
app.use('/orders', orderRouter)

app.post('/photo', uploader.single('incomingFile'), async (req, res)=>{
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("result from cloudinary", result);
    await fs.unlink(req.file.path);
    return res.json({message : "ok"})
});

app.get('/pack',isLoggedIn, (req, res)=>{
    res.json({message: "this routs is pack"});
    console.log(req.body);
    console.log(req.cookies);
})

app.listen(serverConfig.PORT, async ()=>{
    await connectedDB();
    console.log(`Server start at the ${serverConfig.PORT}`);
})


//
// email
// "user11@gmail.com"
// password
// "7894531111"
//



// email "user66@gmail.com"
// password"7894536666"