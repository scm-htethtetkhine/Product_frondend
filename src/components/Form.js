import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      comments: '',
      topic: 'react'
    };
  }

  handleUsernameChange = event => {
    this.setState({
      username: event.target.value,
    });
  };

  handleCommentChange = event => {
    this.setState({
      comments: event.target.value,
    });
  };

  handleTopicChange = event => {
    this.setState({
      topic: event.target.value
    })
  }

  handleSubmit = event => {
    alert(`${this.state.username} ${this.state.comments} ${this.state.topic}`)
    event.preventDefault()
  }

  render() {
    const { username, comments, topic } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input
            type="text"
            value={username}
            onChange={this.handleUsernameChange}
            placeholder="Username"
          />
        </div>

        <div>
          <textarea
            value={comments}
            onChange={this.handleCommentChange}
            placeholder="Comments"
          ></textarea>
        </div>

        <div>
          <label>Topic</label>
          <select value={topic} onChange={this.handleTopicChange}>
            <option value="react">React</option>
            <option value="angular">Angular</option>
            <option value="vue">Vue</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default Form;
