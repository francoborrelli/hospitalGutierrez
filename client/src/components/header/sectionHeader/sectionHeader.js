import React from "react"
import { Layout } from "antd"

const { Header, Content } = Layout

const sectionHeader = props =>
      <Content>
        <Header style={{ padding: "17px", paddingLeft: "25px" }}>
          <h1>{props.title}</h1>
        </Header>
          {props.children}
      </Content>

export default sectionHeader
