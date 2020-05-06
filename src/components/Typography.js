import React from 'react';

const components = {
  default: 'span',
  secondary: 'span',
  bold: 'span',
  h1: 'h1',
};

const styles = {
  default: {
    fontSize: 16,
    fontFamily: 'Heebo',
  },
  secondary:{
    fontSize: 14,
    fontWieght: 300,
    fontFamily: 'Heebo',
    opacity: 0.65,
  },
  bold:{
    fontSize: 16,
    fontWeight: 700,
    fontFamily: 'Heebo',
    opacity: 0.8,
  },
  h1: {
    margin: 0,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: 'Heebo',
    opacity: 0.8,
  }
}

const Typography = ({ children, component = 'default', style = {}}) => {
  const Component = components[component];
  return (
    <Component style={{...styles[component], ...style}}>{children}</Component>
  );
}
export default Typography;