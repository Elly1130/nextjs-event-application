import { useState, useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import styled from 'styled-components';
import NotificationContext from '../../store/notification-context';

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

  const notificationCtx = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [isFetchingComment, setIsFetchingComment] = useState();

  useEffect(() => {
    if (showComments) {
      setIsFetchingComment(true);
      fetch(`/api/user-comment/${eventId}`)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsFetchingComment(false);
        });
    }
  });

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: 'Adding comments...',
      message: 'Adding your comment to database',
      status: 'pending',
    });
    // send data to API
    fetch(`/api/user-comment/${eventId}`, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        if (response.ok) {
          return response.json();
        }

        const data = await response.json();
        throw new Error(data.message || 'Something went wrong');
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: 'Success.',
          message: 'Successfully loaded for comments.',
          status: 'success',
        })
      )
      .catch((error) =>
        notificationCtx.showNotification({
          title: 'Failed.',
          message: error.message || 'Something went wrong',
          status: 'error',
        })
      );
  }

  return (
    <StyledComments>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComment && <CommentList items={comments} />}
      {showComments && isFetchingComment && <p>Loading...</p>}
    </StyledComments>
  );
}
