const express = require('express');
require('dotenv').config();
const dbConnect = require('./config/dbconnect');
const initRoutes = require('./routes');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
const port = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
dbConnect();
initRoutes(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})

//npm run dev
















































// const express = require('express');
// const app = express();
// require('dotenv').config();
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const morgan = require('morgan');
// const cors = require('cors');
// const cookieParser = require('cookie-parser');
// const errorHandler = require('./middleware/error');

// //IMPORT ROUTES
// const authRoutes = require('./router/auth');
// const productRoutes = require('./router/product');
// const categoryRoutes = require('./router/category');




// // CONNECT DATABASE
// mongoose.connect(process.env.DATABASE, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
//   .then(() => console.log('DB connected'))
//   .catch((err) => console.log(err));

// // MIDDLEWARE
// app.use(morgan('dev'));
// app.use(bodyParser.json({ limit: '100mb' }));
// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//   limit: '100mb',
//   extended: true
// }));
// app.use(cookieParser());
// app.use(cors());


// // ROUTES MIDDLEWARE
// app.use("/api", authRoutes)
// app.use("/api", productRoutes)
// app.use("/api", categoryRoutes)



// //ERROR MIDDLEWARE
// app.use(errorHandler);

// const port = process.env.PORT || 8000;


// app.listen(port, () => {
//   console.log(`App is running on port ${port}`);
// })