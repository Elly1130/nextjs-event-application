import Head from 'next/head';

import EventList from '../components/events/event-list';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
  // This page should be understood by search engine crawler. Hence, we need to pre-render this page
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

// Use getStaticProps to render the page during the build process and potentially also on the server if we set revalidate to a certain value so that we have mostly updated page
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    // By adding revalidate, in production, it would be regenerate from time to time
    revalidate: 1800,
  };
}
