import styled from 'styled-components';

const StyledComments = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  li {
    text-align: left;
    padding: 0.5rem 0;
    border-bottom: 2px solid #ccc;

    div {
      text-align: right;
      font-style: italic;
    }
  }

  p {
    margin: 0;
  }

  address {
    display: inline;
  }
`;

export default function CommentList(props) {
  const { items } = props;

  return (
    <StyledComments>
      {items.map((item) => (
        <li key={item._id}>
          <p>{item.text}</p>
          <div>
            By <address>{item.name}</address>
          </div>
        </li>
      ))}
    </StyledComments>
  );
}
