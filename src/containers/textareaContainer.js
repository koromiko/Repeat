import React from 'react'
import textA from '../data/ta.json'
import TextArea from '../components/textArea'

class TextareaContainer extends React.Component {
    constructor() {
        super();
        this.state = {
            words: textA.text.split(" ").map( (w, i)=>{ return [w, false] } )
        }
        this.handleWordClick = this.handleWordClick.bind(this);
    }

    handleWordClick(selectedIndex){
        const { words } = this.state;

        // let updatedWords = words.map( (item, i)=>{
        //     if(i===selectedIndex){
        //         return [item[0], true];
        //     }else{
        //         return [item[0], false];
        //     }
        // });
        // this.setState({words: updatedWords})
        var msg = new SpeechSynthesisUtterance(words[selectedIndex][0]);
        window.speechSynthesis.speak(msg);
        
    }
    render () {
        const {words} = this.state;
        const { activatedRe } = this.props;
        return (<div>
            <TextArea activatedRe={activatedRe} words={words} onWordClick={this.handleWordClick} />
        </div>)
    }
}

export default TextareaContainer;
