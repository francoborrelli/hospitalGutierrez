import React from 'react';
import { Layout } from 'antd';
import Footer from '../../components/footer/footer';

const layout = (props) =>
    <React.Fragment>
        <Layout id={props.id}>
            {props.children}
        </Layout>
        <Footer/>
    </React.Fragment>

export default layout;
