import { Fragment } from 'react';
import Head from 'next/head';

import EventContent from '../../components/event-detail/event-content';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventSummary from '../../components/event-detail/event-summary';
import Button from '../../components/ui/button';
import {
  getAllEvents,
  getEventById,
  getFeaturedEvents,
} from '../../helpers/api-util';

export default function EventDetailPage(props) {
  const { event } = props;
  if (!event)
    return (
      <Fragment>
        <div className='center'>
          <p>Loading...</p>
        </div>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title}></EventSummary>
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      ></EventLogistics>
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

// Same as here, we don't need user specific data which changes all the time
// We need the context because we need to know which specific event ID we wanna load the event data
export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      event: event,
    },
    revalidate: 30,
  };
}

// This function will tell Next.js which parameter values it should pre-render this page
export async function getStaticPaths() {
  // const events = await getAllEvents();
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    // If we have loaded all possible pages here, setting fallback to let Next.js know if we try to load unknown ID, it should show the 404 error page
    // fallback: false,
    // If we does not loaded all possible pages here (Eg: only loaded featured events), setting fallback to false to let Next.js know that there are more pages than the ones we prepared here
    fallback: true,
    // If we set fallback to 'blocking', Next.js will not serve anything until the page is done generating, then the loading page will be longer, but we get the entire finished page right from the start
    // fallback: 'blocking',
  };
}
