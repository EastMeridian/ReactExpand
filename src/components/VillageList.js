import React from 'react';
import {
  View,
} from 'react-game-map';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from './Typography';
import Population from './icons/Population';
import Food from './icons/Food';
import Production from './icons/Production';
import Science from './icons/Science';
import Money from './icons/Money';

import { totalIncomes } from '../utils/totalIncomes';

const rowContainerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  width: '22rem',
};

const incomesContainerStyle = {
  flexDirection: 'row',
};

const VillageRow = ({
  name,
  x,
  y,
  selected,
  onClick = () => {},
  flatIncomes,
  incomesPerPopulation,
  population,
  incomesFactor,
}) => {
 
  return (
    <ButtonBase
      onClick={onClick}
    >
      <View style={rowContainerStyle}>
        <View style={{ alignItems: 'flex-start' }}>
          <Typography component='bold'>{name}</Typography>
          <Typography component='secondary'>{`(${x}|${y})`}</Typography>
        </View>
        <View style={incomesContainerStyle}>
            <Population>{population}</Population>
            <Food>{totalIncomes(flatIncomes.food, incomesPerPopulation.food, population, incomesFactor.food)}</Food>
            <Production>{totalIncomes(flatIncomes.production, incomesPerPopulation.production, population, incomesFactor.production)}</Production>
            <Science>{totalIncomes(flatIncomes.science, incomesPerPopulation.science, population, incomesFactor.science)}</Science>
            <Money>{totalIncomes(flatIncomes.money, incomesPerPopulation.money, population, incomesFactor.money)}</Money>
          </View>
      </View>
    </ButtonBase>
  );
}

const titleStyle = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
  marginBottom: '1rem',

};

const VillageList = ({ villages, onClick = () => { } }) => {
  console.log('VillageList', villages);

  return (
    <>
      <Typography component='h1' style={titleStyle}>Villages</Typography>
      {villages.map((village) => (
        <VillageRow
          key={village.id}
          onClick={() => onClick(village)}
          {...village}
        />
      ))}
    </>
  )
}

export default VillageList;