//dependences
const express = require('express');
const dotenv = require('dotenv');

const colors = require('colors');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');


const errorHandler = require('./middleware/error');
dotenv.config({ path: "./config/config.env" });
const connectDB = require('./config/db');
const userRoute = require('./routes/UserRoute');
const profileRoute = require('./routes/ProfileRoute');
const postRoute = require('./routes/PostRoute');



connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/user', userRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/post', postRoute);
app.use(errorHandler);

if (process.env.NODE_ENV === "production") {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server has started on ${process.env.NODE_ENV} mode on port ${PORT}`.blue.bold));

process.on('unhandledRejection', (err, promise) => {
  console.log(`ERROR:${err.message}`.red);
  server.close(() => process.exit(1));
})


