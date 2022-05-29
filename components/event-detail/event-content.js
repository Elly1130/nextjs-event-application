import styled from "styled-components";

const Content = styled.section`
  font-size: 1.5rem;
  color: #3a3a3a;
  width: 90%;
  max-width: 40em;
  margin: auto;
  margin-top: 8rem;
  text-align: center;
`;

function EventContent(props) {
  return <Content>{props.children}</Content>;
}

export default EventContent;
