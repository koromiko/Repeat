import React from 'react'
import TextArea from '../components/textArea'

class TextareaContainer extends React.Component {
    constructor(props) {
        super();
        this.handleWordClick = this.handleWordClick.bind(this);
    }

    convertTextToWordLists( text ){
        return text.split(" ").map( (w, i)=>{ return [w, false] } );
    }

    handleWordClick(selectedIndex){

        const { handleWordClick, wholeText } = this.props;
        let words = this.convertTextToWordLists(wholeText);
        let word = words[selectedIndex][0];
        handleWordClick(word);
    }
    render () {
        const { activatedReTexts, wholeText } = this.props;
        let words = this.convertTextToWordLists(wholeText);

        return (<div>
            <TextArea activatedReTexts={activatedReTexts} words={words} onWordClick={this.handleWordClick} />
        </div>)
    }
}

export default TextareaContainer;
