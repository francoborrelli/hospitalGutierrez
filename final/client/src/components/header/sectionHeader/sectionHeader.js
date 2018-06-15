import React from 'react';
import { Layout, Button, Icon, Tooltip } from 'antd';
import { withRouter } from 'react-router-dom';
const { Header, Content } = Layout;

const sectionHeader = props => {
  const backButton = props.goBackTo ? (
    <div style={{ display: 'inline-block', float: 'right', paddingRight: 12 }}>
      <Tooltip placement="right" title="Volver">
        <Button onClick={() => props.history.push(props.goBackTo)}>
          <Icon type="rollback" />
        </Button>
      </Tooltip>
    </div>
  ) : null;

  return (
    <Content>
      <Header style={{ height: '65px' }}>
        {backButton}
        <h1
          style={{
            display: 'inline-block',
            paddingTop: 18,
            paddingLeft: 20,
            marginBottom: 10
          }}
        >
          {props.title}
        </h1>
      </Header>
      {props.children}
    </Content>
  );
};

export default withRouter(sectionHeader);
