const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
//targeting html elements
const giveaway = document.querySelector(".giveaway");
const deadline = document.querySelector(".deadline");
const items = document.querySelectorAll(".deadline-format h4");

//**this adds 10 days to the countdown everytime you load the page**
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//Setting the deadline  //year, month, day, hr, min, sec
//let futureDate = new Date(2021, 9, 03, 11, 11, 11);
//the date up is the represents a deadline for my bday :cake:

//storing the date in dif variables
//remember that the futureDate variable used to be the commented above
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 21, 30, 0);
const year = futureDate.getFullYear();
let month = futureDate.getMonth();
const hours = futureDate.getHours();
const mins = futureDate.getMinutes();
const secs = futureDate.getSeconds();
//day
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${months[month]} ${year} at ${hours}:${mins}am`;


//future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  //values in ms *how many ms are in?:
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMin = 60 * 1000;

  //calculate all values
  let days = Math.floor(t / oneDay);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMin);
  let seconds = Math.floor((t % oneMin) / 1000);

  //set values array
  const values = [days, hours, minutes, seconds];
  //adds zero is the value is a single digit
  function format(item) {
    if (item < 10) {
      return (item = `0${item}`);
    }
    return item;
  }
  //passes the time values to the selected html elements
  items.forEach(function (item, index) {
    item.innerHTML = format(values[index]);
  });
  if (t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`
  }
}

// countdown
let countdown = setInterval(getRemainingTime, 1000);

getRemainingTime();
