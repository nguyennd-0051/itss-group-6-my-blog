import React, { Component } from "react";

class FormUpdatePost extends Component {
  state = {
    id: -1,
    title: "",
    dateCreate: "",
    content: "",
  };

  searchIndex = (id) => {
    let result = -1;
    this.props.postLists.forEach((postList, index) => {
      if(postList.id === id) result = index;
    });
    return result;
  }

  componentDidMount() {
    const { postLists } = this.props;
    let index = this.searchIndex(this.props.id);
    if(index !== -1) {
      this.setState({
        id: index + 1,
        title: postLists[index].title,
        dateCreate: postLists[index].dateCreate,
        content: postLists[index].content,
      });
    }
  }

  onCloseFormUpdatePost = (value) => {
    this.props.closeFormUpdatePost(value);
  };

  onHandleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  onHandleSubmit = (event) => {
    event.preventDefault();
    this.props.updatePost(this.state);
    this.props.closeFormUpdatePost(false);
  };

  render() {
    return (
      <div
        className="addTask"
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
                Form Update Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => this.onCloseFormUpdatePost(false)}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form onSubmit={this.onHandleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="title">Title:</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.title}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateCreate">Date Create:</label>
                  <input
                    type="text"
                    name="dateCreate"
                    id="dateCreate"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.dateCreate}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content:</label>
                  <input
                    type="text"
                    name="content"
                    id="content"
                    className="form-control"
                    placeholder="Enter name"
                    aria-describedby="helpId"
                    onChange={this.onHandleChange}
                    value={this.state.content}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  data-dismiss="modal"
                  onClick={() => this.onCloseFormUpdatePost(false)}
                >
                  Cannel
                </button>
                <button
                  type="submit"
                  className="btn btn-outline-success"
                  onClick={this.onAddTag}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default FormUpdatePost;
