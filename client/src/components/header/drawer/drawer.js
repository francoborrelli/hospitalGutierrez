import React from "react"

const style = {
  backgroundColor: "rgba(0, 0, 0, 0.50)",
  width: "100%",
  height: "100%",
  position: "fixed",
  zIndex: 1
}

const drawer = props => <div onClick={props.clicked} style={style} />

export default drawer
