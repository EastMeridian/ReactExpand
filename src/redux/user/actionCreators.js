import { UPDATE_USER, SET_SELECTED_VILLAGE } from './actions';

export const updateUser = (user) => ({ type: UPDATE_USER, payload: user });
export const setSelectedVillage = (village) => ({ type: SET_SELECTED_VILLAGE, payload: village });