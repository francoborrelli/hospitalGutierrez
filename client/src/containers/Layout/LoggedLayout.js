import { Layout } from "antd"
import React, { Component } from "react"
import BaseLayout from "./baseLayout"

import Sider from "../../components/header/sider/Sider"
import Navbar from "../../components/header/loggedNavbar/loggedNavbar"
import Drawer from "../../components/header/drawer/drawer"

class LoggedLayout extends Component {
  state = {
    collapsed: true,
    responsive: window.innerWidth < 576
  }

  handleResize = e => {
    const result = window.innerWidth < 576
    if (result !== this.state.responsive) {
      this.setState({ responsive: result, collapsed: true })
    }
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.handleResize)
  }

  componentWillUnmount = () => {
    window.addEventListener("resize", this.handleResize)
  }

  toggleHandler = () => {
    this.setState(prevState => ({
      collapsed: !prevState.collapsed
    }))
  }

  render() {
    const drawer =
      this.state.responsive && !this.state.collapsed ? (
        {clicked: this.toggleHandler, className:"full-overlay" }
      ) : {}

    return (
      <BaseLayout id="navbar">
        <Sider
          responsive={this.state.responsive}
          clicked={this.toggleHandler}
          collapsed={this.state.collapsed}
        />
        <Layout>
          <Navbar
            responsive={this.state.responsive}
            clicked={this.toggleHandler}
            collapsed={this.state.collapsed}
          />

          <Drawer {...drawer}>{this.props.children}</Drawer>
        </Layout>
      </BaseLayout>
    )
  }
}

export default LoggedLayout
