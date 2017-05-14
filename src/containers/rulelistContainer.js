import React from 'react'
import rules from '../data/rules'
import RuleList from '../components/ruleList'

class RulelistContainer extends React.Component {
    constructor(){
        super();
        this.state = {
            ruleList: rules.re_list.map( (item)=>{
                return Object.assign( item, {selected: false} )
            })
        }
        this.handleRuleHover = this.handleRuleHover.bind(this);
        this.handleRuleSelected = this.handleRuleSelected.bind(this);
    }

    handleRuleHover(ruleID){

    }

    handleRuleSelected(ruleID){
        const { ruleList } = this.state;
        const { reActivated } = this.props;
        if( ruleID ){
            let obj = ruleList.find( (x)=>{return x.id===ruleID} );
            reActivated(obj.re);
        }else{
            reActivated(undefined)
        }
    }
    render () {
        const rulsList = rules.re_list;
        return (<div>
            <RuleList rulsList={rulsList}
                    handleRuleHover={this.handleRuleHover}
                    handleRuleSelected={this.handleRuleSelected}
                    />
        </div>)
    }
}

export default RulelistContainer;
