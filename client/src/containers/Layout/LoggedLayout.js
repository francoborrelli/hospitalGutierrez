import { Layout } from "antd"
import React, { Component } from "react"
import BaseLayout from "./baseLayout"

import Sider from "../../components/header/sider/Sider"
import Navbar from "../../components/header/loggedNavbar/loggedNavbar"

class LoggedLayout extends Component {
  state = {
    collapsed: true,
    responsive: window.innerWidth < 576
  }

  handleResize = e => {
    this.setState({ responsive: window.innerWidth < 576 })
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount = () => {
    window.addEventListener("resize", this.handleResize)
  }

  toggle = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    return (
      <BaseLayout id="navbar">
        <Sider
          responsive={this.state.responsive}
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Navbar responsive={this.state.responsive} clicked={this.toggle} collapsed={this.state.collapsed} />
          {this.props.children}
        </Layout>
      </BaseLayout>
    )
  }
}

export default LoggedLayout
