import { Fragment } from 'react/cjs/react.development';
import { useRouter } from 'next/dist/client/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';

function AllEventsPage(props) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default AllEventsPage;
