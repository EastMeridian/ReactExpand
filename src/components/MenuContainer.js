import React from 'react';
import {
  View,
} from 'react-game-map';

const containerStyle = {
  paddingTop: '1rem',
  paddingBottom: '1rem',
  backgroundColor: '#efeff1',
  height: '100%',
};

const MenuContainer = ({ children }) => (
  <View style={containerStyle}>{children}</View>
);

export default MenuContainer;