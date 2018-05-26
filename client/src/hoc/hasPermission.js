import React from "react"
import Error from '../scenes/Errors/403';

const arrayContainsArray = function (superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return (superset.indexOf(value) >= 0);
  });
}

const hasPermission = (WrappedObject, requiredPermissions) => {
  return props => {
    const permissions = props.user.permissions
    return arrayContainsArray(permissions, requiredPermissions)
      ? <WrappedObject {...props}/>
      : <Error/>
  }
}

const mapStateToProps = state => ({permissions: state.auth.user.permissions});

export default hasPermission;
