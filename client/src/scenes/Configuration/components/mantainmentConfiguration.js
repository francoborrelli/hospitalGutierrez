import React from "react"
import { Switch, Icon } from "antd"
import Card from "../../../components/card/card"

const mantainment = props => (
  <Card title="mantenimiento">
    <div style={{ textAlign: "center" }}>
      <Switch
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked
      />
    </div>
  </Card>
)

export default mantainment
