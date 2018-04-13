import React from 'react';
import { StyleSheet, SafeAreaView, View, InteractionManager } from 'react-native';
import POIsView from '../../components/POIsView';
import HorizontalButtonsList from '../../components/HorizontalButtonsList';
import markersService from '../../services/markers';

const iPhoneXHelper = require('isiphonex');
const FILTER_LIST_HEIGHT = 60;

export default class SelectDietTypeScreen extends React.Component {

  static navigationOptions = {
    title: 'Diet',
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
  };

  constructor(props) {
    super(props);
    this.onDietTypeSelected = this.onDietTypeSelected.bind(this);

    this.state = {
      didFinishedLoading: false
    };
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        didFinishedLoading: true,
      });
    });
  }

  onDietTypeSelected(diet) {
    console.log("onDietTypeSelected: " + JSON.stringify(diet));
    this.props.navigation.navigate('SelectPlaceType', {
      diet: diet,
      title: diet.title
    });
  }

  render() {
    return <SafeAreaView style={styles.container}>
      { this.state.didFinishedLoading &&
        <POIsView style={styles.mapView} markers={markersService.getMarkers}/>
      }
      <View style={styles.filterList}>
        <HorizontalButtonsList items={[
          {
            id: "vegan",
            title: "Vegan"
          },
          {
            id: "gluten",
            title: "Gluten Free"
          },
          {
            id: "vegetarian",
            title: "Vegetarian"
          },
          {
            id: "paleo",
            title: "Paleo"
          },
        ]}
        onItemSelected={(diet) => this.onDietTypeSelected(diet)}
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
    bottom: (iPhoneXHelper.isIphoneX() ? 70 : 0),
    left: (iPhoneXHelper.isIphoneX() ? 16 : 0),
    right: (iPhoneXHelper.isIphoneX() ? 16 : 0),
    backgroundColor: '#6655A8',
    height: FILTER_LIST_HEIGHT,
    zIndex: 2
  },
});
