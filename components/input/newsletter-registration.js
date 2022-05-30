import { useRef } from 'react/cjs/react.development';
import styled from 'styled-components';

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

  function registrationHandler(event) {
    event.preventDefault();

    // fetch user input (state or refs)
    // optional: validate input
    // send valid data to API
    const email = inputEmail.current.value;
    const emailBody = { email: email };

    if (!email || email.trim() === '' || !email.includes('@')) {
      console.log('Invalid Email');
      return;
    }

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify(emailBody),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
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
          <button onSubmit={registrationHandler}>Register</button>
        </Control>
      </form>
    </Newsletter>
  );
}
