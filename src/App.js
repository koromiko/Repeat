import React, { Component } from 'react';
import './App.css';
import TextareaContainer from './containers/textareaContainer'
import RulelistContainer from './containers/rulelistContainer'

class App extends Component {
    constructor(){
        super()
        this.state = {
            activatedRe: undefined
        }

        this.activeRe = this.activeRe.bind(this);
    }
    activeRe(reText){
        console.log(reText);
        if( reText !== undefined ){
            this.setState( { activatedRe: new RegExp(reText) })
        }else{
            this.setState( { activatedRe: undefined })
        }
    }
    render() {
        const { activatedRe } = this.state;
        return (
          <div className="App">
            <div className="App-header">

              <h2>Repeat</h2>
            </div>
            <div className="App-intro">
              <TextareaContainer activatedRe={activatedRe} />
              <RulelistContainer reActivated={this.activeRe} />
            </div>
          </div>
    );
    }
}

export default App;
