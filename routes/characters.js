const express = require("express");
const router = express.Router();
const mockData = require("../mockData");

const API_KEY = 5;
let characters = mockData;

const authorizeApiKey = (req, res, next) => {
  const userAPIKey = parseInt(req.query.apiKey);

  if (!userAPIKey) {
    return res.status(404).send("Key not found")
  }

  if (userAPIKey !== API_KEY) {
    return res.status(403).send("Invalid API key")
  }

  if (userAPIKey === API_KEY) {
    next();
  }
}

router.use((req, res, next) => {
  authorizeApiKey(req, res, next);
})

router.get("/", (req, res) => {
  if (!characters) {
    return res.status(404).json({message: "No characters found"});
  }

  res.json(characters);
})

router.get("/:id", (req, res) => {
   const id = req.params.id;
   const number = parseInt(id);
   const character = characters.find((char) => char.id === number)

   if (!character) {
    return res.json({message: "Cannot find the character"})
   }

   res.json(character);
})

router.post("/", (req, res) => {
    let newId = Math.floor(Math.random() * 100);
    const character = req.body.character;
    
    if (!character) {
      return res.json({message: "Cannot create the character"})
    }

    const newCharacter = {id: newId, ...character}
    newId++;
    characters.push(newCharacter)
})

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const numberId = parseInt(id)
  const newCharacter = req.body.character;
  const charIndex = characters.findIndex((char) => char.id === numberId)
  const updateCharacter = {...characters[charIndex], ...newCharacter}

  characters[charIndex] = updateCharacter

  res.json(newCharacter)
})

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const number = parseInt(id);

  const newArray = characters.filter((char) => char.id !== number)
  characters = newArray;
  res.json({message: `Character with id ${number} has been removed`, newArray}).send(`Character with id ${number} has been removed`);
})

module.exports = router