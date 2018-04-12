import React, {Fragment} from "react"
import { Layout } from "antd"
import Footer from "../../components/footer/footer"

const layout = props => (
  <Fragment>
    <Layout id={props.id}>{props.children}</Layout>
    <Footer text="@"/>
  </Fragment>
)

export default layout
