import React from "react"

const drawer = props => (
  <div className={props.className} onClick={props.clicked} style={props.style}>
    {props.children}
  </div>
)

export default drawer
