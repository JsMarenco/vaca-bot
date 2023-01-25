import { FormEvent, useState } from "react"
import { Box, IconButton, InputBase, Skeleton, Typography, Tooltip } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import { response_card_image_container, input, input_container, input_icon, response_card_container, textColor, response_card_about_container, flex } from "./styles"
import { QuestionForm } from "./constants"
import axios from "axios"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cowImage = require("../assets/cow.jpg")
import Image from "next/image"
import ContentCopyIcon from "@mui/icons-material/ContentCopy"
import { copyToClipboard } from "./utils/basic"
import { INITIAL_MESSAGE } from "./constants/messages"

export default function Form() {
  const [loading, setLoading] = useState(false)
  const [answere, setAnswere] = useState(INITIAL_MESSAGE)
  const [questionInfo, setQuestionInfo] = useState({
    [QuestionForm.question_input_name]: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setQuestionInfo({ ...questionInfo, [e.target.name]: e.target.value, })
  }

  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault()

    const questionBody = { question: questionInfo[QuestionForm.question_input_name] }

    const { data } = await axios.post("/api/ask", questionBody)
    setAnswere(data)

    setQuestionInfo({ [QuestionForm.question_input_name]: "", })
    setLoading(false)
  }

  const handleCopy = () => {
    copyToClipboard(answere)
  }

  return (
    <>
      <Box sx={response_card_container}>
        <Box sx={response_card_about_container}>
          <Box sx={{ ...flex, justifyContent: "initial" }}>
            <Box sx={response_card_image_container}>
              <Image src={cowImage} alt={"A cow"} style={{ width: "100%", height: "100%" }} />
            </Box>

            <Typography variant="body1" color={textColor}>Vaca bot</Typography>
          </Box>

          <Tooltip title="Copy text" arrow placement="left" >
            <IconButton
              sx={textColor}
              onClick={handleCopy}
              disabled={answere === INITIAL_MESSAGE}
            >
              <ContentCopyIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {
          loading ? (
            <Box>
              <Skeleton animation="pulse" height={35} />
              <Skeleton animation="pulse" height={35} />
              <Skeleton animation="pulse" height={35} />
            </Box>
          ) : (
            <Typography variant="h6" color={textColor}>
              {answere}
            </Typography>
          )
        }



      </Box>

      <Box flexGrow={1} sx={input_container} component="form" onSubmit={(e) => handleSubmit(e)} >
        <InputBase
          disabled={loading}
          id={QuestionForm.question_input_id}
          role={QuestionForm.question_input_role}
          name={QuestionForm.question_input_name}
          type={QuestionForm.question_input_type}
          value={questionInfo[QuestionForm.question_input_name]}
          onChange={(e) => handleChange(e)}
          autoComplete={QuestionForm.autocomplete_inputs}
          placeholder={QuestionForm.question_input_placeholder}
          size={QuestionForm.input_size}
          endAdornment={
            <IconButton sx={input_icon} onClick={handleSubmit} size={QuestionForm.button_size}>
              <SendIcon />
            </IconButton>
          }
          sx={input}
          fullWidth
        />
      </Box>
    </>
  )
}
