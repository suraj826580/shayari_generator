const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.use(cors());
app.use(express.json());

const { Configuration, OpenAIApi } = require("openai");

const config = new Configuration({
  apiKey: process.env.API_KEY,
});

const openai = new OpenAIApi(config);

app.post("/shayari", async (req, res) => {
  const message = req.body.message;
  try {
    await PromptFun(message, res);
  } catch (error) {
    res.status(400).send({ message: "error" });
  }
});

async function PromptFun(message, res) {
  try {
    const prompt = `Create funny shayari in hindi on the topic of ${message} within 100 words`;
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 500,
    });
    res.status(200).send(completion.data.choices[0].text);
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "error" });
  }
}

app.get("/", async (req, res) => {
  try {
    res.status(200).send({ msg: "Res of Api" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

app.listen(process.env.PORT, async () => {
  console.log("Server is Running");
});
