const app = require("./index");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    mongoose
      .connect(
        process.env.MONGODB_URL,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("Connected to MongoDB");
        console.log(`Server is running on port ${PORT}`);
      })
      .catch((err) => {
        console.log("Error connecting to MongoDB", err);
      });


  
});
