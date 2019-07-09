const express 	 = require('express')
const logger	 = require('morgan')
const bodyParser = require('body-parser')

// routes
const usersRoutes = require('./routes/users.routes')
const productsRoutes = require('./routes/products.routes')
const categoriesRoutes = require('./routes/categories.routes')
const productDetailsRoutes = require('./routes/productDetails.routes')

const productsModel = require('./app/api/models/products.model')

const app	 = express()

app.use(logger('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://shovee:shoveeadmin@cluster0-r6cir.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true, dbName: 'shovee_dev'
}).then(() => {
    console.log('connection success')
}).catch(err => {
    console.log(`connection error `, err)
    process.exit();
})

// public routes
app.get('/', (req, res) => {
	res.json({message: 'server running'})

})

app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/categories', categoriesRoutes)
app.use('/product-details', productDetailsRoutes)



const port = process.env.PORT || 3000
app.listen(port, ()=>{
	console.log(`server running in port ${port}`)
})

