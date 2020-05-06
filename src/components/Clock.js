import React, {useEffect, useState} from 'react';
import moment from 'moment';
import { View } from 'react-game-map';
import Typography from './Typography';

const FORMAT = 'HH:mm:ss';

const Clock = () => {
  const [date, setDate] = useState(Date.now());

  useEffect(() => {
    setInterval(() => setDate(Date.now()), 1000);
  });

  return (
    <View>
      <Typography>{moment(date).format(FORMAT)}</Typography>
    </View>
  );
}

export default Clock;