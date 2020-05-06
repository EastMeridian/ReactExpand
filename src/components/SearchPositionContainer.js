import React, { useState } from 'react';
import {
  View,
} from 'react-game-map';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

const containerStyle = {
  position: 'relative',
};

const LayoutStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  position: 'absolute',
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  borderRadius: 4,
  color: 'white',
  padding: '0.5em',
  fontSize: 12,
};

const textFieldStyle = {
  width: '3em',
  color: 'black',
  backgroundColor: 'white',
  marginLeft: '0.5em',
  marginRight: '1em',
  borderRadius: 4,
  paddingLeft: 4,
  fontSize: 10,
  fontFamily: 'Heebo',
};

const isNumber = (string) => string.match(/^[0-9]+$/) !== null;

const SearchPositionContainer = ({
  initialePosition,
  onSearchPosition,
  children,
}) => {
  const [xValue, setXValue] = useState(initialePosition.x);
  const [yValue, setYValue] = useState(initialePosition.y);

  const onChangeX = (e) => {
    const { value } = e.target;
    if(value === '') setXValue('');
    if (isNumber(value)) setXValue(value)
  };

  const onChangeY = (e) => {
    const { value } = e.target;
    if(value === '') setYValue('');
    if (isNumber(value)) setYValue(value)
  };

  return (
    <View style={containerStyle}>
      {children}
      <View style={LayoutStyle}>
        X:
        <InputBase
          placeholder="x"
          style={textFieldStyle}
          value={xValue}
          onChange={onChangeX}
        />
        Y:
        <InputBase
          placeholder="y"
          style={textFieldStyle}
          value={yValue}
          onChange={onChangeY}
        />
        <Button
          onClick={() => onSearchPosition({ x: xValue, y: yValue })}
          variant="contained"
          size="small"
        >
          OK
        </Button>
      </View>
    </View>
  );
}

export default SearchPositionContainer;
