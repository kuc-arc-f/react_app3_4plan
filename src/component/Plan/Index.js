import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import IndexRow from './IndexRow';
import moment from 'moment'
import firebase from 'firebase'
import LibPlan from '../../libs/LibPlan';
import LibCommon from '../../libs/LibCommon';

import '../../css/PlanIndex.css';
//
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            data_org: [],
            weeks :[],
            month : null,
            month_str : "",
        }
        this.db = null
        this.handleClickBefore = this.handleClickBefore.bind(this);
        this.handleClickAfter = this.handleClickAfter.bind(this);
        this.user = ''
    }
    componentDidMount(){
        var self = this
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.user =user
                console.log("#Auth-OK");
                self.init_plan()
            } else {
                alert("Error, auth error, please Google Login")
                console.log('#no-User');
                self.props.history.push("/");
            }
        })        
    }
    init_plan(){
        var dt = moment( )
        var weeks = LibPlan.get_week_items( dt )
//console.log(weeks)
        this.setState({
            weeks: weeks,
            month : dt,
            month_str : dt.format('YYYY-MM') 
        })
        this.get_items( dt )        
    }
    handleClickAfter(){
        var dt = this.state.month
        var sub = dt.add(1, 'month').startOf('month')
console.log( sub )
        this.change_month(sub)
        this.get_items(sub)
    }
    handleClickBefore(){
        var dt = this.state.month
        var sub = dt.add(-1, 'month').startOf('month')
console.log( sub )
        this.change_month(sub)
        this.get_items(sub)
    }
    change_month(dt){
        var weeks = LibPlan.get_week_items( dt )
        this.setState({
            weeks: weeks,
            month : dt,
            month_str : dt.format('YYYY-MM') 
        })        
    }
    async get_items(target_month){
        try{
            var self = this
            var dt = moment( target_month.format("YYYY-MM-DD") )
            var start = dt.startOf('month')
            var end = moment( target_month.format("YYYY-MM-DD") )
            end = end.add(1, 'month').startOf('month')
            start = start.toDate()
            end = end.toDate()
// console.log(start , end)
            var items = []
            this.database = firebase.firestore()
            var dbRef = this.database.collection('plans')
            .where("p_date", ">=", start)
            .where("p_date", "<", end)
            //.where("uid", "==", this.user.uid)
            var querySnapshot = await dbRef.get()
            querySnapshot.forEach(function(doc) {
                var item = doc.data()
//console.log(self.user.uid )
                item.id = doc.id
                item = LibPlan.convert_pdate(item )
                if(item.uid === self.user.uid){
                    items.push(item)            
                }
            })
console.log( items )
            var weeks = LibPlan.convert_week_array( this.state.weeks, items ,moment() )
            this.setState({ weeks: weeks }) 
        } catch (e) {
            console.error(e);
            console.error("error, test_get");
            return false
        }         
    }
    tabRow(){
        if(this.state.weeks instanceof Array){
            return this.state.weeks.map(function(object, i){
//console.log( object ,i)
                return (
                    <IndexRow obj={object.weekItem} key={i} />
                )
            })            
        }
    }
    render(){
        return (
        <div className="container">
            <div className="row mt-2">
                <div className="col-md-6">
                    <h3>Plan : {this.state.month_str}</h3>
                </div>
                <div className="col-md-6 btn_move_wrap">
                    <button onClick={this.handleClickBefore} className="btn btn-outline-primary">
                    <i className="fas fa-arrow-circle-left"></i> Before
                    </button>
                    <button onClick={this.handleClickAfter} className="btn btn-outline-primary ml-2">
                        After <i className="fas fa-arrow-circle-right"></i>
                    </button>
                </div>
            </div>
            <hr className="mt-2 mb-2" />            
            <div className="row">
                <div className="col-md-6">
                    <Link to="/plan_create"
                     className="btn btn-sm btn-primary">+ Create
                    </Link>
                </div>
                <div className="col-md-6">
                </div>
            </div>
            <table className="table table-bordered mt-2">
                <thead>
                <tr>
                    <th className="th_sun">日</th>
                    <th>月</th>
                    <th>火</th>
                    <th>水</th>
                    <th>木</th>
                    <th>金</th>
                    <th className="th_sat">土</th>
                </tr>      
                </thead>
                <tbody>
                    {this.tabRow()}
                </tbody>
            </table>
        </div>
        )
    }
}

export default Index;

