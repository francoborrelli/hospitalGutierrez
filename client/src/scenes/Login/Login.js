import React, {Component} from "react";
import LoginForm from "./components/loginForm"
import { Card, message } from "antd";

const styles = {
  width: 350,
  margin: "100px auto 40px"
}

class Login extends Component {
  state = {
    enterLoading: false
  }

  submitHandler = e => {
      this.setState({ enterLoading: true })
      this.props.history.push("/")
      message.success("Sesión iniciada correctamente.", 3)
      this.setState({ enterLoading: false })
    }

  render(){
    return (
      <div className="loginPage">
          <Card title="Iniciar Sesión" style={styles}>
              <LoginForm submitted={this.submitHandler} loading={this.props.enterLoading}/>
          </Card>
      </div>);
  }
}

export default Login;
