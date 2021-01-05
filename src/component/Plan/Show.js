
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LibPlan from '../../libs/LibPlan';
import LibCommon from '../../libs/LibCommon';
import firebase from 'firebase'

import '../../css/PlanShow.css';
//
class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            p_date: '', content: '',
            type :0 , created_at: '',
        };
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.database = firebase.firestore()
        this.id  = this.props.match.params.id
        console.log( this.id);
        this.get_item( this.id )
    }
    async get_item(id){
        var docRef = await this.database.collection("plans").doc( id )
        var doc = await docRef.get()  
        var item = doc.data() 
        item = LibPlan.convert_pdate_YYMMDD(item)
        item = LibCommon.convert_string_date(item)
console.log( item )     
        this.setState({ 
            p_date: item.date_str,
            content: item.content,
            created_at: item.created_at_str,
        });             
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }        
    render(){
        return (
        <div className="container plan_show_wrap">
            <Link to="/plan" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />            
            <h1>{this.state.p_date}</h1>
            Date : {this.state.created_at}
            <hr />
            <pre className="pre_text">{this.state.content}</pre>

        </div>
        )
    }
}
export default Show;