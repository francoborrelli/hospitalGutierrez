import React from "react"

import { InputNumber } from "antd"
import Card from "../../../components/card/card"

const mantainment = props => (
  <Card title="Elementos por página">
    <div style={{ textAlign: "center" }}>
      <InputNumber
        min={1}
        max={10}
        style={{ width: "100%", textAlign: "center" }}
        formatter={value => `${Math.round(value)}`}
        defaultValue={3}
      />
    </div>
  </Card>
)

export default mantainment
