import React from 'react';
import LoginForm from './LoginForm'
import { Card } from 'antd';

const styles = {
  width: 350,
  margin: "100px auto 40px"
}

const login = (props) => {
    return (
        <div className="container loginPage">
            <Card title="Iniciar Sesión" style={styles}>
                <LoginForm/>
            </Card>
        </div>);
}

export default login;
