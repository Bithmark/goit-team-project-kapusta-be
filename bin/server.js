const mongoose = require('mongoose')
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, "../.env") })

const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful');
    // app.listen(PORT);
    app.listen(PORT, () => console.log(`http://localhost:3000/api/users/google`));
  })

  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });
