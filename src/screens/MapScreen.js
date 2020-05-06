import React, { memo } from 'react';
import {
  View,
  Map,
  assets,
} from 'react-game-map';
import Clock from '../components/Clock';
import SearchPositionContainer from '../components/SearchPositionContainer';
import MenuContainer from '../components/MenuContainer';
import VillageList from '../components/VillageList';
import BuildingsList from '../components/BuildingsList';
import Typography from '../components/Typography';
import withSocket from '../socket/withSocket';
import Population from '../components/icons/Population';
import Food from '../components/icons/Food';
import Production from '../components/icons/Production';
import Science from '../components/icons/Science';
import Money from '../components/icons/Money';
import withSelectedVillage from '../decorators/withSelectedVillage';
import withVillages from '../decorators/withVillages';
import withUserProfile from '../decorators/withUserProfile';
import { useDispatch } from 'react-redux';
import { setSelectedVillage } from '../redux/user/actionCreators';

const containerStyle = {
  height: '100vh',
  width: '100vw',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
  overflow: 'hidden',
};

const cardStyle = {
  boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
};

const layoutStyle = {
  ...cardStyle,
  width: '720px',
  height: '720px',
};

const topLayoutStyle = {
  boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  top: 0,
  left: 0,
  right: 0,
  position: 'absolute',
  justifyContent: 'space-between',
  alignItems: 'center',
  flexDirection: 'row',
  height: '4em',
};

const rightLayout = {
  right: 0,
  height: '100%',
  paddingTop: '8em'
};

const leftLayout = {
  left: 0,
  height: '100%',
  paddingTop: '8em'
};

const elementCardStyle = {
  padding: '0.5em',
  width: '20%',
  // border: '1px solid red',
}

const userContainerStyle = {
  flexDirection: 'row',
  alignItems: 'center',
};

const UserProfile = withUserProfile(({ username, resources }) => (
  <View style={userContainerStyle}>
    <Typography component='h1' style={{ marginRight: '1em' }}>{username}</Typography>
    <Money>{resources.money}</Money>
  </View>
));

const VillageProfile = withSelectedVillage(({ village }) => {
  const { food, production, science } = village.resources;
  return (
    <View style={userContainerStyle}>
      <Typography component='h1' style={{ marginRight: '1em' }}>{village.name}</Typography>
      <Population>{Math.floor(village.population)}</Population>
      <Food>{Math.floor(food)}</Food>
      <Production>{Math.floor(production)}</Production>
      <Science>{Math.floor(science)}</Science>
    </View>
  );
});

const centerMap = (renderer, x, y) => {
  renderer.camera.center(x, y);
  renderer.renderMap();
  renderer.requestChunks();
};

let mapRenderer = null;

const HydratedBuildingList = withSelectedVillage(({ village, onClickBuildables, onClickBuilding, ...other }) => (
  <BuildingsList
    buildings={village.buildings}
    buildables={village.buildables}
    village={village}
    onClickBuilding={(building) => { }}
    onClickBuildables={(building) => onClickBuildables(village, building)}
  />
));

const HydratedSearchPositionContainer = withSelectedVillage(({ children, village }) => (
  <SearchPositionContainer
    initialePosition={{ x: village.x, y: village.y }}
    onSearchPosition={(position) => {
      centerMap(mapRenderer, position.x, position.y);
    }}
  >
    {children}
  </SearchPositionContainer>
));

const HydratedMap = withSelectedVillage(memo(({ village, onRequestChunks }) => (
  <Map
    assets={assets}
    onInitialize={(renderer) => {
      mapRenderer = renderer;
      centerMap(mapRenderer, village.x, village.y);
    }}
    onRequestChunks={onRequestChunks}
    onDataDisplay={(tile) => {
      console.log('CLICKED TILE', tile);
    }}
    onOver={(data) => {
      console.log('onHover', data);
    }}
  />
), () => true));

const HydratedVillageList = withVillages(({ villages }) => {
  const dispatch = useDispatch()
  return (
    <VillageList
      villages={villages}
      onClick={(village) => {
        dispatch(setSelectedVillage(village));
        centerMap(mapRenderer, village.x, village.y);
      }}
    />
  );
});

const MapScreen = ({ socket }) => {
  console.log('MAPSCREEN RERENDER')
  return (
    <View style={containerStyle}>

      <View style={leftLayout}>
        <MenuContainer>
          <HydratedBuildingList
            onClickBuilding={(building) => { }}
            onClickBuildables={(village, building) => socket.build(village, building)}
          />
        </MenuContainer>
      </View>

      <HydratedSearchPositionContainer>
        <View style={layoutStyle}>
          <HydratedMap onRequestChunks={socket.getChunk} />
        </View>
      </HydratedSearchPositionContainer>

      <View style={rightLayout}>
        <MenuContainer>
          <HydratedVillageList />
        </MenuContainer>
      </View>

      <View style={topLayoutStyle}>
        <View style={{ ...elementCardStyle, alignItems: 'flex-start' }}>
          <UserProfile />
        </View>
        <VillageProfile />
        <View style={{ ...elementCardStyle, alignItems: 'flex-end' }}>
          <Clock />
        </View>
      </View>

    </View>
  );
}
export default withSocket(MapScreen);
