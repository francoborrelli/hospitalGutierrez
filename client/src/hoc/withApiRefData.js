import React, { Component } from 'react';

import axios from '../axios-apiReferences';

const withApiRefData = () => {
  return function(WrappedComponent) {
    class PatientReferenceData extends Component {
      state = {
        apiData: {}
      };

      componentDidMount() {
        axios
          .all([
            axios.get('/tipo-documento'),
            axios.get('/obra-social'),
            axios.get('/tipo-vivienda'),
            axios.get('/tipo-agua'),
            axios.get('/tipo-calefaccion')
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
                });
              }
            )
          )
          .catch();
      }

      render() {
        return (
          <WrappedComponent {...this.props} apiData={this.state.apiData} />
        );
      }
    }
    return PatientReferenceData;
  };
};

export default withApiRefData;
