import styled from 'styled-components';

const Alert = styled.div`
  margin: 1rem auto;
  padding: 1rem 2rem;
  width: 90%;
  max-width: 40rem;
  background-color: #d5bdfc;
  color: #38028d;
  font-weight: bold;
  font-size: 1.5rem;
  text-align: center;
  border-radius: 6px;
`;

function ErrorAlert(props) {
  return <Alert>{props.children}</Alert>;
}

export default ErrorAlert;
