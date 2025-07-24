  let startBtn = document.getElementById("start");
    let stopBtn = document.getElementById("stop");
    let resetBtn = document.getElementById("reset");
    let lapBtn = document.getElementById("lap");
    let timeDisplay = document.getElementById("time");
    let lapList = document.getElementById("laps");

    let ms = 0, sec = 0, min = 0, hr = 0;
    let interval;

    function format(n, d) {
      return n.toString().padStart(d, "0");
    }

    function updateTime() {
      ms += 10;
      if (ms >= 1000) {
        ms = 0;
        sec++;
      }
      if (sec >= 60) {
        sec = 0;
        min++;
      }
      if (min >= 60) {
        min = 0;
        hr++;
      }

      // Show only 2 digits of ms by dividing by 10
      let msTwoDigits = Math.floor(ms / 10);

      timeDisplay.textContent = `${format(hr,2)}:${format(min,2)}:${format(sec,2)}:${format(msTwoDigits,2)}`;
    }

    startBtn.addEventListener("click", function () {
      clearInterval(interval);
      interval = setInterval(updateTime, 10);
    });

    stopBtn.addEventListener("click", function () {
      clearInterval(interval);
    });

    resetBtn.addEventListener("click", function () {
      clearInterval(interval);
      ms = sec = min = hr = 0;
      timeDisplay.textContent = "00:00:00:00";
      lapList.innerHTML = "";
    });

    lapBtn.addEventListener("click", function () {
      let li = document.createElement("li");
      li.textContent = timeDisplay.textContent;
      lapList.appendChild(li);
    });