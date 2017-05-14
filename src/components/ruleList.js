import React from 'react'
import './ruleList.css'

class RuleItem extends React.Component {
    render () {
        const { id, title, onMouseOver, onClick } = this.props;
        return (<li className='ruleItem'
                    onMouseOver={()=>{onMouseOver(id)}}
                    onMouseOut={()=>{onMouseOver(undefined)}}
                    onClick={()=>{onClick(id)}}
                    >
                    {title}
                    </li>)
    }
}

class RuleList extends React.Component {

    render () {
        const { rulsList, handleRuleHover, handleRuleSelected } = this.props;
        return (<div className='ruleListContainer'>
                {rulsList.map((item, i)=>{
                    return (<RuleItem key={'r_'+i}
                                        id={item.id}
                                        title={item.title}
                                        onMouseOver={handleRuleHover}
                                        onClick={handleRuleSelected}
                                        />)
                })}
            </div>)
    }
}

export default RuleList;
