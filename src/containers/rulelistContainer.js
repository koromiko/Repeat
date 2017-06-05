import React from 'react'
import RuleList from '../components/ruleList'

class RulelistContainer extends React.Component {
    constructor(props){
        super();


        this.handleRuleHover = this.handleRuleHover.bind(this);
        this.handleRuleSelected = this.handleRuleSelected.bind(this);
    }

    handleRuleHover(ruleID){

    }

    handleRuleSelected(ruleID){
        const { ruleList } = this.props;
        const { reActivated } = this.props;
        if( ruleID ){
            let obj = ruleList.find( (x)=>{return x.id===ruleID} );
            reActivated(obj.re);
        }else{
            reActivated(undefined)
        }
    }
    render () {
        const { activatedReText, ruleList } = this.props;
        return (<div>
            <RuleList rulsList={ruleList}
                    handleRuleHover={this.handleRuleHover}
                    handleRuleSelected={this.handleRuleSelected}
                    activatedReText={activatedReText}
                    />
        </div>)
    }
}

export default RulelistContainer;
