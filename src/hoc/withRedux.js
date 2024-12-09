import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

/**
 * Dynamic mapStateToProps for multiple keys
 * @param {string[]} stateKeys - Keys in the Redux state to map
 * @returns {Function} - mapStateToProps function
 */
const createMapStateToProps = (stateKeys) => (state) => {
  return stateKeys.reduce((props, key) => {
    props[key] = state[key];
    return props;
  }, {});
};

/**
 * Dynamic mapDispatchToProps
 * @param {Object} actions - Actions to bind
 * @returns {Function} - mapDispatchToProps function
 */
const createMapDispatchToProps = (actions) => (dispatch) =>
  bindActionCreators(actions, dispatch);

/**
 * Higher-Order Component for dynamic Redux connection
 * @param {string[]} stateKeys - Keys in the Redux state to map
 * @param {Object} actions - Actions to bind
 * @returns {Function} - HOC to connect the component
 */
const withRedux = (stateKeys, actions) => (Component) => {
  const mapStateToProps = createMapStateToProps(stateKeys);
  const mapDispatchToProps = createMapDispatchToProps(actions);
  const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(Component);
  return (props) => <ConnectedComponent {...props} />;
};

export default withRedux;

// Example:- export default withRedux(['user', 'another store'], LoginActions)(LoginComponent);
