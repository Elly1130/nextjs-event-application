import { Fragment } from 'react/cjs/react.development';
import { useRouter } from 'next/dist/client/router';

import EventList from '../../components/events/event-list';
import EventsSearch from '../../components/events/event-search';
import { getAllEvents } from '../../dummy-data';

function AllEventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
