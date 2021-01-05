import React from 'react'
import firebase from 'firebase'
import { Link } from 'react-router-dom';
//
class Home extends React.Component {
    constructor(props){
        super(props)
        this.state = {valid_login : false}
    }
    componentDidMount(){
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                console.log("#Auth-OK");
                self.setState({ valid_login: true })
            } else {
//                alert("Error, auth error, please Google Login")
                console.log('#no-User');
            }
        })
    }    
    dispLogin(){
        if(this.state.valid_login){
            return (
                <div><Link to="/logout" >[ Logout ]</Link> 
                </div>
            )
        }else{
            return (
                <div><Link to="/login" >[ Login ]</Link>
                </div>
            )
        }
   }
    render(){
        return(
        <div className="container">
            {this.dispLogin()}
            <h1>Home</h1>
            <hr />
            <p>welcome, home</p>
        </div>
        )
    }
}


export default Home;

