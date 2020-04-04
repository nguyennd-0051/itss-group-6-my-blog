import React, { Component } from 'react';
import TagListItem from "./TagList.js"
import SubmitForm from "./TagForm.js"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      taglist : [
        {
          tag: "#comedy",
          cur: false,
          color: ' black'
        },
        {
          tag: "#la",
          cur: false,
          color: 'black'
        }
      ]
    }
    this.MarkCurrent = this.MarkCurrent.bind(this);
    this.handleAddTag = this.handleAddTag.bind(this);
  }

  handleAddTag = (item) => {
    this.state.taglist.push(item);
    this.setState({ taglist: this.state.taglist });
  };

  MarkCurrent = index => {
    var select = this.state.taglist[index]
    this.state.taglist.splice(index, 1);
    select.cur = !select.cur; 
    select.cur ? this.state.taglist.push(select) : this.state.taglist.unshift(select);
    this.setState({ taglist: this.state.taglist });

  };
  

  render() {
    let items = this.state.taglist.map((item, index) => {
      let result = ""
      if (item) {
        result = <TagListItem
                  key={index}
                  tag={item.tag}
                  cur={item.cur}
                  onClick={() => this.MarkCurrent(index)}
                />
      }

      return result
    })
    return (
      <div className="App">
        <div className="App-form">
          <SubmitForm
           onAddTag={this.handleAddTag}

          />
        </div>
        <div>
          {items}
        </div>
      </div>
    );
  }
}

export default App;
