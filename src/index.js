import app from "./app.js"
import dotenv from "dotenv";

//config dotenv
dotenv.config()
const port = process.env.PORT || 8080;

app.listen(
    port, () => {
        console.log(`http://localhost:${port}/`)
    }
)