import React from "react"
import { Row, Col } from "antd"
import Item from "./components/footerItem"

const footer = props => (
  <footer>
    <div className="container">
      <Row>
        <Col xs={12}>
          <p>
            {props.text}
          </p>
        </Col>
        <Col xs={11}>
          <ul className="socials">
            <Item title={props.email} icon="envelope" />
            <Item title="Diagonal 114 99, La Plata" icon="map-marker" />
            <Item title="(0221) 483-0171" icon="phone" />
          </ul>
        </Col>
      </Row>
    </div>
  </footer>
)

export default footer
