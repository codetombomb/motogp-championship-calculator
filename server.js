import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5001;

app.get("/api/motogp-standings", async (req, res) => {
  try {
    const url =
      "https://www.motogp.com/en/world-standing/2024/motogp/championship-standings";
    const { data } = await axios.get(url);
    console.log(data);
  } catch (error) {
    res.status(500).send("Error scraping data");
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
