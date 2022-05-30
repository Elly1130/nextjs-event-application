import { useState, useEffect } from 'react';
import styled from 'styled-components';

import CommentList from './comment-list';
import NewComment from './new-comment';

const StyledComments = styled.section`
  margin: 3rem auto;
  width: 90%;
  max-width: 40rem;
  text-align: center;

  button {
    font: inherit;
    border-radius: 6px;
    padding: 0.5rem 1rem;
    background-color: transparent;
    color: #03be9f;
    border: 1px solid #03be9f;
    cursor: pointer;

    &: hover,
    &: active{
      background-color: #dcfff9;
    }
  }
`;

export default function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/user-comment/${eventId}`)
        .then((response) => response.json())
        .then((data) => setComments(data.comments));
    }
  });

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    // send data to API
    fetch(`/api/user-comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  return (
    <StyledComments>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </StyledComments>
  );
}
