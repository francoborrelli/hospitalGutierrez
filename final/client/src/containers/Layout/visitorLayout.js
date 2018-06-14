import React from "react"
import { Layout } from "antd"
import BaseLayout from "./baseLayout"
import VisitorNavbar from "../../components/header/visitorNavbar/visitorNavbar"

const { Content } = Layout

const layout = props => (
  <BaseLayout>
    <Layout>
      <div className={props.className}>
        <VisitorNavbar />
        <Content className="card">{props.children}</Content>
      </div>
    </Layout>
  </BaseLayout>
)

export default layout
