import React from 'react'
import { Link } from 'react-router-dom'

//
class Head extends React.Component {
  render(){
    return(
        <div id="div_navigate_index">
            <div id="div_head" className="cover">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <a href="/"><p>ReactCMS 1</p></a>
                        </div>
                        <div className="col-sm-8">
                            <div className='menubar'>
                                <ul className='menu text-border'>
                                    <li><a href='#post_items_box'>posts</a></li>
                                    <li><Link to="/task">Task</Link>
                                    </li>
                                    <li><Link to="/about">About</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>          
            </div>
            <div id="nav-mobile">
                <a className="toggle">
                    <span>
                        <i className="fas fa-bars"></i>
                    </span>
                </a>
                <div className="mobile-child">
                <ul className='ul_mobile-child'>
                    <li className="mobile-menu-item"><a href='#post_items_box'>posts</a>
                    </li>
                </ul>
                </div>                

            </div>            


        </div>
    )
  }
}
//
export default Head;

