const express = require('express');
const serverConfig = require('./Config/serverConfig');
const { connectedDB } = require('./Config/dbConfig');
const routes = require('./Router/userRouter');
const cartRouter = require('./Router/cartRouter');
const authRouter = require('./Router/authRoute');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}));

// this is the user Routers
app.use('/user', routes);

// this is the cart Routers
app.use('/cart', cartRouter);

app.use('/auth', authRouter);

app.post('/pack', (req, res)=>{
    res.json({message: "this routs is pack"});
    console.log(req.body);
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