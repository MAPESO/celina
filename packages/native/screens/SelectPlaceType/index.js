import React from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import POIsView from '../../components/POIsView';
import HorizontalButtonsList from '../../components/HorizontalButtonsList';
import markersService from '../../services/markers';

const iPhoneXHelper = require('isiphonex');
const FILTER_LIST_HEIGHT = 60;

export default class SelectPlaceTypeScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title === undefined ? 'Celina' : navigation.state.params.title,
    headerStyle: {
      backgroundColor: '#6655A8',
    },
    headerTitleStyle: {
      color: 'white',
    },
    headerBackTitleStyle: {
      color: 'white',
    },
    headerTintColor: 'white'
  });

  constructor(props) {
    super(props);
    this.onPlaceTypeSelected = this.onPlaceTypeSelected.bind(this);

    console.log(this.props.navigation.state.params.title);
  }

  onPlaceTypeSelected(placeType) {
    this.props.navigation.navigate('FilteredPlaces', {
      diet: this.props.navigation.state.params.diet,
      placeType: placeType,
      title: this.props.navigation.state.params.diet.title + " " + placeType.title
    });
  }

  render() {
    const { params } = this.props.navigation.state;

    return <SafeAreaView style={styles.container}>
      <POIsView style={styles.mapView} markers={markersService.getMarkers}/>
      <View style={styles.filterList}>
        <HorizontalButtonsList items={[
          {
            id: "grocery",
            title: "Groceries"
          },
          {
            id: "restaurant",
            title: "Restaurants"
          },
          {
            id: "market",
            title: "Market"
          }
        ]}
        onItemSelected={(type) => this.onPlaceTypeSelected(type)}
        itemHeight={FILTER_LIST_HEIGHT - 16}
        itemWidth={FILTER_LIST_HEIGHT - 16}/>
      </View>
    </SafeAreaView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#6655A8'
  },
  mapView: {
    width: '100%',
    height: '100%'
  },
  filterList: {
    position: 'absolute',
    bottom: (iPhoneXHelper.isIphoneX() ? 32 : 0),
    left: 16,
    right: 16,
    backgroundColor: '#6655A8',
    height: FILTER_LIST_HEIGHT,
    zIndex: 2
  },
});
