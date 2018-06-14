import React from "react"
import { Steps, Divider } from "antd"

const Step = Steps.Step

const steps = props => (
  <div style={{ padding: "20px 0px 20px 0px"}}>
    <Steps current={props.current} style={{margin: "0 auto"}}>
      {props.steps.map(item => (
        <Step key={item.title} title={item.title} icon={item.icon} />
      ))}
    </Steps>
    <Divider/>
    <div className="steps-content" style={{ margin: "0 auto" }}>
      <div style={{ padding: "0px 0px 0px 0px" }}>
        {props.steps[props.current].content}
      </div>
    </div>
  </div>
)

export default steps
