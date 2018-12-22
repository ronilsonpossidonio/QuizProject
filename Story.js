import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';

import firebase from 'firebase';

export default class Story extends React.Component {

    constructor(props){
        super(props);
        this.state = {
                        dataSource: null
                     }
    }

    componentDidMount() {        
        const EmailUser = firebase.auth().currentUser.email;
        var dataSourceParam = []
        var self = this

        firebase.database().ref('Answers/').orderByChild('email').equalTo(EmailUser).on('value', function (snapshot) {
    
            snapshot.forEach(userSnapshot => {
                let data = userSnapshot.val();
                dataSourceParam.push(data)
            });

            console.log("dataSourceParam")
            console.log(dataSourceParam)
    
            self.setState({
                dataSource: dataSourceParam
                        })
        });

    }

    _renderItem = ({item}) => {      
      return  (
                  <TouchableOpacity  style={{flexDirection:'row', padding: 10, alignItems:'center'}}>
                      <View>
                          <Text style={{marginLeft: 10}}>Total Questions: {item.qtdQuestions}</Text>
                          <Text style={{marginLeft: 10}}>Total Hits: {item.qtdCorrect}</Text>
                          <Text style={{marginLeft: 10}}>Date: {item.date}</Text>
                      </View>
                  </TouchableOpacity>
              )
    }

    render() {
    
          return (
            <View style={styles.container}>
                    <FlatList 
                        data={this.state.dataSource}
                        renderItem={this._renderItem}
                        keyExtractor={(item) => item.id}
                        ItemSeparatorComponent={()=><View style={{height:1, backgroundColor: '#f7f7f7'}} />}
                    />
            </View>
                )
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffef92',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20
    },
    item:{
      flex: 1,
      alignSelf: 'stretch',
    }
  });