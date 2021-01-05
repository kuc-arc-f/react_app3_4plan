import React from 'react'
import axios from 'axios';
// import TableRow from './TableRow';
import LibCommon from '../libs/LibCommon';
//
class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''}
  }  
  componentDidMount(){
    var dt = LibCommon.formatDate( new Date(), "YYYY-MM-DD_hhmmss");
    axios.get('/cms.json?' + dt)
    .then(response => {
      this.setState({ data: response.data })
      console.log( this.state.data.items )
    })
    .catch(function (error) {
      console.log(error)
    })
  }
  tabRow(){
  }    
  render(){
    return(
      <div>
        <h1>test</h1>
        <h2>welcome, test2</h2>
        <hr />
        <div>
        </div>
      </div>
    )
  }
}

export default Test;

