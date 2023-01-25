import type { NextApiRequest, NextApiResponse } from "next"
import { Configuration, OpenAIApi } from "openai"
import { API_KEY_NOT_FOUND_ERROR, INVALID_QUESTION_ERROR } from "../constants/messages"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default async function Ask(req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    return res.status(500).json({ message: API_KEY_NOT_FOUND_ERROR })
  }

  // GETTING THE QUESTION 
  const { question = "" } = req.body

  if (!question) {
    return res.status(400).json({
      message: INVALID_QUESTION_ERROR
    })
  }

  const response = await openai.createCompletion({
    prompt: question,
    model: "text-davinci-003",
    max_tokens: 3000,
    // stop: ["\n"]
  })

  const answere = response.data.choices[0].text


  console.log("🚀 ~ file: ask.ts:35 ~ Ask ~ answere", answere)

  res.status(200).json(answere)
}