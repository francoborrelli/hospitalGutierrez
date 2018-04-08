import React from "react"
import { Row, Col } from "antd"
import { Icon } from "react-fa"
import { Tooltip } from "antd"

const footer = props => (
  <footer>
    <div className="container">
      <Row>
        <Col xs={12}>
          <p>
            <i className="fa fa-at" /> {props.footer}
          </p>
        </Col>
        <Col xs={11}>
          <ul className="socials">
            <li>
              <Tooltip placement="left" title={props.email}>
                <Icon name="envelope" />
              </Tooltip>
            </li>
            <li>
              <Tooltip placement="left" title="Diagonal 114 99, La Plata">
                <Icon name="map-marker" />
              </Tooltip>
            </li>
            <li>
              <Tooltip placement="left" title="(0221) 483-0171">
                <Icon name="phone" />
              </Tooltip>
            </li>
          </ul>
        </Col>
      </Row>
    </div>
  </footer>
)

export default footer
