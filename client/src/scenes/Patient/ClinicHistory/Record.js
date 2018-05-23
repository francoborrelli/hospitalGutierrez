import React, {Component} from "react"
import { Route, Switch } from "react-router-dom"

class PatientPage extends Component {
  state = {
    loading: true,

    //Mock data
    patient: {
      name: "Franco",
      lastname: "Borrelli",
      documentType: "DNI",
      documentNumber: "39831178",
      age: "5 meses",
      visits: "53",
      birthday: "27/08/1996",
      gender: "Másculino",
      adress: "11 1419, La Plata, Buenos Aires",
      houseType: "Choza",
      waterType: "Pozo",
      heatType: "Estufa"
    }
  }

  componentDidMount = () => {
  }

  render() {
    return (
        <Switch>
        </Switch>
    )
  }
}

export default PatientPage
