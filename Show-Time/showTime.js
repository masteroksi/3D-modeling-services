function showCurrentTime(){
    var currDate = new Date();
    var hours = currDate.getHours();
    var minutes = currDate.getMinutes();
    var seconds = currDate.getSeconds();
    if (minutes <= 9) {
        minutes = "0" + minutes;
    }
    if (seconds <= 9) {
        seconds = "0" + seconds;
    }
    document.Clock.timer.value = hours + ":" + minutes + ":" + seconds;
    setTimeout("showCurrentTime()", 1000);
}
showCurrentTime();
