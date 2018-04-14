const timer = {
    status: "stop",
    id: "",
    startTime: "",
    time: "",
    timerContainer: document.querySelector(".timer"),
    start: function () {
      this.startTime = Date.now();
      this.id = setInterval(this.tick.bind(timer), 120);
    },
    stop: function () {
      clearInterval(this.id);
      this.time = Date.now() - this.startTime;
      this.insertTime(this.time);
    },
    reset: function () {
      this.insertTime(0);
    },
    tick: function () {
      const time = Date.now() - this.startTime;
      this.insertTime(time);
    },
    insertTime: function (time) {
      const min = Math.floor((time / 1000 / 60) % 60);
      const sec = Math.floor((time / 1000) % 60);
      const msec = time % 1000;
      this.timerContainer.textContent = `${min > 9 ? min : '0' + min}:${sec > 9 ? sec : '0' + sec}:${msec > 99 ? msec : msec > 9 ? '0' + msec : '00' + msec}`;
    }
  };

  export default timer;