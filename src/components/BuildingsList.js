import React from 'react';
import {
  View,
} from 'react-game-map';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Typography from './Typography';
import capitalize from 'lodash/capitalize';
import moment from 'moment';

import { totalIncomes } from '../utils/totalIncomes';

const rowContainerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  width: '20rem',
};

const levelContainerStyle = {
  height: 24,
  width: 24,
  borderRadius: 12,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
};

const LevelIndicator = ({ children }) => (
  <View style={levelContainerStyle}>
    <Typography component='secondary' style={{
      marginBottom: '-1px',
    }}>{children}</Typography>
  </View>
)

const BuildingRow = ({
  name,
  villageProduction,
  cost,
  level,
  onClick = () => { },
}) => {
  console.log('cost', cost);
  return (
    <ButtonBase
      onClick={onClick}
    >
      <View style={rowContainerStyle}>
        <View style={{ alignItems: 'flex-start' }}>
          <Typography component='bold'>{capitalize(name)}</Typography>
          <Typography component="secondary">
            <span role="img" aria-label="time">🕘</span> {moment.unix((cost.production / villageProduction) * 3600).format('HH:mm:ss')}
          </Typography>
        </View>
        <LevelIndicator>{level}</LevelIndicator>
      </View>
    </ButtonBase>
  );}

const horizontalPadding = {
  paddingLeft: '1rem',
  paddingRight: '1rem',
};

const titleStyle = {
  ...horizontalPadding,
  marginBottom: '1rem',
};

const sectionStyle = {
  ...horizontalPadding,
  marginBottom: '1rem',
  marginTop: '1rem',
};

const BuildingsList = ({ 
  buildings = [], 
  buildables = [], 
  village, 
  onClickBuildables = () => { },
  onClickBuilding = () => {}
 }) => {
  console.log('buildables', buildables, buildings);
  const villageProduction = totalIncomes(
    village.flatIncomes.production,
    village.incomesPerPopulation.production,
    village.population,
    village.incomesFactor.production
  );

  return (
    <>
      <View style={{ flex: 1 }}>
        <Typography component='h1' style={titleStyle}>Buildings</Typography>
        {buildings.length === 0 && <Typography style={horizontalPadding} component='secondary'>You don't have any building yet.</Typography>}
        {buildings.map((building, index) => { 
          console.log(building)
          return (
          <BuildingRow
            key={index}
            onClick={() => onClickBuilding(building)}
            {...building}
            villageProduction={villageProduction}
          />
        )})
      }
        <Typography component='h1' style={sectionStyle}>Available Buildings</Typography>
        {buildables.map((building, index) => { 
          console.log(building)
          return (
          <BuildingRow
            key={index}
            onClick={() => onClickBuildables(building)}
            {...building}
            villageProduction={villageProduction}
          />
        )})
        }
      </View>
      <View style={{ height: '14em' }}>
        <Divider />
        <Typography component='h1' style={sectionStyle}>In construction</Typography>
      </View>
    </>
  )
}

export default BuildingsList;