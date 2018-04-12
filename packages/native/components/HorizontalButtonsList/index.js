import React from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

export default class HorizontalButtonsList extends React.Component {

  static propTypes = {
    backgroundColor: PropTypes.string,
    items: PropTypes.array.isRequired,
    itemWidth: PropTypes.number.isRequired,
    itemHeight: PropTypes.number.isRequired,
    onItemSelected: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.onItemSelected = this.onItemSelected.bind(this);
  }

  onItemSelected(item) {
    this.props.onItemSelected(item);
  }

  render() {
    return <ScrollView
      style={styles.container}
      horizontal={true}
      contentContainerStyle={styles.contentContainerStyle}>
        {
          this.props.items.map((item, index) => {
            return <TouchableOpacity
              key={'horizontal-list-item' + index}
              style={
                {
                  width: this.props.itemWidth,
                  height: this.props.itemHeight,
                  backgroundColor: 'white',
                  marginLeft: index !== 0 ? 8 : 0,
                  marginRight: index !== this.props.items.length -1 ? 8 : 0
                }
              }
              onPress={() => this.onItemSelected(item)}>
              <View style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
              </View>
            </TouchableOpacity>;
          })
        }
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent : 'center',
    alignItems: 'center'
  },
  item: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent : 'center',
    alignItems: 'center'
  },
  itemTitle: {
    color: 'black',
    textAlign: 'center'
  }
});
