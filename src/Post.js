import React, { Component } from 'react';
import { Card, Tag, PageHeader, Menu, Dropdown, Button, Typography, Row } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';
import "./Post.css";
const { CheckableTag } = Tag;
const { Paragraph } = Typography;

const content = (
  <>
    <Paragraph>
      Ant Design interprets the color system into two levels: a system-level color system and a
      product-level color system.
    </Paragraph>
    <Paragraph>
      Ant Design&#x27;s design team preferred to design with the HSB color model, which makes it
      easier for designers to have a clear psychological expectation of color when adjusting colors,
      as well as facilitate communication in teams.
    </Paragraph>
  </>
);

const Content = ({ children, extraContent }) => {
  return (
    <Row>
      <div style={{ flex: 1 }}>{children}</div>
      <div className="image">{extraContent}</div>
    </Row>
  );
};

class Post extends Component {
  
  render() {
    const {
      post,
      ...props
    } = this.props;

    return (
      <PageHeader
      style={{boxShadow: "5px 5px 20px rgba(0,0,0,0.12), 1px 1px 2px rgba(0,0,0,0.24)", margin: 20, background: "#fff"
      }}
        title={this.props.post.title}
        className="site-page-header post-container"
        subTitle={this.props.post.dateCreate}
        tags={this.props.post.selectedTag.map(tag => (
          <Tag
            key={tag}
            color="blue"
          >
            {tag}
          </Tag>
        ))}
        extra={[
          <Button key="edit"><EditOutlined /></Button>,
          <Button key="delete" {...props}>
            <DeleteOutlined />
          </Button>,
        ]}
        avatar={{ src: 'https://avatars1.githubusercontent.com/u/60763388?s=460&u=1011ca50a99ede598aef7569fc793ce1e4d6f5ce&v=4' }}
      >
        <Content>
          <Paragraph  ellipsis={{ rows: 3, expandable: true }}>
          {this.props.post.content}
          </Paragraph>
        </Content>
      </PageHeader>
    );
  }
}

export default Post;

