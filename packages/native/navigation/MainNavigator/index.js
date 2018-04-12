import React from 'react';
import { StackNavigator } from 'react-navigation';

import SelectDietTypeScreen from '../../screens/SelectDietType';
import SelectPlaceTypeScreen from '../../screens/SelectPlaceType';
import FilteredPlacesScreen from '../../screens/FilteredPlaces';

const MainStackNavigator = StackNavigator(
  {
    SelectDietType: {
      screen: SelectDietTypeScreen
    },
    SelectPlaceType: {
      screen: SelectPlaceTypeScreen
    },
    FilteredPlaces: {
      screen: FilteredPlacesScreen
    }
  },
  {
    initialRouteName: 'SelectDietType',
    headerMode: 'float'
  }
);

export default class MainNavigator extends React.Component {
  render() {
    return <MainStackNavigator />;
  }
}
