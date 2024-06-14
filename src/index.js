const express = require('express');
const serverConfig = require('./Config/serverConfig');
const { connectedDB } = require('./Config/dbConfig');
const routes = require('./Router/userRouter');
const cartRouter = require('./Router/cartRouter');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: true}))

// this is the user Routers
app.use('/user', routes);

// this is the cart Routers
app.use('/cart', cartRouter);

app.post('/pack', (req, res)=>{
    res.json({message: "this routs is pack"});
    console.log(req.body);
})

app.listen(serverConfig.PORT, async ()=>{
    await connectedDB();
    console.log(`Server start at the ${serverConfig.PORT}`);
})