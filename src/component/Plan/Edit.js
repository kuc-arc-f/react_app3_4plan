
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LibPlan from '../../libs/LibPlan';
import LibCommon from '../../libs/LibCommon';
import firebase from 'firebase'
//
class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {p_date: '', content: ''}
        this.id = 0
        this.handleClick = this.handleClick.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.id  = this.props.match.params.id
console.log( this.id)
        this.database = firebase.firestore()
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("#Auth-OK");
                self.get_item( self.id )
            } else {
                alert("Error, auth error, please Google Login")
                self.props.history.push("/plan");
                console.log('#no-User');
            }
        })        
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
        });
    }
    update_item(){
        var docRef = this.database.collection("plans").doc(this.id);
        var self = this
        docRef.update({
            content: this.state.content
        })
        .then(function() {
            self.props.history.push("/plan");
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        })        
//console.log( task )
    }    
    handleClickDelete(){
        var self = this
        var docRef = this.database.collection("plans").doc(this.id)
        docRef.delete().then(function() {
            console.log("Document successfully deleted!")
            self.props.history.push("/plan");
        }).catch(function(error) {
            console.error("Error removing document: ", error)
        })               
    }
    handleClick(){
        console.log("#-handleClick")
        this.update_item()
//        console.log( this.state )
    }        
    handleChangeContent(e){
        this.setState({ content: e.target.value })
    }
    render(){
        return (
        <div className="container">
            <Link to="/plan" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />            
            <h1>Plan - Edit</h1>
            <hr className="mt-2 mb-2" />
            <div className="form-group">
                <label>Content:</label>
                <div className="col-sm-10">
                    <textarea type="text" className="form-control" rows="10"
                    value={this.state.content}
                    onChange={this.handleChangeContent.bind(this)} ></textarea>
                </div>
            </div>            
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>Save
                </button>
            </div>
            <hr />
            <div className="form-group">
                <button className="btn btn-outline-danger btn-sm mt-2"
                onClick={this.handleClickDelete}>Delete
                </button>
            </div>

        </div>
        )
    }
}
export default Edit;