if (!window.location.pathname.endsWith("vi") && window.location.hash.indexOf("ncr") == -1 && navigator.languages[0] && navigator.languages[0].startsWith("vi")) {
    window.location.href = "/chrome/vi";
}

var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

function appendLeadingZero(input) {
    return input < 10 ? "0" + input : input;
}

function showClock() {
    var now = new Date();

    // Clock
    var message = "Have a good night!";
    var hour = now.getHours();
    var minute = now.getMinutes();

    if (hour > 6 && hour < 12) {
        message = "Good Morning!";
    } else if (hour >= 12 && hour < 18) {
        message = "Good Afternoon!";
    } else if (hour >= 18 && hour <= 21) {
        message = "Good Evening!";
    }

    var textHour = hour < 10 ? "0" + hour : hour.toString();
    var textMinute = minute < 10 ? "0" + minute : minute.toString();

    $(".clock-welcome").html(message);
    $(".clock").html(appendLeadingZero(hour) + ":" + appendLeadingZero(minute));

    // Date
    var day = now.getDate();
    var month = now.getMonth();
    var year = now.getFullYear();

    $(".date").html(MONTH_NAMES[month] + " " + appendLeadingZero(day) + " " + year);

    window.setTimeout(showClock, 1000);
}

function showVerse(verse) {
    $(".verse").html(verse.text);
    $(".verse-address").html(verse.display_ref);
    $(".verse-address").attr("href", verse.permalink.replace("&amp;", "&"));
    $(".verse-version").html("(" + verse.version + ")");
}

$(function () {

    showClock();

    var webstoreUrl = $("[rel='chrome-webstore-item']").attr("href");
    $("#btn-install").click(function () {
        if (chrome && chrome.webstore) {
            chrome.webstore.install(undefined, function () {
                window.location.href = "/installed.html";
            }, function () {
                window.location.href = webstoreUrl;
            });
        } else {
            window.location.href = webstoreUrl;
        }
    });

});