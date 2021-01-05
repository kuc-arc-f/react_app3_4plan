import React from 'react'
//import { Link } from 'react-router-dom'

//
class HeadTest extends React.Component {
    /*
    constructor(props) {
        super(props);
        this.state = {data: ''}
    }    
    */
    componentDidMount(){
//        console.log(this.props.obj)
    }
    tabRow(){
//console.log(typeof(this.props.obj) )
//console.log( this.props.obj)
        if(this.props.obj instanceof Array){
            return this.props.obj.map(function(object, i){
                return(
                    <p key={object.id.toString()}>{object.id}<br />
                        {object.title}
                    </p>
                )
            })
        }
    }
    render(){
        return(
        <div id="div_navigate_index">
            <h1>HeadTest</h1>
            {this.tabRow()}
        </div>
        )
    }
}
//
export default HeadTest;

