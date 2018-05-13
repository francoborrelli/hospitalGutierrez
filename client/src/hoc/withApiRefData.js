import React, { Component } from "react"

import axios from "axios"
import { path } from "../axios-apiReferences"

const withApiRefData = () => {
  return function(WrappedComponent) {
    class PatientReferenceData extends Component {
      state = {
        apiData: {}
      }

      componentDidMount() {
        axios
          .all([
            axios.get(path + "tipo-documento"),
            axios.get(path + "obra-social"),
            axios.get(path + "tipo-vivienda"),
            axios.get(path + "tipo-agua"),
            axios.get(path + "tipo-calefaccion")
          ])
          .then(
            axios.spread(
              (
                documentTypes,
                insurance,
                houseTypes,
                waterTypes,
                heatingTypes
              ) => {
                this.setState({
                  apiData: {
                    documentTypes: documentTypes.data,
                    insurances: insurance.data,
                    houseTypes: houseTypes.data,
                    waterTypes: waterTypes.data,
                    heatingTypes: heatingTypes.data
                  }
                })
              }
            )
          )
          .catch()
      }

      render() {
        return <WrappedComponent {...this.props} apiData={this.state.apiData} />
      }
    }
    return PatientReferenceData
  }
}

export default withApiRefData
