const statusSpan = document.querySelector("#status");
const statusToggle = document.querySelector("#status-toggle");
const playButton = document.querySelector("#play");
const pauseButton = document.querySelector("#pause");
const stopButton = document.querySelector("#stop");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");
const workMinutesInput = document.querySelector("#work-minutes");
const restMinutesInput = document.querySelector("#rest-minutes");
const inputs = document.querySelector(".inputs");

let totalSeconds = 0;
let secondsElapsed = 0;
let status = "Working";
let interval;
//launch productivity timer
getTimePreferences();
//format minutes for HTML
function getFormattedMinutes() {
  //
  const secondsLeft = totalSeconds - secondsElapsed;

  const minutesLeft = Math.floor(secondsLeft / 60);

  let formattedMinutes;

  if (minutesLeft < 10) {
    formattedMinutes = "0" + minutesLeft;
  } else {
    formattedMinutes = minutesLeft;
  }

  return formattedMinutes;
}
//format seconds for HMTL
function getFormattedSeconds() {
  const secondsLeft = (totalSeconds - secondsElapsed) % 60;

  let formattedSeconds;

  if (secondsLeft < 10) {
    formattedSeconds = "0" + secondsLeft;
  } else {
    formattedSeconds = secondsLeft;
  }

  return formattedSeconds;
}
//get minutes from user input, set total seconds to be formatted
function setTime() {
  let minutes;

  if (status === "Working") {
    minutes = workMinutesInput.value.trim();
  } else {
    minutes = restMinutesInput.value.trim();
  }

  clearInterval(interval);
  totalSeconds = minutes * 60;
}

// display time and check to see if time is up
function renderTime() {
  minutesDisplay.textContent = getFormattedMinutes();
  secondsDisplay.textContent = getFormattedSeconds();

  if (secondsElapsed >= totalSeconds) {
    if (status === "Working") {
      alert("Time for a break!");
    } else {
      alert("Time to get back to work!");
    }

    stopTimer();
  }
}
//make sure time is not up, display time changing as second lapses
function startTimer() {
  setTime();
  if (totalSeconds > 0) {
    interval = setInterval(() => {
      secondsElapsed++;
      renderTime();
    }, 1000);
  } else {
    alert("Minutes of work/rest must be greater than 0.");
  }
}

//pause timer (not reset)
function pauseTimer() {
  clearInterval(interval);
  renderTime();
}

//stop timer (and resets)
function stopTimer() {
  secondsElapsed = 0;
  setTime();
  renderTime();
}

//toggle for working or not working
function toggleStatus(event) {
  const checked = event.target.checked;

  if (checked) {
    status = "Working";
  } else {
    status = "Resting";
  }

  statusSpan.textContent = status;

  secondsElapsed = 0;
  setTime();
  renderTime();
}
//pull local storage for saved preferences
function getTimePreferences() {
  const preferences = JSON.parse(localStorage.getItem("preferences"));
  if (preferences) {
    if (preferences.workMinutes) {
      workMinutesInput.value = preferences.workMinutes;
    }

    if (preferences.restMinutes) {
      restMinutesInput.value = preferences.restMinutes;
    }
  }
  setTime();
  renderTime();
}
//use local storage to set preferences
function setTimePreferences() {
  localStorage.setItem(
    "preferences",
    JSON.stringify({
      workMinutes: workMinutesInput.value.trim(),
      restMinutes: restMinutesInput.value.trim()
    })
  );
}
//event listeners
playButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
stopButton.addEventListener("click", stopTimer);
statusToggle.addEventListener("change", toggleStatus);
inputs.addEventListener("change", setTimePreferences);
inputs.addEventListener("keyup", setTimePreferences);
