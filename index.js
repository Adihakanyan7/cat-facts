import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const URL_API = "https://cat-fact.herokuapp.com";

app.use(express.static("public"));


app.get("/", async (req, res) => {
    res.render("index.ejs");
});

app.get("/get-fact", async (req, res) => {
    try {
        const result = await axios.get(URL_API + "/facts/random?animal_type=cat&amount=1");
        console.log(result.data); // Log the API response
        res.render("index.ejs", { fact: result.data.text });
    } catch (error) {
        console.error(`Getting error: ${error.message}`);
        res.status(500).send('Server error');
    }
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})