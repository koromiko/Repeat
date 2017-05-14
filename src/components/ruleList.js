import React from 'react'
import './ruleList.css'

class RuleItem extends React.Component {
    render () {
        const { id, title, onMouseOver, onClick, selected } = this.props;
        return (<li className={selected?'ruleItem selected':'ruleItem'}
                    onMouseOver={()=>{onMouseOver(id)}}

                    onClick={()=>{onClick(id)}}
                    >
                    {title}
                    </li>)
    }
}

class RuleList extends React.Component {
    constructor(){
        super()
        this.state = {
            selectedIndex: undefined
        }
    }
    render () {
        const { rulsList, handleRuleHover, handleRuleSelected } = this.props;
        const { selectedIndex } = this.state;
        return (<div className='ruleListContainer'>
                {rulsList.map((item, i)=>{
                    return (<RuleItem key={'r_'+i}
                                        selected={selectedIndex===i}
                                        id={item.id}
                                        title={item.title}
                                        onMouseOver={handleRuleHover}
                                        onClick={(ruleID)=>{handleRuleSelected(ruleID); this.setState({selectedIndex:i}) }}
                                        />)
                })}
            </div>)
    }
}

export default RuleList;
