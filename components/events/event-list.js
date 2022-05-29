import EventItem from "./event-item";
import styled from "styled-components";

const UList = styled.ul`
  width: 90%;
  max-width: 40rem;
  margin: 5rem auto;
`;

export default function EventList(props) {
  const { items } = props;

  return (
    <UList>
      {items.map((item) => (
        <EventItem
          key={item.id}
          id={item.id}
          title={item.title}
          location={item.location}
          date={item.date}
          image={item.image}
        />
      ))}
    </UList>
  );
}
