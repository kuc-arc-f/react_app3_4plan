import React, { Component } from 'react';
import { Link } from 'react-router-dom';

//
class TopPostsRow extends Component {
   render() {
      return (
      <div className="post_items_wrap">
         <div className="div_news_rows">
            <Link to={`/show/${this.props.obj.show_id}`} >
               <h3 className="ml-10"> {this.props.obj.title}
               </h3>             
            </Link>        
         </div>
         <div>
            <ul className="ul_time_box">
               <li>
                  <p className="mb-0">
                     <span>
                        <i className="far fa-calendar"></i>
                     </span>
                     {this.props.obj.created_at} , ID : {this.props.obj.id}
                  </p>               
               </li>
               
            </ul>

         </div>
      </div>
      )
   }
}

export default TopPostsRow;

