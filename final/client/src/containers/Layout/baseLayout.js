import React, {Fragment} from "react"
import { Layout } from "antd"
import {connect} from 'react-redux';

import Footer from "../../components/footer/footer"

const layout = props => (
  <Fragment>
    <Layout id={props.id}>{props.children}</Layout>
    <Footer text={'@' + props.site.footer} email={props.site.email}/>
  </Fragment>
)

const mapStateToProps = state => ({site: state.app});

export default connect(mapStateToProps)(layout)



