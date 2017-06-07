import React, { Component } from 'react';
import './App.css';
import TextareaContainer from './containers/textareaContainer'
import RulelistContainer from './containers/rulelistContainer'
import * as firebase from "firebase";
import {users as UserList} from "./data/user.json";
import rules from './data/rules';
import wholeContent from './data/wholeContent';
import demoContent from './data/demoContent';
import demoRules from './data/demoRules';

const initFirebase = () => {
    var config = {
        apiKey: "AIzaSyCgeJKCo2V7RzVhC0pjHuL3Aaog1WXfn5M",
        authDomain: "repeat-a2e69.firebaseapp.com",
        databaseURL: "https://repeat-a2e69.firebaseio.com",
        projectId: "repeat-a2e69",
        storageBucket: "repeat-a2e69.appspot.com",
        messagingSenderId: "822450247274"
    };
    firebase.initializeApp(config);
}

class LoginPanel extends Component {
    render() {
        const { isLoggedIn, onUserLogin, userID, onUserLogout } = this.props;
        return (
            <div className='UserPanel'>
                <a href='#' onClick={(e)=>{
                        e.preventDefault();
                        if( isLoggedIn ){
                            onUserLogout();
                        } else {
                            var username = prompt("Username: ", "@repeat.lang");
                            var password = prompt("Pass Code: ", "");
                            onUserLogin(username, password);
                        }
                    }}>{isLoggedIn?userID:'login'}</a>
            </div>
        )
    }
}

class App extends Component {
    constructor(){
        super()
        this.state = {
            activatedReTexts: [],
            isLoggedIn: false,
            userID: '',
            wholeText: '',
            ruleList: [],
            isRepeatOn: false
        }
        initFirebase();

        this.observeStateChange = this.observeStateChange.bind(this);
        this.activeRe = this.activeRe.bind(this);
        this.handleWordClick = this.handleWordClick.bind(this);
        this.handleLoginSuccess = this.handleLoginSuccess.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentWillMount() {
        this.observeStateChange();

    }
    observeStateChange(){
        let thisObj = this;
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            let email = user.email;
            let userID = email.split('@')[0];
            thisObj.setState({
                isLoggedIn: true,
                userID
            });

            thisObj.handleLoginSuccess(userID);

          } else {
              thisObj.setState({
                  isLoggedIn: false,
                  userID: '',
                  wholeText: '',
                  ruleList: [],
                  isRepeatOn: false
              })
          }
        });
    }
    handleLoginSuccess( userID ){

        if( userID === 'demo' ){
            this.setState({
                wholeText: demoContent.text,
                ruleList: demoRules.re_list,
                isRepeatOn: true
            })
        }else {
            var user = UserList.find( x=> {return x.uid === userID} )
            if (user){
                const { repeat_on } = user;
                if(repeat_on){
                    this.setState({
                        wholeText: wholeContent.text,
                        ruleList: rules.re_list,
                        isRepeatOn: repeat_on
                    })
                }else {
                    this.setState({
                        wholeText: wholeContent.text,
                        ruleList: [],
                        isRepeatOn: repeat_on
                    })
                }

            }else{
                this.setState({
                    wholeText: wholeContent.text,
                    ruleList: [],
                    isRepeatOn: false
                })
            }

        }
    }
    handleWordClick( word ){
        const { userID, isLoggedIn, isRepeatOn } = this.state;
        if( isLoggedIn ){
            var uid = userID.split('@')[0];
            var now = new Date();

            var pushRef = firebase.database().ref('log/' + uid).push();
            pushRef.set({
                word,
                time: now.getTime()
              });
          }
          if( isRepeatOn ){
              var msg = new SpeechSynthesisUtterance(word);
              msg.lang = 'en-US';

              var voices = window.speechSynthesis.getVoices();

                for( var i = 0; i < voices.length ; i++) {
                    if(voices[i].name === 'Alex'){
                        msg.voice = voices[i];
                        break;
                    }else if(voices[i].lang === 'en-US'){
                        msg.voice = voices[i];
                        break;
                    }
                }
              window.speechSynthesis.speak(msg);

              var compatableRes = [];
              for ( var rule of rules.re_list ) {

                  var rex = new RegExp(rule.re);
                  if (rex.test(word)){
                      compatableRes.push( rule.re );
                  }
              }

              this.setState({activatedReTexts: compatableRes })

          }

    }
    handleLogout(){
        var thisObj = this;
        firebase.auth().signOut().then(function() {
          // Sign-out successful.
          console.log('logout');
          thisObj.setState({
              activatedReTexts: []
          });

        }).catch(function(error) {
          // An error happened.
          console.log(error);
        });
    }
    handleLogin( username, password ) {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
          alert('登入錯誤: '+ errorMessage );
        });
    }
    activeRe(reText){
        if( reText !== undefined ){
            this.setState( { activatedReTexts: [reText] })
        }else{
            this.setState( { activatedReText: [] })
        }
    }
    render() {
        const { activatedReTexts, isLoggedIn, userID, ruleList, wholeText } = this.state;

        return (
          <div className="App">
            <div className="App-header">
              <h2>Repeat</h2>
              <LoginPanel
                  isLoggedIn={isLoggedIn}
                  onUserLogin={this.handleLogin}
                  onUserLogout={this.handleLogout}
                  userID={userID} />
            </div>

            <div className="App-intro">
              <TextareaContainer wholeText={wholeText} activatedReTexts={activatedReTexts} handleWordClick={this.handleWordClick} />
              <RulelistContainer ruleList={ruleList} reActivated={this.activeRe} activatedReTexts={activatedReTexts} />
            </div>
          </div>
    );
    }
}

export default App;
