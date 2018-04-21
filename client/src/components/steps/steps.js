import React from "react"
import { Steps } from "antd"

const Step = Steps.Step

const steps = props => (
  <div style={{ padding: "20px 0px 20px 0px"}}>
    <Steps current={props.current}>
      {props.steps.map(item => (
        <Step key={item.title} title={item.title} icon={item.icon} />
      ))}
    </Steps>
    <div className="steps-content" style={{ maxWidth: 600, paddingTop: 10 }}>
      <div style={{ padding: "20px 0px 0px 0px" }}>
        {props.steps[props.current].content}
      </div>
    </div>
  </div>
)

export default steps
