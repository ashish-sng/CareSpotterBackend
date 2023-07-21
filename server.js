const app = require("./index");
const mongoose = require("mongoose");

app.listen(3000, () => {
    mongoose
      .connect(
        "mongodb+srv://admin:admin123@cluster0.17nprpg.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to MongoDB");
        console.log("Server is running on port 3000");
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB", err);
      });


  
});
