// Function used to animate a number from an initial value to another value
// obj is a DOM object / duration is in milliseconds
export const animateNumber = (obj, initVal, lastVal, duration) => {

  let startTime = null;

  // Get the current timestamp and assign it to the currentTime variable
  let currentTime = Date.now();

  // Pass the current timestamp to the step function
  const step = (currentTime) => {

    // If the start time is null, assign the current time to startTime
    if (!startTime) {
      startTime = currentTime;
    }

    // Calculate the value to be used in calculating the number to be displayed
    const progress = Math.min((currentTime - startTime) / duration, 1);

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