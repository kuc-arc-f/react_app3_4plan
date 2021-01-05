
import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import LibAuth from '../../libs/LibAuth';
import firebase from 'firebase'

//
class Login extends Component {
    constructor(props){
        super(props)
        this.state = {title: '', content: ''}
        this.handleClick = this.handleClick.bind(this);
        this.db = null
        this.provider = new firebase.auth.GoogleAuthProvider();
    }
    componentDidMount(){
        this.popup_open()
    }
    handleClick(){
        console.log("#-handleClick")
//        console.log( this.state )
    }
    popup_open(){
        var self = this
        firebase.auth().signInWithPopup(this.provider).then(async function(result) {
            var token = result.credential.accessToken;
//            console.log(token)
            var user = result.user;
console.log(user.uid)
//console.log(user.displayName)
//console.log(user.email)
            var valid_user =await  LibAuth.get_users(firebase)
// console.log(valid_user.length )
            if(valid_user.length < 1){
                await  LibAuth.add_users(firebase, user)
            }else{
                var admin_user = valid_user[0]
                console.log(admin_user.uid )
                if(admin_user.uid === user.uid){
                    console.log("admin-user:", user.uid )
                }else{
                    console.error("error, not-admiuser:", user.uid )
                    self.proc_logout(user)
                }
            }
//                alert("Sucess, Login complete")
            self.props.history.push("/");
        }).catch(function(error) {
            console.log(error.code)
            console.log(error.message)
        });        
    }
    proc_logout(user){
        var self = this
        firebase.auth().signOut().then(function() {
            console.log('#sign-out-OK');
            alert("Error, Invalid  admin user: " + user.email)
            self.props.history.push("/");
        }).catch(function(error) {
            console.log(error);
        })
    }
    render() {
        return (
        <div className="container">
            <Link to="/" className="btn btn-outline-primary mt-2">Back</Link>
            <hr className="mt-2 mb-2" />
            <h1 className="mt-2">Google Login:</h1>
            <hr />
            <p>・ ポップアップ画面で、Googleログイン認証ログインしてください。</p>
            <p>・ chromeブラウザのポップアップ許可が必要になります。</p>
            <p>・ chromeブラウザに、Googleアカウントでログインしている事が必用です。</p>        
        </div>
        )
    }
}
export default Login;

