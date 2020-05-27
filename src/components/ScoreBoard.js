import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet,
  Dimensions
} from 'react-native';
import WithScore from '../HOC/WithScore';

const screenHeight = Math.round(Dimensions.get('window').height);

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 2,
        width: "100%",
        backgroundColor: "#CED0CE",
      }}
    />
  );
};

const ScoreBoard = ({topTen}) => {

  return (
    <View style={styles.container}>
      <FlatList
        data={topTen}
        ItemSeparatorComponent={renderSeparator}
        renderItem={({item, index}) => (
          <View style={styles.cell}>
              <Text style={styles.cellText}>
                  {`${index+1}. ${item.name}`}
              </Text>
              <Text style={styles.cellText}>
                  {item.score}
              </Text>
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
      flex:1,
      flexDirection: "column",
      justifyContent: 'center',
      padding:10,
  },
  cell:{
    flex:1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    height: (screenHeight - 120)/10 ,
  },
  cellText:{
    padding:5,
    fontSize: 22,
  }
})

export default WithScore(ScoreBoard)