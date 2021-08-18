//----------------------MODAL----------------------
var modal = document.getElementById("modal");
var modalBtn = document.getElementById("modalBtn");
var closeBtn = document.getElementById("closeModal");
var clockForm = document.querySelector("#clockForm");
modalBtn.addEventListener("click", function () {
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
});
closeBtn.addEventListener("click", function () {
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
});
clockForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var formData = new FormData(clockForm);
    var editedDeadline = setDeadline({
        months: Number(formData.get("month")),
        days: Number(formData.get("day")),
        hours: Number(formData.get("hour")),
        minutes: Number(formData.get("minute")),
        seconds: Number(formData.get("second")) + 1
    });
    // Hide modal
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
    // Reinitialize Clock
    clearInterval(timeInterval);
    initializeClock(editedDeadline);
    clockForm.reset();
});
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
    }
};
window.addEventListener("load", function () {
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
});
//----------------------Calculate Remaining Time----------------------
var getTimeRemaining = function (endwise) {
    var total = Date.parse(endwise) - new Date().getTime();
    var seconds = Math.floor((total / 1000) % 60);
    var minutes = Math.floor((total / 1000 / 60) % 60);
    var hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    var days = Math.floor(total / (1000 * 60 * 60 * 24) % 30);
    var months = Math.floor(total / (1000 * 60 * 60 * 24 * 30) );
    if (months > 11) {
        months = 11;
    }
    return {
        total: total,
        months: months,
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
};
// Define Clock Main Interval Globally
var timeInterval = setInterval(function () { }, 1000);
var initializeClock = function (endtime) {
    var monthsSpan = document.querySelectorAll("#months-number");
    var monthsSpanFlip = document.querySelectorAll("#flip-months-number");
    var daysSpan = document.querySelectorAll("#days-number");
    var daysSpanFlip = document.querySelectorAll("#flip-days-number");
    var hoursSpan = document.querySelectorAll("#hours-number");
    var hoursSpanFlip = document.querySelectorAll("#flip-hours-number");
    var minutesSpan = document.querySelectorAll("#minutes-number");
    var minutesSpanFlip = document.querySelectorAll("#flip-minutes-number");
    var secondsSpan = document.querySelectorAll("#seconds-number");
    var secondsSpanFlip = document.querySelectorAll("#flip-seconds-number");
    var updateClock = function () {
        var t = getTimeRemaining(endtime);
        //Animate Function
        var animateCountdown = function (elementTop, elementBottom, spanFlipTop, spanFlipBottom, time) {
            elementTop.style.animation = "top-to-bottom 0.5s linear";
            elementBottom.style.animation = "bottom-to-top 0.5s linear";
            var animationTopCB = function () {
                elementTop.style.animation = "";
                elementTop.removeEventListener("animationend", animationTopCB);
                spanFlipTop.innerHTML = ("0" + time).slice(-2);
            };
            var animationBottomCB = function () {
                elementBottom.style.animation = "";
                elementBottom.removeEventListener("animationend", animationBottomCB);
                spanFlipBottom.innerHTML = ("0" + time).slice(-2);
            };
            elementTop.addEventListener("animationend", animationTopCB);
            elementBottom.addEventListener("animationend", animationBottomCB);
        };
        // Update Seconds if has changed (Always)
        if (t.seconds >= 0) {
            var flipCardTopS = document.getElementById("flip-card-top-s");
            var flipCardBottomS = document.getElementById("flip-card-bottom-s");
            secondsSpan[0].innerHTML = ("0" + t.seconds).slice(-2);
            animateCountdown(flipCardTopS, flipCardBottomS, secondsSpanFlip[0], secondsSpan[1], t.seconds);
            secondsSpanFlip[1].innerHTML = ("0" + t.seconds).slice(-2);
        }
        // Update Minutes if has changed
        if (parseInt(minutesSpan[0].innerHTML) !== t.minutes && t.minutes >= 0) {
            var flipCardTopM = document.getElementById("flip-card-top-m");
            var flipCardBottomM = document.getElementById("flip-card-bottom-m");
            minutesSpan[0].innerHTML = ("0" + t.minutes).slice(-2);
            animateCountdown(flipCardTopM, flipCardBottomM, minutesSpanFlip[0], minutesSpan[1], t.minutes);
            minutesSpanFlip[1].innerHTML = ("0" + t.minutes).slice(-2);
        }
        // Update Hours if has changed
        if (parseInt(hoursSpan[0].innerHTML) !== t.hours && t.hours >= 0) {
            var flipCardTopH = document.getElementById("flip-card-top-h");
            var flipCardBottomH = document.getElementById("flip-card-bottom-h");
            hoursSpan[0].innerHTML = ("0" + t.hours).slice(-2);
            animateCountdown(flipCardTopH, flipCardBottomH, hoursSpanFlip[0], hoursSpan[1], t.hours);
            hoursSpanFlip[1].innerHTML = ("0" + t.hours).slice(-2);
        }
        // Update Days if has changed
        if (parseInt(daysSpan[0].innerHTML) !== t.days && t.days >= 0) {
            var flipCardTopD = document.getElementById("flip-card-top-d");
            var flipCardBottomD = document.getElementById("flip-card-bottom-d");
            daysSpan[0].innerHTML = ("0" + t.days).slice(-2);
            animateCountdown(flipCardTopD, flipCardBottomD, daysSpanFlip[0], daysSpan[1], t.days);
            daysSpanFlip[1].innerHTML = ("0" + t.days).slice(-2);
        }
       // Update months if has changed
        if (parseInt(monthsSpan[0].innerHTML) !== t.months && t.months >= 0) {
            var flipCardTopo = document.getElementById("flip-card-top-o");
            var flipCardBottomo = document.getElementById("flip-card-bottom-o");
            monthsSpan[0].innerHTML = ("0" + t.months).slice(-2);
            animateCountdown(flipCardTopo, flipCardBottomo, monthsSpanFlip[0], monthsSpan[1], t.months);
            monthsSpanFlip[1].innerHTML = ("0" + t.months).slice(-2);
        }
        // Stops the countdown when it reaches zero
        if (t.total <= 0) {
            clearInterval(timeInterval);
        }
    };
    timeInterval = setInterval(function () {
        updateClock();
    }, 1000);
};
//
var setDeadline = function (_a) {
    var months = _a.months, days = _a.days, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
    return new Date(new Date().getTime() +
        months * 2592000000 +
        days * 86400000 +
        hours * 3600000 +
        minutes * 60000 +
        seconds * 1000).toISOString();
};
