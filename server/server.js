import express from "express";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import axios from "axios";
import cors from "cors";

const app = express();
const corsConfig = {
  origin: ["http://localhost:5173"],
};

app.use(cors(corsConfig));

const PORT = 8080;

app.get("/api", (req, res) => {
  res.json({ message: "Hello, World!" });
});

app.get("/api/current-motogp-standings", async (req, res) => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const currentStandingsUrl =
      "https://www.motogp.com/en/world-standing/2024/motogp/championship-standings";
    await page.goto(currentStandingsUrl, {
      waitUntil: "networkidle0",
    });

    const currentStandingsTable = await page.$eval(
      ".standings-table__table ",
      (el) => el.outerHTML
    );

    const $ = cheerio.load(currentStandingsTable);
    let standings = [];

    $(".standings-table__body-row").each((index, element) => {
      const position = parseInt(
        $(element).find(".standings-table__body-cell--pos").text().trim()
      );
      const riderName = $(element)
        .find(".standings-table__rider-name")
        .first()
        .text()
        .replace(/[0-9]/g, "");

      const picture = $(element)
        .find(".rider-image-container .rider-image picture img")
        .attr("src");

      const riderNumber = $(element)
        .find(".standings-table__body-cell .standings-table__body-cell--number")
        .first()
        .text();
      const team = $(element)
        .find(".standings-table__body-cell--team")
        .first()
        .text();
      const points = parseInt(
        $(element).find(".standings-table__body-cell--points").text().trim()
      );

      standings.push({
        position,
        riderName,
        riderNumber,
        picture,
        team,
        points,
      });
    });

    res.json({ standings });
  } catch (error) {
    res.status(500).send("Error scraping data");
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
