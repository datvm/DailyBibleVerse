var dailyVerseUrl = "https://www.biblegateway.com/votd/get/?format=json&version={version}";
var semicolon = true;
var verseLoaded = false;

var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",];

var VERSIONS_LANGUAGES = { "Amuzgo de Guerrero (AMU)": [{ "Code": "AMU", "Name": "Amuzgo de Guerrero (AMU)" }], "العربية (AR)": [{ "Code": "ERV-AR", "Name": "Arabic Bible: Easy-to-Read Version (ERV-AR)" }, { "Code": "NAV", "Name": "Ketab El Hayat (NAV)" }], "अवधी (AWA)": [{ "Code": "ERV-AWA", "Name": "Awadhi Bible: Easy-to-Read Version (ERV-AWA)" }], "Български (BG)": [{ "Code": "BG1940", "Name": "1940 Bulgarian Bible (BG1940)" }, { "Code": "BULG", "Name": "Bulgarian Bible (BULG)" }, { "Code": "ERV-BG", "Name": "Bulgarian New Testament: Easy-to-Read Version (ERV-BG)" }, { "Code": "CBT", "Name": "Библия, нов превод от оригиналните езици (с неканоничните книги) (CBT)" }, { "Code": "BOB", "Name": "Библия, синодално издание (BOB)" }, { "Code": "BPB", "Name": "Библия, ревизирано издание (BPB)" }], "Chinanteco de Comaltepec (CCO)": [{ "Code": "CCO", "Name": "Chinanteco de Comaltepec (CCO)" }], "Cebuano (CEB)": [{ "Code": "APSD-CEB", "Name": "Ang Pulong Sa Dios (APSD-CEB)" }], "ᏣᎳᎩ ᎦᏬᏂᎯᏍ (CHR)": [{ "Code": "CHR", "Name": "Cherokee New Testament (CHR)" }], "Cakchiquel Occidental (CKW)": [{ "Code": "CKW", "Name": "Cakchiquel Occidental (CKW)" }], "Čeština (CS)": [{ "Code": "B21", "Name": "Bible 21 (B21)" }, { "Code": "SNC", "Name": "Slovo na cestu (SNC)" }], "Cymraeg (CY)": [{ "Code": "BWM", "Name": "Beibl William Morgan (BWM)" }], "Dansk (DA)": [{ "Code": "BPH", "Name": "Bibelen på hverdagsdansk (BPH)" }, { "Code": "DN1933", "Name": "Dette er Biblen på dansk (DN1933)" }], "Deutsch (DE)": [{ "Code": "HOF", "Name": "Hoffnung für Alle (HOF)" }, { "Code": "LUTH1545", "Name": "Luther Bibel 1545 (LUTH1545)" }, { "Code": "NGU-DE", "Name": "Neue Genfer Übersetzung (NGU-DE)" }, { "Code": "SCH1951", "Name": "Schlachter 1951 (SCH1951)" }, { "Code": "SCH2000", "Name": "Schlachter 2000 (SCH2000)" }], "English (EN)": [{ "Code": "KJ21", "Name": "21st Century King James Version (KJ21)" }, { "Code": "ASV", "Name": "American Standard Version (ASV)" }, { "Code": "AMP", "Name": "Amplified Bible (AMP)" }, { "Code": "AMPC", "Name": "Amplified Bible, Classic Edition (AMPC)" }, { "Code": "BRG", "Name": "BRG Bible (BRG)" }, { "Code": "CEB", "Name": "Common English Bible (CEB)" }, { "Code": "CJB", "Name": "Complete Jewish Bible (CJB)" }, { "Code": "CEV", "Name": "Contemporary English Version (CEV)" }, { "Code": "DARBY", "Name": "Darby Translation (DARBY)" }, { "Code": "DLNT", "Name": "Disciples’ Literal New Testament (DLNT)" }, { "Code": "DRA", "Name": "Douay-Rheims 1899 American Edition (DRA)" }, { "Code": "ERV", "Name": "Easy-to-Read Version (ERV)" }, { "Code": "ESV", "Name": "English Standard Version (ESV)" }, { "Code": "ESVUK", "Name": "English Standard Version Anglicised (ESVUK)" }, { "Code": "EXB", "Name": "Expanded Bible (EXB)" }, { "Code": "GNV", "Name": "1599 Geneva Bible (GNV)" }, { "Code": "GW", "Name": "GOD’S WORD Translation (GW)" }, { "Code": "GNT", "Name": "Good News Translation (GNT)" }, { "Code": "HCSB", "Name": "Holman Christian Standard Bible (HCSB)" }, { "Code": "ICB", "Name": "International Children’s Bible (ICB)" }, { "Code": "ISV", "Name": "International Standard Version (ISV)" }, { "Code": "PHILLIPS", "Name": "J.B. Phillips New Testament (PHILLIPS)" }, { "Code": "JUB", "Name": "Jubilee Bible 2000 (JUB)" }, { "Code": "KJV", "Name": "King James Version (KJV)" }, { "Code": "AKJV", "Name": "Authorized (King James) Version (AKJV)" }, { "Code": "LEB", "Name": "Lexham English Bible (LEB)" }, { "Code": "TLB", "Name": "Living Bible (TLB)" }, { "Code": "MSG", "Name": "The Message (MSG)" }, { "Code": "MEV", "Name": "Modern English Version (MEV)" }, { "Code": "MOUNCE", "Name": "Mounce Reverse-Interlinear New Testament (MOUNCE)" }, { "Code": "NOG", "Name": "Names of God Bible (NOG)" }, { "Code": "NABRE", "Name": "New American Bible (Revised Edition) (NABRE)" }, { "Code": "NASB", "Name": "New American Standard Bible (NASB)" }, { "Code": "NCV", "Name": "New Century Version (NCV)" }, { "Code": "NET", "Name": "New English Translation (NET Bible)" }, { "Code": "NIRV", "Name": "New International Reader's Version (NIRV)" }, { "Code": "NIV", "Name": "New International Version (NIV)" }, { "Code": "NIVUK", "Name": "New International Version - UK (NIVUK)" }, { "Code": "NKJV", "Name": "New King James Version (NKJV)" }, { "Code": "NLV", "Name": "New Life Version (NLV)" }, { "Code": "NLT", "Name": "New Living Translation (NLT)" }, { "Code": "NRSV", "Name": "New Revised Standard Version (NRSV)" }, { "Code": "NRSVA", "Name": "New Revised Standard Version, Anglicised (NRSVA)" }, { "Code": "NRSVACE", "Name": "New Revised Standard Version, Anglicised Catholic Edition (NRSVACE)" }, { "Code": "NRSVCE", "Name": "New Revised Standard Version Catholic Edition (NRSVCE)" }, { "Code": "NTE", "Name": "New Testament for Everyone (NTE)" }, { "Code": "OJB", "Name": "Orthodox Jewish Bible (OJB)" }, { "Code": "RSV", "Name": "Revised Standard Version (RSV)" }, { "Code": "RSVCE", "Name": "Revised Standard Version Catholic Edition (RSVCE)" }, { "Code": "TLV", "Name": "Tree of Life Version (TLV)" }, { "Code": "VOICE", "Name": "The Voice (VOICE)" }, { "Code": "WEB", "Name": "World English Bible (WEB)" }, { "Code": "WE", "Name": "Worldwide English (New Testament) (WE)" }, { "Code": "WYC", "Name": "Wycliffe Bible (WYC)" }, { "Code": "YLT", "Name": "Young's Literal Translation (YLT)" }], "Español (ES)": [{ "Code": "LBLA", "Name": "La Biblia de las Américas (LBLA)" }, { "Code": "DHH", "Name": "Dios Habla Hoy (DHH)" }, { "Code": "JBS", "Name": "Jubilee Bible 2000 (Spanish) (JBS)" }, { "Code": "NBD", "Name": "Nueva Biblia al Día (NBD)" }, { "Code": "NBLH", "Name": "Nueva Biblia Latinoamericana de Hoy (NBLH)" }, { "Code": "NTV", "Name": "Nueva Traducción Viviente (NTV)" }, { "Code": "NVI", "Name": "Nueva Versión Internacional (NVI)" }, { "Code": "CST", "Name": "Nueva Versión Internacional (Castilian) (CST)" }, { "Code": "PDT", "Name": "Palabra de Dios para Todos (PDT)" }, { "Code": "BLP", "Name": "La Palabra (España) (BLP)" }, { "Code": "BLPH", "Name": "La Palabra (Hispanoamérica) (BLPH)" }, { "Code": "RVA-2015", "Name": "Reina Valera Actualizada (RVA-2015)" }, { "Code": "RVC", "Name": "Reina Valera Contemporánea (RVC)" }, { "Code": "RVR1960", "Name": "Reina-Valera 1960 (RVR1960)" }, { "Code": "RVR1977", "Name": "Reina Valera 1977 (RVR1977)" }, { "Code": "RVR1995", "Name": "Reina-Valera 1995 (RVR1995)" }, { "Code": "RVA", "Name": "Reina-Valera Antigua (RVA)" }, { "Code": "SRV-BRG", "Name": "Spanish Blue Red and Gold Letter Edition (SRV-BRG)" }, { "Code": "TLA", "Name": "Traducción en lenguaje actual (TLA)" }], "Suomi (FI)": [{ "Code": "R1933", "Name": "Raamattu 1933/38 (R1933)" }], "Français (FR)": [{ "Code": "BDS", "Name": "La Bible du Semeur (BDS)" }, { "Code": "LSG", "Name": "Louis Segond (LSG)" }, { "Code": "NEG1979", "Name": "Nouvelle Edition de Genève – NEG1979 (NEG1979)" }, { "Code": "SG21", "Name": "Segond 21 (SG21)" }], "Κοινη (GRC)": [{ "Code": "TR1550", "Name": "1550 Stephanus New Testament (TR1550)" }, { "Code": "WHNU", "Name": "1881 Westcott-Hort New Testament (WHNU)" }, { "Code": "TR1894", "Name": "1894 Scrivener New Testament (TR1894)" }, { "Code": "SBLGNT", "Name": "SBL Greek New Testament (SBLGNT)" }], "עברית (HE)": [{ "Code": "HHH", "Name": "Habrit Hakhadasha/Haderekh (HHH)" }, { "Code": "WLC", "Name": "The Westminster Leningrad Codex (WLC)" }], "हिन्दी (HI)": [{ "Code": "ERV-HI", "Name": "Hindi Bible: Easy-to-Read Version (ERV-HI)" }], "Ilonggo (HIL)": [{ "Code": "HLGN", "Name": "Ang Pulong Sang Dios (HLGN)" }], "Hrvatski (HR)": [{ "Code": "HNZ-RI", "Name": "Hrvatski Novi Zavjet – Rijeka 2001 (HNZ-RI)" }, { "Code": "CRO", "Name": "Knijga O Kristu (CRO)" }], "Kreyòl ayisyen (HT)": [{ "Code": "HCV", "Name": "Haitian Creole Version (HCV)" }], "Magyar (HU)": [{ "Code": "KAR", "Name": "Hungarian Károli (KAR)" }, { "Code": "ERV-HU", "Name": "Hungarian Bible: Easy-to-Read Version (ERV-HU)" }, { "Code": "NT-HU", "Name": "Hungarian New Translation (NT-HU)" }], "Hawai‘i Pidgin (HWC)": [{ "Code": "HWP", "Name": "Hawai‘i Pidgin (HWP)" }], "Íslenska (IS)": [{ "Code": "ICELAND", "Name": "Icelandic Bible (ICELAND)" }], "Italiano (IT)": [{ "Code": "BDG", "Name": "La Bibbia della Gioia (BDG)" }, { "Code": "CEI", "Name": "Conferenza Episcopale Italiana (CEI)" }, { "Code": "LND", "Name": "La Nuova Diodati (LND)" }, { "Code": "NR1994", "Name": "Nuova Riveduta 1994 (NR1994)" }, { "Code": "NR2006", "Name": "Nuova Riveduta 2006 (NR2006)" }], "Jacalteco, Oriental (JAC)": [{ "Code": "JAC", "Name": "Jacalteco, Oriental (JAC)" }], "Kekchi (KEK)": [{ "Code": "KEK", "Name": "Kekchi (KEK)" }], "Latina (LA)": [{ "Code": "VULGATE", "Name": "Biblia Sacra Vulgata (VULGATE)" }], "Māori (MI)": [{ "Code": "MAORI", "Name": "Maori Bible (MAORI)" }], "Македонски (MK)": [{ "Code": "MNT", "Name": "Macedonian New Testament (MNT)" }], "मराठी (MR)": [{ "Code": "ERV-MR", "Name": "Marathi Bible: Easy-to-Read Version (ERV-MR)" }], "Mam, Central (MVC)": [{ "Code": "MVC", "Name": "Mam, Central (MVC)" }], "Mam, Todos Santos (MVJ)": [{ "Code": "MVJ", "Name": "Mam de Todos Santos Chuchumatán (MVJ)" }], "Plautdietsch (NDS)": [{ "Code": "REIMER", "Name": "Reimer 2001 (REIMER)" }], "नेपाली (NE)": [{ "Code": "ERV-NE", "Name": "Nepali Bible: Easy-to-Read Version (ERV-NE)" }], "Náhuatl de Guerrero (NGU)": [{ "Code": "NGU", "Name": "Náhuatl de Guerrero (NGU)" }], "Nederlands (NL)": [{ "Code": "HTB", "Name": "Het Boek (HTB)" }], "Norsk (NO)": [{ "Code": "DNB1930", "Name": "Det Norsk Bibelselskap 1930 (DNB1930)" }, { "Code": "LB", "Name": "En Levende Bok (LB)" }], "ଓଡ଼ିଆ (OR)": [{ "Code": "ERV-OR", "Name": "Oriya Bible: Easy-to-Read Version (ERV-OR)" }], "ਪੰਜਾਬੀ (PA)": [{ "Code": "ERV-PA", "Name": "Punjabi Bible: Easy-to-Read Version (ERV-PA)" }], "Polski (PL)": [{ "Code": "NP", "Name": "Nowe Przymierze (NP)" }, { "Code": "SZ-PL", "Name": "Słowo Życia (SZ-PL)" }, { "Code": "UBG", "Name": "Updated Gdańsk Bible (UBG)" }], "Nawat (PPL)": [{ "Code": "NBTN", "Name": "Ne Bibliaj Tik Nawat (NBTN)" }], "Português (PT)": [{ "Code": "ARC", "Name": "Almeida Revista e Corrigida 2009 (ARC)" }, { "Code": "NTLH", "Name": "Nova Traduҫão na Linguagem de Hoje 2000 (NTLH)" }, { "Code": "NVI-PT", "Name": "Nova Versão Internacional (NVI-PT)" }, { "Code": "OL", "Name": "O Livro (OL)" }, { "Code": "VFL", "Name": "Portuguese New Testament: Easy-to-Read Version (VFL)" }], "Quichua (QU)": [{ "Code": "MTDS", "Name": "Mushuj Testamento Diospaj Shimi (MTDS)" }], "Quiché, Centro Occidenta (QUT)": [{ "Code": "QUT", "Name": "Quiché, Centro Occidental (QUT)" }], "Română (RO)": [{ "Code": "RMNN", "Name": "Cornilescu 1924 - Revised 2010, 2014 (RMNN)" }, { "Code": "NTLR", "Name": "Nouă Traducere În Limba Română (NTLR)" }], "Русский (RU)": [{ "Code": "NRT", "Name": "New Russian Translation (NRT)" }, { "Code": "CARS", "Name": "Священное Писание (Восточный Перевод) (CARS)" }, { "Code": "CARST", "Name": "Священное Писание (Восточный перевод), версия для Таджикистана (CARST)" }, { "Code": "CARSA", "Name": "Священное Писание (Восточный перевод), версия с «Аллахом» (CARSA)" }, { "Code": "ERV-RU", "Name": "Russian New Testament: Easy-to-Read Version (ERV-RU)" }, { "Code": "RUSV", "Name": "Russian Synodal Version (RUSV)" }], "Slovenčina (SK)": [{ "Code": "NPK", "Name": "Nádej pre kazdého (NPK)" }], "Somali (SO)": [{ "Code": "SOM", "Name": "Somali Bible (SOM)" }], "Shqip (SQ)": [{ "Code": "ALB", "Name": "Albanian Bible (ALB)" }], "Српски (SR)": [{ "Code": "ERV-SR", "Name": "Serbian New Testament: Easy-to-Read Version (ERV-SR)" }], "Svenska (SV)": [{ "Code": "SVL", "Name": "Nya Levande Bibeln (SVL)" }, { "Code": "SV1917", "Name": "Svenska 1917 (SV1917)" }, { "Code": "SFB", "Name": "Svenska Folkbibeln (SFB)" }, { "Code": "SFB15", "Name": "Svenska Folkbibeln 2015 (SFB15)" }], "Kiswahili (SW)": [{ "Code": "SNT", "Name": "Neno: Bibilia Takatifu (SNT)" }], "தமிழ் (TA)": [{ "Code": "ERV-TA", "Name": "Tamil Bible: Easy-to-Read Version (ERV-TA)" }], "ภาษาไทย (TH)": [{ "Code": "TNCV", "Name": "Thai New Contemporary Bible (TNCV)" }, { "Code": "ERV-TH", "Name": "Thai New Testament: Easy-to-Read Version (ERV-TH)" }], "Tagalog (TL)": [{ "Code": "FSV", "Name": "Ang Bagong Tipan: Filipino Standard Version (FSV)" }, { "Code": "ADB1905", "Name": "Ang Dating Biblia (1905) (ADB1905)" }, { "Code": "SND", "Name": "Ang Salita ng Diyos (SND)" }, { "Code": "MBBTAG", "Name": "Magandang Balita Biblia (MBBTAG)" }], "Twi (TWI)": [{ "Code": "NA-TWI", "Name": "Nkwa Asem (NA-TWI)" }], "Українська (UK)": [{ "Code": "UKR", "Name": "Ukrainian Bible (UKR)" }, { "Code": "ERV-UK", "Name": "Ukrainian New Testament: Easy-to-Read Version (ERV-UK)" }], "اردو (UR)": [{ "Code": "ERV-UR", "Name": "Urdu Bible: Easy-to-Read Version (ERV-UR)" }], "Uspanteco (USP)": [{ "Code": "USP", "Name": "Uspanteco (USP)" }], "Tiêng Viêt (VI)": [{ "Code": "VIET", "Name": "1934 Vietnamese Bible (VIET)" }, { "Code": "BD2011", "Name": "Bản Dịch 2011 (BD2011)" }, { "Code": "NVB", "Name": "New Vietnamese Bible (NVB)" }, { "Code": "BPT", "Name": "Vietnamese Bible: Easy-to-Read Version (BPT)" }] }

