import React from 'react';
import { View } from 'react-game-map';
import Typography from './Typography';

const imageStyle = {
  width: '16px',
  height: '16',
  marginRight: '0.6rem'
};

const containerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const Icon = ({ src, children }) => (
  <View style={containerStyle}>
    <Typography style={{marginRight: '0.3rem'}}>
      {children}
    </Typography>
    <img src={src} alt="icon" style={imageStyle} />
  </View>
);

export default Icon;