import { useRouter } from 'next/router';
import { Fragment, useEffect, useState } from 'react/cjs/react.development';
import useSWR from 'swr';
import Head from 'next/head';

import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';
import { getFilteredEvents } from '../../helpers/api-util';

function FilteredEventPage(props) {
  let [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filteredData = router.query.slug;

  // Fetcher is optional because Note that fetcher can be omitted from the parameters if it's provided globally., but it MUST be provided either way
  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR(
    'https://nextjs-project-817c4-default-rtdb.firebaseio.com/events.json',
    fetcher
  );

  if (data) {
    const event = [];

    for (const key in data) {
      event.push({
        id: key,
        ...data[key],
      });
    }
    loadedEvents = event;
  }

  // Don't use useEffect() hook for data fetching, useSWR works perfect for this purpose.
  // useEffect(() => {
  //   if (data) {
  //     const event = [];

  //     for (const key in data) {
  //       event.push({
  //         id: key,
  //         ...data[key],
  //       });
  //     }
  //     setLoadedEvents(event);
  //   }
  // }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Event</title>
      <meta name='description' content='A list of filtered events' />
    </Head>
  );

  if (!loadedEvents)
    return (
      <Fragment>
        {pageHeadData}
        <p className='center'>Loading...</p>
      </Fragment>
    );

  const numYear = +filteredData[0];
  const numMonth = +filteredData[1];

  pageHeadData = (
    <Head>
      <title>Filtered Event</title>
      <meta
        name='description'
        content={`All events for ${numYear}/${numMonth}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  )
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );

  const filteredEvent = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvent || filteredEvent.length === 0)
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for chosen filter.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );

  const date = new Date(numYear, numMonth - 1);

  // if (props.hasError)
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <ErrorAlert>
  //         <p>Invalid filter. Please adjust your values.</p>
  //       </ErrorAlert>
  //       <div className='center'>
  //         <Button link='/events'>Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );

  // const filteredEvent = props.events;

  // if (!filteredEvent || filteredEvent.length === 0)
  //   return (
  //     <Fragment>
  //       {pageHeadData}
  //       <ErrorAlert>
  //         <p>No events found for chosen filter.</p>
  //       </ErrorAlert>
  //       <div className='center'>
  //         <Button link='/events'>Show All Events</Button>
  //       </div>
  //     </Fragment>
  //   );

  // const date = new Date(props.date.year, props.date.month - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvent}></EventList>
    </Fragment>
  );
}

// getServerSideProps is re-executed for every request anyways, so you are guaranteed to have the latest data there
// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filteredData = params.slug;

//   const numYear = +filteredData[0];
//   const numMonth = +filteredData[1];

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12)
//     return {
//       // By setting notFound to true, it will show the 404 error page
//       // notFound: true,
//       props: {
//         hasError: true,
//       },
//     };

//   const filteredEvent = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvent,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventPage;
