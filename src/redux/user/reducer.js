import {
  UPDATE_USER,
  SET_SELECTED_VILLAGE,
} from './actions';

const initialState = {
  resources: {},
  socketId: null,
  username: null,
  villages: [],
  villageStore: {},
  selectedVillage: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(state);
  switch (type) {
    case UPDATE_USER:
      return {
        ...state,
        ...payload,
        villageStore: payload.villages.reduce((acc, next) => ({ ...acc, [next.id]: next }), {}),
        ...(!state.selectedVillage && { selectedVillage: payload.villages[0].id }),
      };
    case SET_SELECTED_VILLAGE:
      return {
        ...state,
         selectedVillage: payload.id,
      };
    default:
      return state
  }
}

export default reducer;