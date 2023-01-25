export const textColor = {
  color: "rgba(237, 237, 237, .8)",
}

export const flex = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}

export const input = {
  ...textColor,
  p: 2,
  borderRadius: "15px",
  bgcolor: "#1B1D28",
  maxWidth: "1000px",
  width: {
    xs: "100%",
    sm: "90%"
  },
}

export const input_icon = {
  ...textColor,
  ml: 1.5,
  cursor: "pointer",
  p: 1
}

export const input_container = {
  maxWidth: "1200px",
  mx: "auto",
  bgcolor: "#222533",
  p: 2,
  borderRadius: "10px",
  ...flex,
}

export const response_card_image_container = {
  width: 50,
  height: 50,
  borderRadius: "30px",
  overflow: "hidden",
  mr: 2
}

export const response_card_container = {
  ...input_container,
  display: "block",
  maxWidth: "700px",
  mx: "auto",
  mb: 1
}

export const response_card_about_container = {
  ...flex,
  justifyContent: "space-between",
  mb: 1
}

