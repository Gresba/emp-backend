import db from "../db/connection.js";
import Picture from "../models/picture.js";
import fetch from "node-fetch";

const apiUrl = "https://api.artic.edu/api/v1/artworks"

const seedDb = async () => {
  await db.dropDatabase();

  const response = await fetch(apiUrl);
  const pictures = await response.json();

  const pictureData = [];

  pictures.data.forEach(picture => {
    pictureData.push({
      Artist: picture.artist_title,
      Title: picture.title,
      ImageId: picture.image_id,
      Year: picture.date_start,
      Tags: picture.term_titles,
      Comments: []
    })
  })

  await Picture.insertMany(pictureData);

  db.close();
}

seedDb();
