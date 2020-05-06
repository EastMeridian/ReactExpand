import { createSelector } from 'reselect';

export const getSelectedVillage = (state) =>({ village: state.villageStore[state.selectedVillage] });
export const getVillages = ({ villages }) => ({ villages });
export const getUserProfile = ({ resources, username }) => ({ resources, username });