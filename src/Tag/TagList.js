import React, { Component } from 'react';
import './TagList.css';

class TagListItem extends Component {
  render() {
        var TagClass = this.props.cur ? 
    "yes" : "no";

    return (
      <div  onClick ={this.props.onClick}>
        <div className={TagClass}>  {this.props.tag}</div>
      </div>
    );
  }
}


export default TagListItem  ;
