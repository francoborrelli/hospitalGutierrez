import React from "react"
import { Switch, Icon, Card } from "antd"

const mantainment = props => (
  <Card title="Mantenimiento">
    <div style={{ textAlign: "center", padding: "5px 0px" }}>
      <Switch
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked
      />
    </div>
  </Card>
)

export default mantainment
