// Main.js
import React from 'react'
import { AppRegistry, Dimensions, StyleSheet, Platform, Image, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import firebase from 'firebase';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get('window')

const jsonData = {"quiz" : {
  "quiz1" : {
    "Question 1" : {
      "correctoption" : "3",
      "options" : {
        "option1" : "That",
        "option2" : "These",
        "option3" : "This",
        "option4" : "Those"
      },
      "question" : "How much is ______ watch ? I can't find a price tag."
    },
    "Question 2" : {
      "correctoption" : "4",
      "options" : {
          "option1" : "That",
          "option2" : "This",
          "option3" : "These",
          "option4" : "Those"
        },
      "question" : "Look at ______ black jeans over there! Aren't they stylish ?" 
    },
    "Question 3" : {
      "correctoption" : "2",
      "options" : {
          "option1" : "expensiver than",
          "option2" : "More expensive than",
          "option3" : "expensiver",
          "option4" : "More expensive"
        },
      "question" : "Silk is ______ cotton. (Expensive)"
    },
    "Question 4" : {
      "correctoption" : "4",
      "options" : {
          "option1" : "Goodier",
          "option2" : "Better",
          "option3" : "Goodier than",
          "option4" : "Better than"
        },
      "question" : "Leather jackets are usually ______ wool ones. (Good)"
    },
    "Question 5" : {
      "correctoption" : "1",
      "options" : {
          "option1" : "Prettier",
          "option2" : "Prettier than",
          "option3" : "More Pretty than",
          "option4" : "More Pretty"
        },
      "question" : "Which dress is ______, the red one or the green one ? (Pretty)"
    }
  }
}
}

export default class Main extends React.Component {

constructor(props){
    super(props);
    this.state = {
      currentUser: null,
      currentQuestion: 1,
      Question: null,
      OptionSelected: 0,
      QtdCorrectAnswers: 0
    }
}

componentDidMount() {
    const currentUserFire = firebase.auth()
    const currentquestion = this.state.currentQuestion

    this.setState({
                    currentUserFire: currentUserFire,
                    Question: jsonData.quiz.quiz1["Question " + currentquestion].question,
                    Opt1: jsonData.quiz.quiz1["Question " + currentquestion].options.option1,
                    Opt2: jsonData.quiz.quiz1["Question " + currentquestion].options.option2,
                    Opt3: jsonData.quiz.quiz1["Question " + currentquestion].options.option3,
                    Opt4: jsonData.quiz.quiz1["Question " + currentquestion].options.option4
                  })
}

_ClickOption(OptionButton){
    this.setState({
      OptionSelected: OptionButton
    })
}

_Next(){
  var nextQuestion = this.state.currentQuestion + 1
  var CorrectAnswers = this.state.QtdCorrectAnswers;

  if(jsonData.quiz.quiz1["Question " + this.state.currentQuestion].correctoption == this.state.OptionSelected)
  {
    CorrectAnswers = CorrectAnswers + 1
  }

  if(this.state.currentQuestion == 5)
  {
      this.props.navigation.navigate('Finish', {hero: CorrectAnswers})

      return;
  }

  this.setState({
    currentQuestion: nextQuestion,
    Question: jsonData.quiz.quiz1["Question " + nextQuestion].question,
    Opt1: jsonData.quiz.quiz1["Question " + nextQuestion].options.option1,
    Opt2: jsonData.quiz.quiz1["Question " + nextQuestion].options.option2,
    Opt3: jsonData.quiz.quiz1["Question " + nextQuestion].options.option3,
    Opt4: jsonData.quiz.quiz1["Question " + nextQuestion].options.option4,
    OptionSelected: 0,
    QtdCorrectAnswers: CorrectAnswers
  })
}

render() {
    const { currentUser } = this.state
return (
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.container}>
          <View style={styles.oval} >
            <Text style={styles.welcome}>
                Question {this.state.currentQuestion}
            </Text>
            <Text style={styles.welcome}>
                {this.state.Question}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => this._ClickOption(1)}>
                <View style={this.state.OptionSelected == 1 ? styles.optionsPress : styles.options} >
                  <Text style={styles.optionsText}>
                    {this.state.Opt1}
                  </Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this._ClickOption(2)}>
                <View style={this.state.OptionSelected == 2 ? styles.optionsPress : styles.options} >
                 <Text style={styles.optionsText}>
                    {this.state.Opt2}
                  </Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this._ClickOption(3)}>
                <View style={this.state.OptionSelected == 3 ? styles.optionsPress : styles.options} >
                  <Text style={styles.optionsText}>
                      {this.state.Opt3}
                  </Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity onPress={() => this._ClickOption(4)}>
                <View style={this.state.OptionSelected == 4 ? styles.optionsPress : styles.options} >
                  <Text style={styles.optionsText}>
                    {this.state.Opt4}
                  </Text>
                </View>            
            </TouchableOpacity >                                    
          </View>
          <View style={{flexDirection:"row"}}>    
              <TouchableOpacity onPress={() => this._Next()} >
                <View style={{marginTop:20, paddingTop: 5,paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius:10, backgroundColor:"#00b2f6", alignItems: 'center', width: width * 90/200}}>
                  <Icon name="md-arrow-round-forward" size={30} color="white"/>
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