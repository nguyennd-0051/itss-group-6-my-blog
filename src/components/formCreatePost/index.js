import React, { Component } from "react";
// import AddTag from "../addTag";
import { Tag, Input, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

class EditableTagGroup extends Component {
  state = {
    tags: ['All'],
    inputVisible: false,
    inputValue: '',
  };

  handleClose = removedTag => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    console.log(tags);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
  };

  handleInputConfirm = () => {
    const { inputValue } = this.state;
    let { tags } = this.state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  saveInputRef = input => (this.input = input);

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag} closable={index !== 0} onClose={() => this.handleClose(tag)}>
              {isLongTag ? `${tag.slice(0, 20)}...` : tag}
            </Tag>
          );
          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          );
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text"
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag className="site-tag-plus" onClick={this.showInput}>
            <PlusOutlined /> New Tag
          </Tag>
        )}
      </div>
    );
  }
}

class FormCreatePost extends EditableTagGroup{
	constructor(props){
		super(props);
		this.state = {
			isCreatePost: false,
			isAddTag: false,
      tmptitle: '',
      tmpdatecreate: '',
      tmpcontent: ''
		};
    // this.createPost = this.createPost.bind(this);
	}
  handleTitleChange = (e) => {
    this.setState({tmptitle: e.target.value});
  }
  handleDateCreateChange = (e) => {
    this.setState({tmpdatecreate: e.target.value});
  }
  handleContentChange = (e) => {
    this.setState({tmpcontent: e.target.value});
  }
	createPost = (e) => {
    e.preventDefault();
		this.setState({isCreatePost: true});
    this.props.createPost(this.state);

	}
	cancelPost = () => {
		this.setState({isCreatePost: false});
	}
	// changeTagtoTrue = () => {
	// 	this.setState({isAddTag: true});
	// }
	render(){
		let createform = '';
		if (this.state.isCreatePost === true){
			if (this.state.isAddTag === false){
				createform ='';
				// <div>
				// 	<p> Hiển thị button Add Tag và button submit </p>
				// 	<button type="button" onClick={this.changeTagtoTrue}>Add Tag</button>
        //   <button type="button" >Submit ở đây là lưu luôn nhể</button>
        //   <br></br>
        //   Title: {this.state.tmptitle} <br></br>
        //   Date Create: {this.state.tmpdatecreate} <br></br>
        //   Content: {this.state.tmpcontent} <br></br>
        //
				// </div>;
			}
			else {
				createform ='';
				// <div>
					// <p> Hiển thị form tạo Tag </p>
					// <button type="button" onClick={this.cancelPost}>Cancel</button>
          // {this.props.postLists}
				// </div>
			}
		}
		else {
			createform =
      <div
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Create Post
              </h5>
            </div>
            <form onSubmit={this.onHandleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="name">Title:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter title"
                    aria-describedby="helpId"
                    onChange={this.handleTitleChange}
                    value={this.state.title}
                  />
                  <label htmlFor="name">Date Create:</label>
                  <input
                    type="text"
                    name="datecreate"
                    id="datecreate"
                    className="form-control"
                    placeholder="Enter date create"
                    aria-describedby="helpId"
                    onChange={this.handleDateCreateChange}
                    value={this.state.datecreate}
                  />
                  <label htmlFor="name">Content:</label>
                  <input
                    type="text"
                    name="content"
                    id="content"
                    className="form-control"
                    placeholder="Enter content"
                    aria-describedby="helpId"
                    onChange={this.handleContentChange}
                    value={this.state.content}
                  />
                </div>
                <EditableTagGroup/>
              </div>

              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={this.createPost}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>


		}
		return (
			<div
        className="FormCreatePost">
				{createform}
			</div>
		);
	}
}

export default FormCreatePost;
