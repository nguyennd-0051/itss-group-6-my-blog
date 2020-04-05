import React, { Component } from 'react';
import { Card, Tag } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const { CheckableTag } = Tag;

class Post extends Component {
  
  render() {
    const {
      post,
      ...props
    } = this.props;

    return (
      <Card 
      title={this.props.post.title}
      // extra={<span><a href="#">Edit</a> <a {...props}>Delete</a></span>} 
      extra={<span><a {...props}>Delete</a></span>} 

      style={{ width: '100%' }}
      >
      <div className="Post">
        <div className="Post-dateCreate">{this.props.post.dateCreate}</div>
        <div className="Post-content">{this.props.post.content}</div>
        {/* <div className="Post-tags">{this.props.post.selectedTag}</div> */}
        <div>
        <span style={{ marginRight: 8 }}>Tag:</span>
        {this.props.post.selectedTag.map(tag => (
          <CheckableTag
            key={tag}
            checked={this.props.post.selectedTag.indexOf(tag) > -1}
            onChange={checked => this.handleChange(tag, checked)}
          >
            {tag}
          </CheckableTag>
        ))}
      </div>
      </div>
      </Card>
    );
  }
}

export default Post;

