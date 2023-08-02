const timeFormatButton = document.querySelector('button');
const timeFormatSpan = document.getElementById('format');

let format = 'standart';
timeFormatSpan.textContent = format;

const weekday = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const militaryTime = (time) => {
  const { hours, minutes, seconds } = time;
  return `${hours}:${minutes}:${seconds}`;
};

const standartTime = (time) => {
  const { hours, minutes, seconds } = time;
  let formatedHours = hours;
  let session = 'AM';

  if (formatedHours > 12) {
    session = 'PM';
    formatedHours -= 12;
    
    if (formatedHours <= 9) {
    formatedHours = `0${formatedHours}`;
  }
  }

  return `${formatedHours}:${minutes}:${seconds} ${session}`;
};

const formatTime = (time, format) => {
  const formattedTimeObject = Object.create(time);
  const { hours, minutes, seconds } = formattedTimeObject;
  let formattedTimeString = '';

  if (hours <= 9) {
    formattedTimeObject.hours = `0${hours}`;
    console.log(formattedTimeObject.hours);
  }
  if (minutes <= 9) {
    formattedTimeObject.minutes = `0${minutes}`;
  }
  if (seconds <= 9) {
    formattedTimeObject.seconds = `0${seconds}`;
  }

  formattedTimeString =
    format === 'military'
      ? militaryTime(formattedTimeObject)
      : standartTime(formattedTimeObject);

  return formattedTimeString;
};

const startTime = () => {
  const today = new Date(Date.now() - 39100000);
  const currentDayIndex = today.getDay();
  const currentWeekdayString = weekday[currentDayIndex];
  const weekdayTimeElement = document.getElementById('weekday');

  const currentMonthIndex = today.getMonth();
  const currentDay = today.getDate();
  const currentYear = today.getFullYear();
  const currentDateString = `${month[currentMonthIndex]} ${currentDay}th ${currentYear}`;
  const dateTimeElement = document.getElementById('date');

  const time = {
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
  };

  const formattedTimeString = formatTime(time, format);

  document.querySelector('time').textContent = formattedTimeString;
  weekdayTimeElement.textContent = currentWeekdayString;
  dateTimeElement.textContent = currentDateString;
  setTimeout(startTime, 1000);
};
startTime();

const handleTimeFormatButtonClick = () => {
  if (format === 'standart') {
    format = 'military';
  } else {
    format = 'standart';
  }
  timeFormatSpan.textContent = format;
  startTime();
};

timeFormatButton.addEventListener('click', handleTimeFormatButtonClick);
