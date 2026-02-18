import "./src/config.js";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

//calls
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
