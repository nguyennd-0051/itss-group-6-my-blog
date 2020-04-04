import React from "react";
import AddTag from "./components/addTag";
import FormUpdatePost from "./components/formUpdatePost";
import "./App.css";

class App extends React.Component {
  state = {
    tagList: ["all"],
    isAddTag: false,
    isUpdatePost: false,
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
    console.log(value);
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

  render() {
    return (
      <div>
        {this.onToggleAddTag()}
        {this.onToggleFormUpdatePost()}
      </div>
    );
  }
}

export default App;
