import Link from 'next/link';
import styled from 'styled-components';

// Styled Components - Two different elements with same style
// Create generic style

const Btn = [
  `
  text-decoration: none;
  cursor: pointer;
  font: inherit;
  background-color: #03be9f;
  border: 1px solid #03be9f;
  border-radius: 6px;
  color: #dafff7;
  padding: 0.5rem 1.5rem;
  text-align: center;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);

  &:hover,
  &:active {
    background-color: #02afa1;
    border-color: #02afa1;
  }
  `,
];

const StyledA = styled.a(Btn);
const StyledButton = styled.button(Btn);

export default function Button(props) {
  if (props.link)
    return (
      <Link href={props.link}>
        <StyledA>{props.children}</StyledA>
      </Link>
    );

  return <StyledButton onClick={props.onClick}>{props.children}</StyledButton>;
}

// If you need some exception
// import styled, { css } from ‘styled-components’;

// const baseInputStyles = css`
//   padding: 0.5em;
// `;

// const StyledA = styled.a`
//   ${baseInputStyles}
// `;

// const StyledButton = styled.button`
//   ${baseInputStyles}
//   /* make changes as needed*/
// `;
