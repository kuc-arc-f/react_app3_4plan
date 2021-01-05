
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import LibPlan from '../../libs/LibPlan';
import LibCommon from '../../libs/LibCommon';
import firebase from 'firebase'

//
class Create extends Component {
    constructor(props){
        super(props)
        this.state = {p_date: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
        this.user = null
    }
    componentDidMount(){
        this.database = firebase.firestore()
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.user =user
                console.log("#Auth-OK");
            } else {
                alert("Error, auth error, please Google Login")
                self.props.history.push("/plan");
                console.log('#no-User');
            }
        })
        var s = moment().format('YYYY-MM-DD')
        console.log(s)
        this.setState({p_date: s })
    }
    handleChangeDate(e){
        this.setState({p_date: e.target.value})
    }
    handleChangeContent(e){
        this.setState({content: e.target.value})
    }
    add_item(){
console.log(this.user.uid)
        var self = this
        var date_str = this.state.p_date + "T00:00:00.000Z"
        var date = new Date( date_str );
        var item = {
            p_date: firebase.firestore.Timestamp.fromDate(date),
            content: this.state.content,
            created_at: firebase.firestore.Timestamp.fromDate(new Date()),
            uid: this.user.uid,
        } 
        this.database.collection('plans').add(item).then(function(docRef) {
            console.log("Document written with ID: ", docRef.id)
            self.props.history.push("/plan");
        }).catch(function(error) {
            alert("Error save: "+ error)
            console.error("Error adding document: ", error)
        })
    }
    handleClick(){
        console.log("#-handleClick")
        this.add_item()
//        console.log( this.state )
    }
    render() {
        return (
        <div className="container">
            <Link to="/plan" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Plan - Create</h1>
            <div className="form-group">
                <label className="col-sm-3 control-label">日付</label>
                <div className="col-sm-4">
                    <input type="date"  className="form-control"
                    value={this.state.p_date}                    
                    onChange={this.handleChangeDate.bind(this)}
                     required="required" />
                </div>                
            </div>            
            <div className="form-group">
                    <label>Content:</label>
                    <div className="col-sm-10">
                        <textarea type="text" className="form-control" rows="10"
                        onChange={this.handleChangeContent.bind(this)} ></textarea>
                    </div>
            </div>
            <br />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>Create
                </button>
            </div>
        
        </div>
        )
    }
}
export default Create;

