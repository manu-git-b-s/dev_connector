import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ auth: { isAuthenticated, loading }, component: Component, ...rest }) => {
  if (isAuthenticated && !loading) return <Component />;

  return <Navigate to="/login" />;
};

PrivateRoutes.propTypes = {
  auth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ auth: state.auth });

export default connect(mapStateToProps)(PrivateRoutes);
