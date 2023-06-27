const express = require(`express`);
const mongoose = require(`mongoose`);

const MongoDB_URL = `mongodb://127.0.0.1:27017/apiAssignment`;
const APIROUTES = require(`./Routers/apiRoutes`);

const cors = require('cors');

const PORT = 3060;
const APP = express();

APP.use(cors());

APP.use(express.json());
APP.use(express.urlencoded({extended : false}));

APP.use(`/`, APIROUTES);

mongoose.connect(MongoDB_URL)
.then(() => { APP.listen(PORT, () => { console.log(`The API for Zomato clone is running on Port No.`,PORT); })
}).catch((Error) => { console.log(Error `in the App`) });
