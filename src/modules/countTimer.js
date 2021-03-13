function countTimer(deadline) {
  let timeHours = document.querySelector("#timer-hours"),
    timeMinutes = document.querySelector("#timer-minutes"),
    timeSeconds = document.querySelector("#timer-seconds");

  function getTimeRemaining() {
    let dateStop = new Date(deadline).getTime(),
      dateNow = new Date().getTime(),
      timeRemaining = (dateStop - dateNow) / 1000,
      timeData = {
        timeRemaining,
        hours: 0,
        minutes: 0,
        seconds: 0,
      };

    if (timeRemaining > 0) {
      (timeData.seconds = Math.floor(timeRemaining % 60)),
        (timeData.minutes = Math.floor((timeRemaining / 60) % 60)),
        (timeData.hours = Math.floor(timeRemaining / 60 / 60) % 24),
        (timeData.days = Math.floor(timeRemaining / 60 / 60) / 24);
    }
    return timeData;
  }

  function correctTimeView(timeNumber) {
    return timeNumber < 10 ? "0" + timeNumber : timeNumber;
  }

  function updateClock() {
    let timer = getTimeRemaining();
    // console.log(timer);
    if (timer.timeRemaining < 0) {
      document.querySelector(".timer-numbers").style.color = "red";
      clearTimeout(updateClock);
    } else {
      setTimeout(updateClock, 1000);
    }

    timeHours.textContent = correctTimeView(timer.hours);
    timeMinutes.textContent = correctTimeView(timer.minutes);
    timeSeconds.textContent = correctTimeView(timer.seconds);
  }

  let comeOn = setTimeout(updateClock, 1000);
}
