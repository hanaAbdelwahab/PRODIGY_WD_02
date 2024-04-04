let startTime;
let elapsedTime=0;
let timerInterval;

function toggleDarkMode() {
    const body = document.body;
    const header = document.querySelector(".header");
    const text = document.getElementById("display");
    const startIcon = document.getElementById("startStopBtn");
    const resetIcon = document.getElementById("resetBtn");
    const labIcon = document.getElementById("labBtn");
    header.classList.toggle("dark-mode-h");
    body.classList.toggle("dark-mode-b");
    text.classList.toggle("dark-mode-display"); 
    startIcon.classList.toggle("dark-mode-stbutton");
    resetIcon.classList.toggle("dark-mode-resetbutton");
    labIcon.classList.toggle("dark-mode-labbutton");
}


function startStop()
{
    if(timerInterval)
    {
        clearInterval (timerInterval);
        timerInterval=null;
        document.getElementById("startStopBtn").textContent="Start";
    }
    else{
        startTime= Date.now() - elapsedTime;
        timerInterval=setInterval(updateDisplay,10);
        document.getElementById("startStopBtn").textContent="Stop";
    }
}
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}


function formatTime(milliseconds){
    const hours = Math.floor(milliseconds/ (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(centiseconds)}`;
}
function pad(value) {
    return value < 10 ? "0" + value : value;
}
function reset() {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    document.getElementById("display").textContent = "00:00:00";
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("circle").classList.remove("grow"); 
    const labRecords = document.getElementById("labRecords");
    labRecords.innerHTML = "";
}
function recordLab() {
    const currentTime = document.getElementById("display").textContent;
    if (currentTime !== "00:00:00") {
        const labRecords = document.getElementById("labRecords");

       
        let table = document.getElementById("labTable");
        if (!table) {
            table = document.createElement("table");
            table.id = "labTable";
            
            table.style.borderCollapse = "collapse";
            labRecords.appendChild(table);

           
            const headerRow = document.createElement("tr");


            const labHeader = document.createElement("th");
            labHeader.textContent = "Lab";
            labHeader.style.border = "1px solid black";
            headerRow.appendChild(labHeader);

            const timeHeader = document.createElement("th");
            timeHeader.textContent = "Time";
            timeHeader.style.border = "1px solid black";
            headerRow.appendChild(timeHeader);

            const totalTimeHeader = document.createElement("th");
            totalTimeHeader.textContent = "Total Time";
            totalTimeHeader.style.border = "1px solid black";
            headerRow.appendChild(totalTimeHeader);

           
            table.appendChild(headerRow);
        }


        const rowCount = table.getElementsByTagName("tr").length;


        const labNumber = rowCount > 0 ? rowCount : 1;


        const newRow = document.createElement("tr");


        const labNumberCell = document.createElement("td");
        labNumberCell.textContent = labNumber;
        labNumberCell.style.border = "1px solid black";
        newRow.appendChild(labNumberCell);


        const timeCell = document.createElement("td");

        const formattedTime = currentTime.split('.')[0];
        timeCell.textContent = formattedTime;
        timeCell.style.border = "1px solid black";
        newRow.appendChild(timeCell);

        const previousTotalTime = labRecords.querySelector("#labTable tr:last-child td:last-child");
        let totalTime = formattedTime;
        if (previousTotalTime) {
            const [prevHours, prevMinutes, prevSeconds] = previousTotalTime.textContent.split(":").map(Number);
            const [hours, minutes, seconds] = formattedTime.split(":").map(Number);
            let totalHours = prevHours + hours;
            let totalMinutes = prevMinutes + minutes;
            let totalSeconds = prevSeconds + seconds;

            if (totalSeconds >= 60) {
                totalMinutes += Math.floor(totalSeconds / 60);
                totalSeconds %= 60;
            }
            if (totalMinutes >= 60) {
                totalHours += Math.floor(totalMinutes / 60);
                totalMinutes %= 60;
            }

            totalTime = `${String(totalHours).padStart(2, '0')}:${String(totalMinutes).padStart(2, '0')}:${String(totalSeconds).padStart(2, '0')}`;
        }


        const totalTimeCell = document.createElement("td");
        totalTimeCell.textContent = totalTime;
        totalTimeCell.style.border = "1px solid black";
        newRow.appendChild(totalTimeCell);

        table.appendChild(newRow);
    }
}
function toggleFullScreen() {
    const doc = document.documentElement;
    const requestFullScreen = doc.requestFullscreen || doc.webkitRequestFullScreen || doc.mozRequestFullScreen || doc.msRequestFullscreen;
    const exitFullscreen = document.exitFullscreen || document.webkitExitFullscreen || document.mozCancelFullScreen || document.msExitFullscreen;
  
    if (!document.fullscreenElement) {
      requestFullScreen.call(document.documentElement);
    } else {
      exitFullscreen.call(document);
    }
  }