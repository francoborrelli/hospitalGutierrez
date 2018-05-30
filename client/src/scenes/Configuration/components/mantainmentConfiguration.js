import React from "react"
import { Switch, Icon, Card } from "antd"

const mantainment = props => (
  <Card title="Sitio Activo" >
    <div style={{ textAlign: "center", padding: "11px 0px" }}>
      <Switch
        loading={props.loading}
        onChange={props.clicked}
        checkedChildren={<Icon type="check" />}
        unCheckedChildren={<Icon type="cross" />}
        defaultChecked={props.value}
      />
    </div>
  </Card>
)

export default mantainment
