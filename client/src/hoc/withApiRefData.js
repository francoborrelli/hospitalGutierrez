import React, {Component} from 'react';
import axios from '../axios-apiReferences';

const withApiRefData = () => {
  return function (WrappedComponent) {
    class PatientReferenceData extends Component {
      state = {
        apiData: {}
      };

      componentDidMount() {
        Promise.all([
          axios.get('/tipo-documento'),
          axios.get('/obra-social'),
          axios.get('/tipo-vivienda'),
          axios.get('/tipo-agua'),
          axios.get('/tipo-calefaccion')
        ]).then((results) => {
          this.setState({
            apiData: {
              documentTypes: results[0].data,
              insurances: results[1].data,
              houseTypes: results[2].data,
              waterTypes: results[3].data,
              heatingTypes: results[4].data
            }
          })
        }).catch()
      }

      render() {
        return (<WrappedComponent {...this.props} apiData={this.state.apiData}/>);
      }
    }
    return PatientReferenceData;
  };
};

export default withApiRefData;
