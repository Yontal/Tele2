import {IS_AUTHENTICATED, IS_REGISTRATED} from '../../store/actions';

const ApplicationStateReducer = (state, _action) => {
  switch (_action.type) {
    case IS_AUTHENTICATED:
      log(_action.type, state, _action.payload);
      return {
        ...state,
        isAuthenticated: _action.payload,
      };
    case IS_REGISTRATED:
      log(_action.type, state, _action.payload);
      return {
        ...state,
        isRegistred: _action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

const log = (type, state, payload) => {
  console.log(`AUTH_REDUCER type:[${type}]`, state, payload);
};

export default ApplicationStateReducer;
