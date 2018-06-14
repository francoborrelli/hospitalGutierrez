import React from "react"
import Form from "../components/form"
import hasPermission from '../../../../hoc/hasPermission';

const editRecordPage = props => <Form {...props}/>

export default hasPermission(editRecordPage, ['control_update'])
