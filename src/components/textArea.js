import React from 'react'
import './textArea.css'
class TextArea extends React.Component {
    render () {
        const { words, onWordClick, activatedRe } = this.props;
        return (<div className='textareaContainer'>
            {words.map((item, i)=>{
                if( activatedRe ){
                    if( activatedRe.test(item[0]) ){
                        return (<span className='singleWord selected'
                                    key={'text_'+i}
                                    onClick={(e)=>{onWordClick(i)}}>{item[0]+" "}
                                </span>)
                    }
                }
                return (<span className={item[1]?'singleWord selected':'singleWord'}
                            key={'text_'+i}
                            onClick={(e)=>{onWordClick(i)}}>{item[0]+" "}
                        </span>)
            })}
        </div>)
    }
}

export default TextArea;
