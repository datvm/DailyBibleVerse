var dailyVerseUrl = "https://www.biblegateway.com/votd/get/?format=json&version=VIET";
var semicolon = true;
var verseLoaded = false;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

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
    } else if (hour < 18) {
        message = "Good Afternoon!";
    } else if (hour < 21) {
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

    $(".date").html(monthNames[month] + " " + appendLeadingZero(day) + " " + year);

    window.setTimeout(showClock, 1000);
}

function showVerse(verse) {
    $(".verse").html(verse.text);
    $(".verse-address").html(verse.display_ref);
    $(".verse-version").html("(" + verse.version + ")");
}

function loadVerse() {
    // Use local if available first
    chrome.storage.local.get("verse", function (storage) {
        if (verseLoaded) {
            return;
        }

        if (storage && storage.verse) {
            showVerse(storage.verse);
        }
    });

    // Call AJAX
    $.ajax({
        url: dailyVerseUrl
    }).then(function (data) {
        var votd = data.votd;

        showVerse(votd);
        verseLoaded = true;

        chrome.storage.local.set({ verse: votd });
    }).fail(function () {
        // Try again later
        window.setTimeout(loadVerse, 10000);
    });
}

$(function () {

    showClock();
    loadVerse();

});