var MAX_FILE_SIZE = 3.2 * 1024 * 1024;
var TEXT_SHADOW_TEMPLATE = "0 0 20px {0}";

var settings;

function appendLeadingZero(input) {
    return input < 10 ? "0" + input : input;
}

function showClock() {
    var now = new Date();

    //now = new Date(2018, 9, 1, 14, 25, 1);

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

    var halfDay = hour < 12 ? "AM" : "PM";

    if (!settings || !settings.ClockFormat) {
        settings = settings || {};
        settings.ClockFormat = "13";
    }

    switch (settings.ClockFormat) {
        case "1PM":
            hour %= 12;
            break;
        case "1":
            hour %= 12;
            halfDay = "";
            break;
        case "13":
        default:
            halfDay = "";
            break;
    }

    $(".clock-welcome").html(message);
    $(".clock").html(appendLeadingZero(hour) + ":" + appendLeadingZero(minute) + halfDay);

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
        url: dailyVerseUrl.replace("{version}", settings.Version),
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

function populateBibleLanguages() {
    var cboLanguages = $("#cbo-languages");

    cboLanguages.html("");
    for (var key in VERSIONS_LANGUAGES) {
        var opt = $("<option value='" + key + "'>" + key + "</option>");

        if (key == settings.Language) {
            opt.prop("selected", true);
        }

        cboLanguages.append(opt);
    }

    populateBibleVersions();

    $("#cbo-languages").change(function () { populateBibleVersions(); });
}

function populateBibleVersions() {
    var language = $("#cbo-languages").find("option:selected").val();

    var versions = VERSIONS_LANGUAGES[language];
    var cboVersions = $("#cbo-versions");
    cboVersions.html("");
    for (var i = 0; i < versions.length; i++) {
        var version = versions[i];
        var opt = $("<option value='" + version.Code + "'>" + version.Name + "</option>");

        if (version.Code == settings.Version) {
            opt.prop("selected", true);
        }

        cboVersions.append(opt);
    }
}

function loadSettings(callback) {
    chrome.storage.local.get("settings", function (storage) {
        if (!storage || !storage.settings) {
            settings = {};

            chrome.storage.local.set({ settings: settings });
        } else {
            settings = storage.settings;
        }

        settings.Language = settings.Language || "English (EN)";
        settings.Version = settings.Version || "NIV";
        settings.TextColor = settings.TextColor || "#FFFFFFFF";
        settings.ShadowColor = settings.ShadowColor || "#FF424242";
        settings.FontWeight = settings.FontWeight || "normal";
        settings.ClockSettings = settings.ClockSettings || "13";

        chrome.storage.local.set({ settings: settings });

        callback();
    });
}

function setBackground() {
    if (settings.Background) {
        $(".page-background").css("background", settings.Background);
    } else {
        $(".page-background").css("background", "url(/img/background.jpg)");
    }
    $(".page-background").css("background-size", "cover");
    $(".page-background").css("background-position", "center center");

}

function saveSettings() {
    settings.Language = $("#cbo-languages").find("option:selected").val();
    settings.Version = $("#cbo-versions").find("option:selected").val();
    settings.TextColor = $("#txt-text-color").val();
    settings.ShadowColor = $("#txt-text-shadow-color").val();
    settings.FontWeight = $("input[name='opt-font-weight']:checked").val();
    settings.ClockSettings = $("input[name='opt-clock-format']:checked").val();

    chrome.storage.local.set({ settings: settings });

    loadVerse();
    setBackground();
    setTextSettings();
}

function readWallpaper(file) {
    if (file.size > MAX_FILE_SIZE) {
        alert("Sorry, the image file is too large. Please resize the image, below 3.2MB (recommend biggest file is your screen resolution, can be 1366x768 or 1920x1080)");

        return;
    }

    var reader = new FileReader();
    reader.addEventListener("load", function () {
        settings.Background = "url(" + reader.result + ")";
        saveSettings();
    }, false);

    if (file) {
        reader.readAsDataURL(file);
    }
}

function setTextSettings() {
    $("#txt-text-color").val(settings.TextColor);
    $("#txt-text-shadow-color").val(settings.ShadowColor);
    $("input[name='opt-font-weight'][value='" + settings.FontWeight + "']").prop("checked", true);

    $(".text-shadow").css("text-shadow", TEXT_SHADOW_TEMPLATE.replace("{0}", settings.ShadowColor));
    $(".text-shadow").css("color", settings.TextColor);
    $(".text-shadow").css("font-weight", settings.FontWeight);
}

function onTextColorChoose(color) {
    color = color || $(this).val();
    $(".text-shadow").css("color", color);
}

function onTextShadowChoose(color) {
    color = color || $(this).val();

    $(".text-shadow").css("text-shadow", TEXT_SHADOW_TEMPLATE.replace("{0}", color));
}

function onFontWeightSelected() {
    if ($(this).prop("checked")) {
        $(".text-shadow").css("font-weight", $(this).val());
    }
}

function onClockFormatSelected() {
    if ($(this).prop("checked")) {
        settings.ClockFormat = $(this).val();
    }
}

$(function () {

    showClock();
    loadSettings(function () {
        setBackground();
        populateBibleLanguages();
        loadVerse();
        setTextSettings();
        $("[name='opt-clock-format'][value='" + settings.ClockFormat + "']").prop("checked", true)

        $("#txt-text-color").each(function () {
            $(this).spectrum({
                color: $(this).val(),
                showAlpha: true,
                preferredFormat: "rgb",
                move: onTextColorChoose,
            });
        });

        $("#txt-text-shadow-color").each(function () {
            $(this).spectrum({
                color: $(this).val(),
                showAlpha: true,
                preferredFormat: "rgb",
                move: onTextShadowChoose,
            });
        });

    });

    $("#btn-show-menu").click(function () { $("#diag-menu").removeClass("hidden"); event.preventDefault(); })
    $("#btn-close-menu").click(function () { $("#diag-menu").addClass("hidden"); event.preventDefault(); });
    $("#btn-save").click(function () { saveSettings(); $("#diag-menu").addClass("hidden"); event.preventDefault(); })

    $("#btn-default-background").click(function () {
        settings.Background = null;
        saveSettings();
        event.preventDefault();
    });

    $("#btn-wallpaper").click(function () {
        $("#txt-wallpaper").click();
        event.preventDefault();
    });

    $("#txt-wallpaper").change(function () {
        if (this.files && this.files.length > 0) {
            readWallpaper(this.files[0]);
        }
    });

    $("[data-setting-color]").each(function () {
        var e = $(this);

        e.css("background-color", e.attr("data-setting-color"));
    });

    $(".setting-colors").on("click", "[data-setting-color]", function () {
        settings.Background = $(this).attr("data-setting-color");
        saveSettings();
    });
    $("#txt-text-color").on("change", onTextColorChoose);
    $("#txt-text-shadow-color").on("change", onTextShadowChoose);

    $("input[name='opt-font-weight']").change(onFontWeightSelected);
    $("input[name='opt-clock-format']").change(onClockFormatSelected);
});