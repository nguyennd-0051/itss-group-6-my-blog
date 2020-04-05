import React from "react";
import AddTag from "./components/addTag";
import FormUpdatePost from "./components/formUpdatePost";
import FormCreatePost from "./components/formCreatePost";
import FormUpdateInfo from "./views/FormUpdateInfo"
import PersonalInfo from "./views/PersonalInfo"
import Post from "./Post"
import "./App.css";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;
const dateFormat = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userInfo: {
        name: "Bao Hieu",
        age: 18,
        position: "Data Scientist",
        company: "Google",
        technology: "Python, NodeJS, ReactJS",
        hobby: "Reading Books, Travel"
      },
      tagList: ["All","React","Blockchain"],
      isAddTag: false,
      isUpdatePost: false,
      isCreatePost: true,
      currentPage: 1,
      postLists: [
        {
          id: 1,
          title: "new title1",
          dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
          content: "new content1",
          selectedTag: ["React", "Blockchain"],
        },
        {
          id: 2,
          title: "new title2",
          dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
          content: "new content2",
          selectedTag: ["React"],
        },
        {
          id: 3,
          title: "new title3",
          dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
          content: "new content3",
          selectedTag: ["Blockchain"],
        },
      ],
    };

    this.onUpdatePersonalInfo = this.onUpdatePersonalInfo.bind(this);
    this.handleCreatePost = this.handleCreatePost.bind(this);
  }

  onUpdatePersonalInfo(newInfo) {
    this.setState({ userInfo: newInfo });
  }

  onToggleAddTag = () => {
    let result = null;
    this.state.isAddTag
      ? (result = (
          <AddTag
            closeFormAddTag={this.handleCloseFormAddTag}
            addTag={this.handleAddTag}
          />
        ))
      : (result = "");
    return result;
  };

  handleCloseFormUpdatePost = (value) => {
    this.setState({
      isUpdatePost: value,
    });
  };

  searchIndex = (id) => {
    let result = -1;
    this.state.postLists.forEach((postList, index) => {
      if (postList.id === id) result = index + 1;
    });
    return result;
  };

  handleUpdatePost = (value) => {
    const { postLists } = this.state;
    let index = this.searchIndex(value.id);
    if (index !== -1) {
      this.setState({
        postLists: [
          ...postLists.slice(0, index),
          {
            id: value.id,
            title: value.title,
            dateCreate: value.dateCreate,
            content: value.content,
          },
          ...postLists.slice(index + 1),
        ],
      });
    }
  };

  findMaxIndex = () => {
    const { postLists } = this.state;
    let idArray = postLists.map(post => post.id);
    
    return Math.max(...idArray);
  }

  handleCreatePost = (value) => {
    const { postLists,tagList } = this.state;
    let newTagList = [...new Set([...tagList, ...value.selectedTag])];
    let index = this.findMaxIndex();
    const newData = postLists.concat([{
      id: index + 1,
      title: value.title,
      dateCreate: new Date().toLocaleString('ja-JP',dateFormat),
      content: value.content,
      selectedTag: value.selectedTag,
    }]);
    this.setState({
      postLists: newData,
      tagList: newTagList,
    });
  };

  onToggleFormUpdatePost = () => {
    let result = null;
    this.state.isUpdatePost
      ? (result = (
          <FormUpdatePost
            closeFormUpdatePost={this.handleCloseFormUpdatePost}
            updatePost={this.handleUpdatePost}
            id={1}
            postLists={this.state.postLists}
          />
        ))
      : (result = "");
    return result;
  };
  onToggleFormCreatePost = () => {
    let result = null;
    this.state.isCreatePost
      ? (result = (
          <FormCreatePost
            createPost={this.handleCreatePost}
            postLists={this.state.postLists}
          />
        ))
      : (result = "");
    return result;
  };

  deletePost = (value) => {
    const {postLists} = this.state;
    const newData = postLists.filter((post) => post!==value);
    this.setState({postLists: newData});
  }

  renderPostList = () => {
    const {postLists} = this.state;

    return (postLists.map((post,index) => (
      <Post
        key={index}
        post={post}
        onClick={() => this.deletePost(post)}
      />
  )));
  }

  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">My Profile</Menu.Item>
            <Menu.Item key="2" onClick={this.onToggleFormUpdatePost()}>Posts</Menu.Item>
            <Menu.Item key="3">Create Post</Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">Content</div>
          <div>    
            <PersonalInfo
              userInfo={this.state.userInfo}
              onSubmitUpdate={(values) => this.onUpdatePersonalInfo(values)}
            />
      
            <FormCreatePost
              createPost={this.handleCreatePost}
              postLists={this.state.postLists}
              tagList={this.state.tagList}
            />
            {this.renderPostList()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Group6 ©2020 ITSS</Footer>
      </Layout>
    );
  }
}

export default App;
