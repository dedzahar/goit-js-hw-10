import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const inputDate = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("button[data-start]");
startBtn.addEventListener("click", startTimer);
startBtn.disabled = true;
let userSelectedDate;

function checkSelectedDate(selectedDate) {
    const currDate = new Date();
    if ((selectedDate - currDate) <= 0) {
        startBtn.disabled = true;
        iziToast.show({
            message: "Please choose a date in the future",
            position: 'topRight',
            messageColor: '#fff',
            backgroundColor: '#ef4040'
        });
        return false;
    } else {
        startBtn.disabled = false;
        userSelectedDate = selectedDate;
        return true;
    }
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        checkSelectedDate(selectedDates[0]);
  },
};

flatpickr(inputDate, options);

const daysView = document.querySelector("span[data-days]");
const hoursView = document.querySelector("span[data-hours]");
const minutesView = document.querySelector("span[data-minutes]");
const secondsView = document.querySelector("span[data-seconds]");

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function padStart(value) {
    return String(value).padStart(2, "0");
}

function updateTimerView(msec) {
    const timeLeft = convertMs(msec);
    daysView.textContent = padStart(timeLeft.days);
    hoursView.textContent = padStart(timeLeft.hours);
    minutesView.textContent = padStart(timeLeft.minutes);
    secondsView.textContent = padStart(timeLeft.seconds);
}

function startTimer(event)
{
    /* if user date became smaller */
    if (!checkSelectedDate(userSelectedDate)) {
        return;
    };
    startBtn.disabled = true;
    inputDate.disabled = true;
    const timer = setInterval(() => {
        const delta = userSelectedDate - Date.now();
        // console.log(timer, delta);
        if (delta < 0) {
            clearInterval(timer);
            // console.log("Timer stopped", timer);
            return;
        }
        updateTimerView(delta);

    }, 1000);
}