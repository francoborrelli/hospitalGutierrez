import React from "react"
import {Layout, Button, Icon, Tooltip} from "antd"
import {withRouter} from 'react-router-dom';
const {Header, Content} = Layout

const sectionHeader = props => {
  const backButton = props.goBackTo
    ? <div
        style={{
        position: "absolute",
        top: 60,
        right: 20
      }}>
        <Tooltip placement="right" title="Volver">
          <Button onClick={() => props.history.push(props.goBackTo)}><Icon type="rollback"/></Button>
        </Tooltip>
      </div>
    : null
    console.log(props)
  return (
    <Content>
      <Header style={{
        height: "auto"
      }}>
        <h1
          style={{
          paddingTop: 18,
          paddingLeft: 16,
          marginBottom: 10
        }}>{props.title}</h1>
        {backButton}
      </Header>
      {props.children}
    </Content>
  )
}

export default withRouter(sectionHeader)
