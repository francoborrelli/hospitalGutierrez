import React from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'

const menu = props =>
    <Menu mode="horizontal" style={{lineHeight: "64px", position: "fixed", right: 0, top: -2}}>
        <Menu.Item key="1">
            <Link to="/logout">
                <Icon type="logout" />
            </Link>
        </Menu.Item>
    </Menu>

export default menu;
