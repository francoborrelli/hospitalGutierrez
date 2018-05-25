import React from 'react';

import { connect } from 'react-redux';

const menu = props => (
  <div
    style={{
      lineHeight: '64px',
      position: 'fixed',
      right: 20,
      top: 2,
      color: '#969696'
    }}
  >
    {props.username}
  </div>
);

const mapStateToProps = state => ({
  username: state.auth.user.username
});

export default connect(mapStateToProps)(menu);
