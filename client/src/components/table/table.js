import React from "react"
import {Table} from "antd"
import {connect} from 'react-redux';

const table = props => <Table
  locale={{emptyText: "No hay resultados"}}
  pagination={{pageSize: props.listAmount}}
  {...props}/>

const mapStateToProps = state => ({listAmount: state.app.listAmount});

export default connect(mapStateToProps)(table)
