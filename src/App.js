import React from "react";
import AddTag from "./components/addTag";
import FormUpdatePost from "./components/formUpdatePost";
import FormCreatePost from "./components/formCreatePost";
import FormUpdateInfo from "./views/FormUpdateInfo"
import PersonalInfo from "./views/PersonalInfo"
import "./App.css";

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
      tagList: ["all"],
      isAddTag: false,
      isUpdatePost: false,
      isCreatePost: true,
      postLists: [
        {
          id: 1,
          title: "new title1",
          dateCreate: "new dateCreate1",
          content: "new content1",
        },
        {
          id: 2,
          title: "new title2",
          dateCreate: "new dateCreate2",
          content: "new content2",
        },
        {
          id: 3,
          title: "new title3",
          dateCreate: "new dateCreate3",
          content: "new content3",
        },
      ],
    };

    this.onUpdatePersonalInfo = this.onUpdatePersonalInfo.bind(this);
  }

  onUpdatePersonalInfo(newInfo) {
    this.setState({ userInfo: newInfo });
  }

  handleAddTag = (value) => {
    this.state.tagList.push(value);
    this.setState({
      tagList: this.state.tagList,
    });
  };

  handleCloseFormAddTag = (value) => {
    this.setState({
      isAddTag: value,
    });
  };

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
    let result = -1;
    this.state.postLists.forEach((postList, index) => {
      result = result +1;
    });
    return result;
  };

  handleCreatePost = (value) => {
    const { postLists } = this.state;
    let index = this.findMaxIndex();
      this.setState({
        postLists: [
          ...postLists.slice(0, index +1),
          {
            id: index + 1,
            title: value.tmptitle,
            dateCreate: value.tmpdatecreate,
            content: value.tmpcontent,
          }
        ],
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

  render() {
    return (
      <div>
        {this.onToggleAddTag()}
        {this.onToggleFormUpdatePost()}
        {this.onToggleFormCreatePost()} 
        <div>
        <PersonalInfo
          userInfo={this.state.userInfo}
          onSubmitUpdate={(values) => this.onUpdatePersonalInfo(values)}
        />
      </div>
      </div>
    );
  }
}

export default App;
