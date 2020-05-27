import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actionCreators from '../store/actions/scoreActions'

const WithScore = WrappedComponent => {
  class HocComp extends Component {
    render() {
      return <WrappedComponent {...this.props} />
    }
  }

  const mapStateToProps = ({ score }) => ({ ...score })

  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actionCreators, dispatch)
  })

  return connect(mapStateToProps, mapDispatchToProps)(HocComp)
}

export default WithScore