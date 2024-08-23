const bookingData = [
  {
    id: 1,
    roomId: 'A101',
    startTime: '2019-09-28 13:00:00',
    endTime: '2019-09-28 14:00:00',
    title: 'Lunch with Petr',
  },
  {
    id: 2,
    roomId: 'A101',
    startTime: '2019-09-28 14:00:00',
    endTime: '2019-09-28 15:00:00',
    title: 'Sales Weekly Meeting',
  },
  {
    id: 3,
    roomId: 'A101',
    startTime: '2019-09-28 16:00:00',
    endTime: '2019-09-28 18:00:00',
    title: 'Anastasia Website Warroom',
  },
  {
    id: 4,
    roomId: 'A101',
    startTime: '2019-09-29 13:00:00',
    endTime: '2019-09-29 14:00:00',
    title: 'One-on-One Session',
  },
  {
    id: 5,
    roomId: 'A101',
    startTime: '2019-09-29 16:00:00',
    endTime: '2019-09-29 18:00:00',
    title: 'UGC Sprint Planning',
  },
  {
    id: 6,
    roomId: 'A102',
    startTime: '2019-09-30 09:00:00',
    endTime: '2019-10-04 18:00:00',
    title: '5-Day Design Sprint Workshop',
  },
  {
    id: 7,
    roomId: 'Auditorium',
    startTime: '2019-09-19 09:00:00',
    endTime: '2019-09-23 19:00:00',
    title: 'Thai Tech Innovation 2019',
  },
  {
    id: 8,
    roomId: 'A101',
    startTime: '2019-09-28 10:00:00',
    endTime: '2019-09-28 13:00:00',
    title: 'Raimonland project',
  },
  {
    id: 9,
    roomId: 'A102',
    startTime: '2019-09-30 18:00:00',
    endTime: '2019-09-30 20:00:00',
    title: 'Management Meetinng',
  },
  {
    id: 10,
    roomId: 'A101',
    startTime: '2019-10-04 14:00:00',
    endTime: '2019-10-06 11:00:00',
    title: '3-day workshop Corgi costume',
  },
];

// Create a function that accept room, startTime, endTime and return if the room is available for booking. The room is available if there’re no other current bookings during requested start - end time.

const checkAvailability = (roomId, startTime, endTime) => {
  if (typeof roomId !== 'string' || roomId.trim() === '') {
    return 'Invalid room ID: roomId must be a non-empty string.';
  }

  const requestedStartTime = new Date(startTime);
  const requestedEndTime = new Date(endTime);

  if (requestedEndTime <= requestedStartTime) {
    return 'Invalid time range: requested end time must be after requested start time.';
  }
  for (let i = 0; i < bookingData.length; i++) {
    const booking = bookingData[i];

    if (booking.roomId === roomId) {
      const bookingStartTime = new Date(booking.startTime);
      const bookingEndTime = new Date(booking.endTime);

      if (
        requestedStartTime < bookingEndTime &&
        requestedEndTime > bookingStartTime
      ) {
        return false;
      }
    }
  }
  return true;
};

//Create a function that return all current bookings that occur `today`, `this week`  and `next week` for a room. Be careful, some bookings last more than one day, and some goes between weeks ( Saturday to next Tuesday, for example)

function getBookingsForWeek(roomId, weekNo) {
  if (typeof roomId !== 'string' || roomId.trim() === '') {
    return 'Invalid room ID: roomId must be a non-empty string.';
  }
  if (typeof weekNo !== 'number' || weekNo < 0) {
    return 'Invalid week number: weekNo must be a non-negative number.';
  }
  const startOfWeek = new Date(2019, 8, weekNo * 7 + 2);
  const endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);

  let bookingGroupByWeek = {};

  console.log('startOfWeek', startOfWeek.toISOString().split('T')[0]);
  console.log('endOfWeek', endOfWeek.toISOString().split('T')[0]);

  for (let day = 0; day <= 6; day++) {
    const today = new Date(startOfWeek.getTime() + day * 24 * 60 * 60 * 1000);
    const formattedToday = today.toISOString().split('T')[0];
    bookingGroupByWeek[formattedToday] = bookingData.filter((booking) => {
      if (booking.roomId !== roomId) return false;
      const bookingStartDate = booking.startTime.split(' ')[0];
      const bookingEndDate = booking.endTime.split(' ')[0];

      return (
        bookingStartDate <= formattedToday && bookingEndDate >= formattedToday
      );
    });
  }

  const startOfNextWeek = new Date(
    endOfWeek.getTime() + 1 * 24 * 60 * 60 * 1000
  );
  const endOfNextWeek = new Date(
    startOfNextWeek.getTime() + 6 * 24 * 60 * 60 * 1000
  );
  const formattedStartOfNextWeek = startOfNextWeek.toISOString().split('T')[0];
  const formattedEndOfNextWeek = endOfNextWeek.toISOString().split('T')[0];

  console.log('startOfNextWeek', formattedStartOfNextWeek);
  console.log('endOfNextWeek', formattedEndOfNextWeek);

  bookingGroupByWeek['nextWeek'] = bookingData.filter((booking) => {
    if (booking.roomId !== roomId) return false;
    const bookingStartDate = booking.startTime.split(' ')[0];
    const bookingEndDate = booking.endTime.split(' ')[0];
    return (
      bookingStartDate <= formattedEndOfNextWeek &&
      bookingEndDate >= formattedStartOfNextWeek
    );
  });

  return bookingGroupByWeek;
}
// Assume first week of September 2019 = week number 0
// console.log(getBookingsForWeek("A102", 4));
// console.log(getBookingsForWeek("A101", 4));
// console.log(getBookingsForWeek("Auditorium", 2));
