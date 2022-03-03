const express = require("express");

const app = express();

app.get("/", (req, res) => res.send("API Running"));

const PORT = process.env.PORT || 8000; //PORT will be defined in process.env on heroku when deployed
app.listen(PORT, () => console.log(`Server started on ${PORT}`));
