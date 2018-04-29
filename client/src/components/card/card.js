import React from "react"
import { Card } from "antd"

const card = props => (
  <Card style={{ margin: "24px" }} {...props}>
    {props.children}
  </Card>
)

export default card
