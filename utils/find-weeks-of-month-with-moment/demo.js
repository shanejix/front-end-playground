const moment = require('moment');

function generateWeeksOfMonth() {
  const firstDay = moment(startDate).startOf('month')
  const endDay = moment(startDate).endOf('month')

  // const monthRange = moment.range(firstDay, endDay);
  // const monthRange = moment().min(firstDay).max(endDay);
  const monthRange = generateDateRange(firstDay, endDay);

  const weeks = []
  for (let mday of monthRange) {
    mday.week();
    if (weeks.indexOf(mday.week()) === -1) {
      weeks.push(mday.week());
    }
  }

  const calendar = []
  for (let index = 0; index < weeks.length; index++) {
    var weeknumber = weeks[index];
    firstWeekDay = moment(firstDay).week(weeknumber).day(0);
    if (firstWeekDay.isBefore(firstDay)) {
      firstWeekDay = firstDay;
    }
    lastWeekDay = moment(endDay).week(weeknumber).day(6);
    if (lastWeekDay.isAfter(endDay)) {
      lastWeekDay = endDay;
    }
    // weekRange = moment.range(firstWeekDay, lastWeekDay)
    weekRange = generateDateRange(firstWeekDay, lastWeekDay)
    calendar.push(weekRange)
  }

  return calendar
}

function generateDateRange(startDate, endDate) {
  const dates = [];
  let date = startDate.clone();

  while (date.isSameOrBefore(endDate)) {
    dates.push(date.clone());
    date = date.add(1, 'd');
  }

  return dates;
}

const startDate = '2022-02-26';

const calendar = generateWeeksOfMonth(startDate)

console.log(calendar, calendar.length, 'calendar');

for (let week of calendar) {
  for (let day of week) {
    const thisDay = day.format('YYYY-MM-DD');
    console.log('thisDay', thisDay);
  }
  console.log('----------------')
}

// const fs = require('fs')
// fs.writeFile('./test.json', JSON.stringify(calendar), err => {
//   if (err) {
//     console.error(err)
//     return
//   }
//   console.log('write success')
// })
