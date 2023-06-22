const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

dbPass = process.env.DB_PASS;
dbUser = process.env.DB_USERNAME;

mongoose.connect(`mongodb+srv://${ dbUser }:${ dbPass }@cluster0.vrb5a.mongodb.net/Onserv?retryWrites=true&w=majority`, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>{
    console.log("connected");
}).catch((e)=>{
    console.log(e);
})


