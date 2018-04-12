import { Layout } from "antd"
import React, { Component } from "react"
import BaseLayout from "./baseLayout"

import Sider from "../../components/header/sider/sider2"
import Navbar from "../../components/header/loggedNavbar/loggedNavbar"

class LoggedLayout extends Component {
  state = {
    collapsed: false
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  render() {
    return (
      <BaseLayout id="navbar">
        <Sider collapsed={this.state.collapsed} />
        <Layout>
          <Navbar clicked={this.toggle} collapsed={this.state.collapsed} />
          {this.props.children}
        </Layout>
      </BaseLayout>
    )
  }
}

export default LoggedLayout
