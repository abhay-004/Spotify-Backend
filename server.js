import { configDotenv } from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/db/db.js";

//calls
configDotenv()
connectDB()

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
    
})