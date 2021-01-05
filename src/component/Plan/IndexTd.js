import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class IndexTd extends Component {
    tdDisp(){
        console.log("#-tdDisp")
        console.log( this.props.obj )
/*
        return weekItem.map(function(week, idx){
            return (
                <td>{week.day_dips}
                </td>
            )
        })        
*/
    }    
    render() {
        return (
            <td>aaa
                {this.tdDisp()}
            </td>
        )
    }
}

export default IndexTd;