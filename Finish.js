// SignUp.js
import React from 'react'
import { StyleSheet, Dimensions, ScrollView, Text, TextInput, View, TouchableOpacity } from 'react-native'

import firebase from 'firebase';
const { width, height } = Dimensions.get('window')

export default class Finish extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          currentUser: null,
          TotalQuestions: 5,
          TotalCorrect: 0,
          Message: ""
        }
    }

    componentDidMount() {
        const currentUserFire = firebase.auth()
        const { hero } = this.props.navigation.state.params
        let MessageF = "";
        let EmailUser = firebase.auth().currentUser.email;

        switch (hero) {
            case 1:
                MessageF = "You are very bad on english, sorry, but even my dog can take a good score here. hahahahahahha JUST KIDDING TRY AGAIN, U CAN DO IT !";
            break;
            case 2:
                MessageF = "You are bad, i think you need to read some english books there... GO GO GO";
            break;
            case 3:
                MessageF = "BAD, i wanted more, really ? OKAY OKAY i just want to say u 'STUDY MORE MY DEAR' hahahahah";
            break;
            case 4:
                MessageF = "BAD, U did one mistake, this i was waiting the MAX SCORE, POOR U... I'm better than u sorry !";
            break;
            case 5:
                MessageF = "WOW, MAX Score, congrats, i can't say that u are very good, but in this time u won... Next time NO !!! hahahah";
            break;
        }

        this.setState({
            currentUser: currentUserFire,
            TotalCorrect: hero,
            Message: MessageF
                      })

        firebase.database().ref('Answers/').push({
                email : EmailUser,
                date : new Date().toString(),
                qtdQuestions : this.state.TotalQuestions,
                qtdCorrect : hero,
                message : MessageF
        }).then((data)=>{
            //success callback
            console.log('data ' , data)
        }).catch((error)=>{
            //error callback
            console.log('error ' , error)
        })

    }

_Story(){

    this.props.navigation.navigate('Story');
}

render() {
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.oval} >
            <Text style={styles.welcome}>
                Result of RoniQuiz
            </Text>
            <Text style={styles.welcome}>
                Questions: 5
            </Text>            
            <Text style={styles.welcome}>
                Number of hits: {this.state.TotalCorrect}
            </Text>           
            <Text style={styles.welcome}>
                {this.state.Message}
            </Text>   
            <TouchableOpacity onPress={() => this._Story(this)} >
                <View style={{marginTop:20, paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#00b2f6", alignItems: 'center', width: width * 90/200}}>
                  <Text style={{color:"white"}}>Your history</Text>
                </View>
            </TouchableOpacity >            
          </View>
        </View>  
        </ScrollView>   
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center', 
      backgroundColor:"#ffef92"
    },
    welcome: {
      fontSize: 20,
      margin: 15,
      color: "white"
    },
    oval: {
      width: width * 90/100,
      borderRadius: 20,
      backgroundColor: '#00b2f6'
    },
    options: {
        width: width * 90/100,
        margin:10, 
        paddingTop: 5,
        paddingBottom: 5, 
        paddingRight: 20, 
        paddingLeft: 20, 
        borderRadius:10, 
        backgroundColor:"#ff9a00"
    },   
    optionsPress: {
      width: width * 90/100,
      margin:10, 
      paddingTop: 5,
      paddingBottom: 5, 
      paddingRight: 20, 
      paddingLeft: 20, 
      borderRadius:10, 
      backgroundColor:"green"
  },      
    optionsText: {
        color:"white", 
        fontSize:20, 
        textAlign:"center"
    },          
  })