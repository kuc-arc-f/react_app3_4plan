
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase'
//
class Test extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
    }
    componentDidMount(){
        this.procLogout()
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    procLogout() {
//        console.log('#users-Logout')
        var self = this
        firebase.auth().signOut().then(function() {
            console.log('#sign-out-OK');
//            alert("Complete, Logout")
            self.props.history.push("/");
        }).catch(function(error) {
            console.log(error);
        })            
    }  
    render() {
        return (
        <div className="container">
            <Link to="/task" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Logout</h1>
            <hr />
            <div className="form-group">
                <button className="btn btn-primary" onClick={this.handleClick}>test
                </button>
            </div>
        
        </div>
        )
    }
}
export default Test;

