const express = require('express')
const path = require('path')
const env = require('dotenv')

// IMPORT DB CONNECTION
const mongodbConnection = require('./config/db')

// IMPORT ALL MIDDILEARES
const ExpressMongoSanitize = require('express-mongo-sanitize');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

//IMPORT ALL ROUTES
const PrivateRouter = require('./routes/private/index');
const PublicRouter = require('./routes/public/index');
const homeRoute = require('./routes/home.route');

// IMPORTS ALL CUSTOM MIDDLEWARES
const { notFound, errorHandler } = require('./middlewares/errorMiddleware.js')

const app = express();
env.config()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// SETUP ALL MIDDLEWARES
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());
app.use(ExpressMongoSanitize());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MONGO DB CONNECTION, //TODO: JUST UNCOMMENT THE NEXT LINE AFTER ADDING YOUR MONGO DB URI TO .ENV FINE
mongodbConnection()

// DEFINE ALL ROUTES ENTRY POINTS
app.use('/', homeRoute);
app.use('/public', PublicRouter);
app.use('/public', PrivateRouter);

// SETUP ALL CUSTOM MIDDLEWARES
app.use(notFound)
app.use(errorHandler)

// Server Listen
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
console.log(`Server is listening on port ${PORT}`)
})
