import React, { Component } from "react";
import { connect } from "react-redux";

import {
  getCommentsRequest,
  getRepliesRequest,
  handleSorting,
} from "../actions/comments";
import CommentsList from "./CommentsList";
import Sort from "./Sort";
import NewPostIdForm from "./NewPostIdForm";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.getCommentsRequest({ objectId: this.props.comments.objectId });
  }
  handleRequestReplies = (article_id, comment_id) => {
    this.props.getRepliesRequest({
      objectId: article_id,
      commentId: Number(comment_id),
    });
  };
  handleSorting = (typeSort) => {
    this.props.handleSorting(typeSort);
    this.props.getCommentsRequest({ objectId: this.props.comments.objectId });
  };
  onSubmitPostId = (objectId) => {
    this.props.getCommentsRequest({ objectId });
  };
  render() {
    let comments = this.props.comments;
    return (
      <div style={{ maxWidth: "1130px", margin: "0 auto" }}>
        <NewPostIdForm onSubmitPostId={this.onSubmitPostId} />
        <Sort sorting={comments.sort} handleSorting={this.handleSorting} />
        <CommentsList
          comments={comments}
          handleRequestReplies={this.handleRequestReplies}
        />
      </div>
    );
  }
}

export default connect(({ comments }) => ({ comments }), {
  getCommentsRequest,
  getRepliesRequest,
  handleSorting,
})(App);
