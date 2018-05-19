import React from "react"
import { Switch, Icon, Card } from "antd"

const mantainment = props => (
  <Card title="Mantenimiento">
    <div style={{ textAlign: "center", padding: "8px 0px" }}>
      <Switch
        loading={props.loading}
        onChange={props.clicked}
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked
      />
    </div>
  </Card>
)

export default mantainment
