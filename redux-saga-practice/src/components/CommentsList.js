import { ListGroupItem, ListGroup } from "reactstrap";

import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";

import "./CommentsList.css";
export default class CommentsList extends Component {
  render() {
    let comments = this.props.comments.items.items || [];
    return (
      <ListGroup>
        <section
          style={{
            width: "100%",
            maxWidth: "calc(100% - 365px)",
          }}
        >
          {comments
            .sort((a, b) => {
              if (this.props.comments.sort === "like")
                return b.userlike - a.userlike;
              else if (this.props.comments.sort === "time")
                return b.creation_time - a.creation_time;
            })
            .map((comment) => {
              return (
                <ListGroupItem
                  style={{ border: "none", padding: 0 }}
                  key={comment.comment_id}
                >
                  <div className="item">
                    <div className="user">
                      <div className="avatar">
                        <a
                          href="javascript:void(0);"
                          className="avatar__content"
                        >
                          {comment.full_name.substring(0, 1).toUpperCase()}
                        </a>
                      </div>
                      <div className="content">
                        <a
                          href="javascript:void(0);"
                          className="content__username"
                        >
                          {comment.full_name}
                        </a>
                        &nbsp;
                        <span
                          className="content__comment"
                          dangerouslySetInnerHTML={{ __html: comment.content }}
                        />
                      </div>
                    </div>
                    <div className="behavior">
                      <a
                        className="like"
                        href="javascript:void(0);"
                        rel={comment.comment_id}
                      >
                        <span
                          className="like__total_like"
                          href="javascript:void(0);"
                        >
                          {comment.userlike}
                        </span>
                        <FontAwesomeIcon icon={faThumbsUp} />
                      </a>
                      <a
                        className="behavior__reply"
                        href="javascript:void(0);"
                        rel={comment.comment_id}
                        parent={comment.comment_id}
                      >
                        Trả lời
                      </a>
                      <a
                        href="javascript:void(0);"
                        rel={comment.comment_id}
                        className="behavior__share"
                      >
                        Chia sẻ
                      </a>
                      <span className="behavior__time_com">{comment.time}</span>
                      <a
                        className="behavior__report_comment"
                        rel={comment.comment_id}
                        href="javascript:void(0);"
                      >
                        Vi phạm
                      </a>
                    </div>
                    {comment.replys.total &&
                    comment.replys.items.length === 0 ? (
                      <div
                        className="count_reply"
                        onClick={() => {
                          this.props.handleRequestReplies(
                            comment.article_id,
                            comment.comment_id
                          );
                        }}
                      >
                        <a
                          href="javascript:void(0);"
                          className="count_reply__text"
                        >
                          <span>{comment.replys.total}</span> trả lời
                        </a>
                      </div>
                    ) : null}
                    <div className="reply">
                      {comment.replys.total && comment.replys.items.length > 0
                        ? comment.replys.items
                            .sort((a, b) => {
                              if (this.props.comments.sort === "like")
                                return b.userlike - a.userlike;
                              else if (this.props.comments.sort === "time")
                                return b.creation_time - a.creation_time;
                            })
                            .map((reply) => {
                              return (
                                <div
                                  style={{ border: "none", padding: 0 }}
                                  key={reply.comment_id}
                                >
                                  <div className="item">
                                    <div className="user">
                                      <div className="avatar">
                                        <a
                                          href="javascript:void(0);"
                                          className="avatar__content"
                                        >
                                          {reply.full_name
                                            .substring(0, 1)
                                            .toUpperCase()}
                                        </a>
                                      </div>
                                      <div className="content">
                                        <a
                                          href="javascript:void(0);"
                                          className="content__username"
                                        >
                                          {reply.full_name}
                                        </a>
                                        &nbsp;
                                        <span
                                          className="content__comment"
                                          dangerouslySetInnerHTML={{
                                            __html: reply.content,
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div className="behavior">
                                      <a
                                        className="like"
                                        href="javascript:void(0);"
                                        rel={reply.comment_id}
                                      >
                                        <span
                                          className="like__total_like"
                                          href="javascript:void(0);"
                                        >
                                          {reply.userlike}
                                        </span>
                                        <FontAwesomeIcon icon={faThumbsUp} />
                                      </a>
                                      <a
                                        className="behavior__reply"
                                        href="javascript:void(0);"
                                        rel={reply.comment_id}
                                        parent={reply.comment_id}
                                      >
                                        Trả lời
                                      </a>
                                      <a
                                        href="javascript:void(0);"
                                        rel={reply.comment_id}
                                        className="behavior__share"
                                      >
                                        Chia sẻ
                                      </a>
                                      <span className="behavior__time_com">
                                        {reply.time}
                                      </span>
                                      <a
                                        className="behavior__report_comment"
                                        rel={reply.comment_id}
                                        href="javascript:void(0);"
                                      >
                                        Vi phạm
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                        : null}
                    </div>
                  </div>
                </ListGroupItem>
              );
            })}
        </section>
      </ListGroup>
    );
  }
}
