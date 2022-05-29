import classes from "./logistics-item.module.css";
import styled from "styled-components";

const Item = styled.li`
  display: flex;
  font-size: 1.5rem;
  align-items: center;
  flex-direction: column;
  text-align: center;
  color: #aefff8;

  span {
    display: block;
  }

  @media (min-width: 768px) {
    align-items: flex-start;
    text-align: left;
  }
`;

const IconStyle = styled.span`
  margin-right: 1rem;
  color: #18e0d0;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

function LogisticsItem(props) {
  const { icon: Icon } = props;

  return (
    <Item>
      <IconStyle>
        <Icon />
      </IconStyle>
      <span className={classes.content}>{props.children}</span>
    </Item>
  );
}

export default LogisticsItem;
