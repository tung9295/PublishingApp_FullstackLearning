import React from 'react';
import Falcor from 'falcor';
import falcorModel from '../falcorModel.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LoginForm } from '../components/LoginForm.js';

const mapStateToProps = (state) => ({
  ...state
});

const mapDispatchToProps = (dispatch) => ({});

class DashboardView extends React.Component {
  render() {
    return (
      <div>
        <h1>Dashboard - loggedin!</h1>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (DashboardView);