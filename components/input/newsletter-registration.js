import { useRef, useContext } from 'react/cjs/react.development';
import styled from 'styled-components';
import NotificationContext from '../../store/notification-context';

const Newsletter = styled.section`
  margin: 3rem auto;
  width: 90%;
  max-width: 20rem;

  h2 {
    text-align: center;
  }

  button {
    background-color: #03be9f;
    border: 1px solid #03be9f;
    border-radius: 6px;
    color: #dafff7;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    font: inherit;
    cursor: pointer;

    &:hover,
    &:active {
      background-color: #02afa1;
      border-color: #02afa1;
    }
  }
`;

const Control = styled.div`
  display: flex;

  input {
    font: inherit;
    padding: 0.25rem;
    border-radius: 4px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border: 1px solid #ccc;
  }

  input {
    flex: 1;
  }
`;

export default function NewsletterRegistration() {
  const inputEmail = useRef();
  const notificationCtx = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const enteredEmail = inputEmail.current.value;

    if (
      !enteredEmail ||
      enteredEmail.trim() === '' ||
      !enteredEmail.includes('@')
    ) {
      console.log('Invalid Email');
      return;
    }

    notificationCtx.showNotification({
      title: 'Signing up...',
      message: 'Registering for newsletter.',
      status: 'pending',
    });

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email: enteredEmail }),
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
          message: 'Successfully signed up for newsletter.',
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
    <Newsletter>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <Control>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={inputEmail}
          />
          <button>Register</button>
        </Control>
      </form>
    </Newsletter>
  );
}
