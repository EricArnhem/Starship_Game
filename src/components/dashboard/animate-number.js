// Function used to animate a number from an initial value to another value
// obj is a DOM object / duration is in milliseconds
export const animateNumber = (obj, initVal, lastVal, duration) => {

  let startTime = null;

  // The currentTimestamp will be passed automatically as an argument to the 'step' function by the 'window.requestAnimationFrame' function
  const step = (currentTimestamp) => {

    // If the start time is null, assign the currentTimestamp to startTime
    if (!startTime) {
      startTime = currentTimestamp;
    }

    // Calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTimestamp - startTime) / duration, 1);

    // Calculate what to be displayed using the value gotten above
    obj.innerHTML = Math.floor(progress * (lastVal - initVal) + initVal);

    // Checking to make sure the counter does not exceed the last value (lastVal)
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
    else {
      window.cancelAnimationFrame(window.requestAnimationFrame(step));
    }
  };

  // Start animating
  window.requestAnimationFrame(step);
}