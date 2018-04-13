import React from 'react';
import { StyleSheet, SafeAreaView, InteractionManager, View } from 'react-native';
import POIsView from '../../components/POIsView';
import markersService from '../../services/markers';
import SegmentedControlTab from 'react-native-segmented-control-tab'

const iPhoneXHelper = require('isiphonex');
const SHOW_LIST_HEIGHT = 60;

export default class FilteredPlacesScreen extends React.Component {

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
    headerTintColor: 'white',
    headerBackTitle: 'Back'
  });

  constructor(props) {
    super(props);
    this.onShowMap = this.onShowMap.bind(this);
    this.onShowList = this.onShowList.bind(this);

    this.state = {
      showMap: true,
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

  onShowMap() {
    this.setState({
      showMap: true
    });
  }

  onShowList() {
    this.setState({
      showMap: false
    });
  }

  render() {
    const { params } = this.props.navigation.state;

    let child = null;
    if (this.state.showMap) {
      child = null;
      if (this.state.didFinishedLoading) {
        child = <POIsView style={styles.mapView} markers={markersService.getMarkers}/>
      }
    } else {
      child = <View style={{flex: 1, backgroundColor: 'white'}}/>;
    }

    return <SafeAreaView style={styles.container}>
      {
        child
      }

      { this.state.showMap === true &&
        <View style={styles.filterList}>

        </View>
      }

      <SegmentedControlTab
        tabsContainerStyle={styles.selectPresentationStyle}
        values={['Mapa', 'Lista']}
        selectedIndex={this.state.showMap ? 0 : 1}
        onTabPress= {(index) => this.setState({showMap:index === 0})}
      />
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
    height: SHOW_LIST_HEIGHT,
    zIndex: 2
  },
  selectPresentationStyle: {
    position: 'absolute',
    top: 32,
    left: 16,
    right: 16,
    zIndex: 2
  }
});