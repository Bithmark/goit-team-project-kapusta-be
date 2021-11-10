const mongoose = require('mongoose')
require('dotenv').config()
const app = require('../app')

const { DB_HOST, PORT = 3000 } = process.env

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database connection successful')
    // app.listen(PORT)
    app.listen(process.env.PORT || 3000, () =>
      console.log(`http://localhost:${process.env.PORT}`)
    );
  })
  .catch((error) => {
    console.log(error.message)
    process.exit(1)
  })
