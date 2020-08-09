class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
  }

  getRemainingTime() {
    const targetDate = Date.parse(this.targetDate);
    const time = targetDate - Date.now();
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((time % (1000 * 60)) / 1000);

    return {
      time,
      days,
      hours,
      mins,
      secs,
    };
  }

  start() {
    this.timerUpdate();
  }

  timerUpdate() {
    const timeData = this.getRemainingTime();
    if (timeData.time > 1000) {
      setTimeout(this.timerUpdate.bind(this), 1000);
    }

    const timerRef = document.querySelector(this.selector);
    const daysRef = timerRef.querySelector('span[data-value="days"]');
    const hoursRef = timerRef.querySelector('span[data-value="hours"]');
    const minsRef = timerRef.querySelector('span[data-value="mins"]');
    const secsRef = timerRef.querySelector('span[data-value="secs"]');

    daysRef.innerHTML = timeData.days;
    hoursRef.innerHTML = timeData.hours;
    minsRef.innerHTML = timeData.mins;
    secsRef.innerHTML = timeData.secs;
  }
}

const endPointTime = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
});

endPointTime.start();
