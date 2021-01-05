import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import IndexTd from './IndexTd';

//
class IndexRow extends Component {
    trDisp(obj){
        if(obj instanceof Array){
            return obj.map(function(day, i){
//console.log( day.day_disp )
                if(day.db_none === 1){
                    return (
                    <td className="td_cls" key={i}>{day.day_disp}<br />
                        <br />
                        <br />
                    </td>
                    )
                }else{
                    return (
                    <td className="td_cls" key={i}>
                        <Link to={`/plan_show/${day.id}`} >
                            <div>{day.day_disp}<br />
                                {day.content}
                            </div>
                        </Link>
                        <Link to={`/plan_edit/${day.id}`} className="btn btn-outline-primary btn-sm td_edit">
                            Edit <i className="far fa-edit"></i>
                        </Link>
                    </td>
                    )                    
                }
            });    
        }        
    }
    render() {
        return (
            <tr>
                {this.trDisp(this.props.obj)}
            </tr>
        )
    }
}

export default IndexRow;