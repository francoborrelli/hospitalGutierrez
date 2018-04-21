import React, { Component } from "react"
import { DatePicker } from "antd"

import moment from "moment"

moment.locale("es", {
  months: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
    "_"
  ),
  monthsShort: "Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre".split(
    "_"
  ),
  weekdays: "Domingo_Lunes_Martes_Miercoles_Jueves_Viernes_Sabado".split("_"),
  weekdaysShort: "Dom._Lun._Mar._Mier._Jue._Vier._Sab.".split("_"),
  weekdaysMin: "Do_Lu_Ma_Mi_Ju_Vi_Sa".split("_")
})

const locale = {
  lang: {
    placeholder: "Seleccionar fecha",
    rangePlaceholder: ["Fecha inicial", "Fecha final"],
    today: "Hoy",
    now: "Ahora",
    backToToday: "Volver a hoy",
    ok: "Aceptar",
    clear: "Limpiar",
    month: "Mes",
    year: "Año",
    timeSelect: "Seleccionar hora",
    dateSelect: "Seleccionar fecha",
    monthSelect: "Elegir un mes",
    yearSelect: "Elegir un año",
    decadeSelect: "Elegir una década",
    yearFormat: "YYYY",
    dateFormat: "D/M/YYYY",
    dayFormat: "D",
    dateTimeFormat: "D/M/YYYY HH:mm:ss",
    monthBeforeYear: true,
    previousMonth: "Mes anterior (PageUp)",
    nextMonth: "Mes siguiente (PageDown)",
    previousYear: "Año anterior (Control + left)",
    nextYear: "Año siguiente (Control + right)",
    previousDecade: "Década anterior",
    nextDecade: "Década siguiente",
    previousCentury: "Siglo anterior",
    nextCentury: "Siglo siguiente"
  }
}

class CustomDatePicker extends Component {
  render() {
    return (
      <DatePicker showToday={false} disabledDate={date => date > moment()} {...this.props} locale={locale} style={{ width: "100%" }} />
    )
  }
}

export default CustomDatePicker
