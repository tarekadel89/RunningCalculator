const mile = 1.60934;
const km = 1;
const halfMarathon = 21.0975;
const marathon = 42.195;

let distance = 0;
let timeHours = 0;
let timeMinutes = 0;
let totalTime = 0;
let secondsSplit = 0;
let minutesSplit = 0;
let extraSeconds = 0;

const goggingsAudio = new Audio("audio/Goggins.mp3");
const wasaaAudio = new Audio("audio/Wasa3.mp3")


$(".halfMarathon").click(function () {
    distance = halfMarathon
    $(".distance").html("a half marathon");
    $(".customDistance").val("");
});

$(".marathon").click(function () {
    distance = marathon;
    $(".distance").html("a marathon");
    $(".customDistance").val("");
});

$("body").click(function () {
    if ($(".customDistance").val() !== "") {
        $(".distance").html($(".customDistance").val() + " " + $(".distanceUnit").val());
        distance = $(".customDistance").val();
        if ($(".distanceUnit").val() === "mi") {
            distance *= mile;
        }
    }

    if ($(".timeHours").val() !== "" || $(".timeMinutes").val() !== "") {
        if ($(".timeHours").val() !== "" && $(".timeMinutes").val() !== "") {
            $(".time").html($(".timeHours").val() + " hours and " + $(".timeMinutes").val() + " minutes");
            timeHours = Number($(".timeHours").val());
            timeMinutes = Number($(".timeMinutes").val());

        } else if ($(".timeHours").val() !== "") {
            $(".time").html($(".timeHours").val() + " hours");
            timeHours = Number($(".timeHours").val());
            timeMinutes = 0;
        } else if ($(".timeMinutes").val() !== "") {
            $(".time").html($(".timeMinutes").val() + " minutes");
            timeHours = 0;
            timeMinutes = Number($(".timeMinutes").val());
        }

        totalTime = (timeHours * 60 * 60) + (timeMinutes * 60);
    }
});

$(".btn-primary").click(function () {

    if (distance === 0 || totalTime === 0) {
        $(".split").html("Please, select distance and time!");
        $(".split").addClass("error");
    }
    else {
        if ($(".distanceUnit").val() === "mi") {
            calculateSplit(mile);
        } else {
            calculateSplit(km);
        }

        $(".splitUnit").removeClass("hidden");
        $(".split").removeClass("error");
        playAudio();
    }

    $(".split").removeClass("hidden");

});

$(".splitUnitItem").click(function () {
    let selectedUnit = $(".splitUnitItem").html();
    $(".splitUnit").html(selectedUnit);

    if (selectedUnit === "mi") {
        calculateSplit(mile);
    } else {
        calculateSplit(km);
    }

});

function calculateSplit(factor) {
    secondsSplit = totalTime / (distance / factor);
    minutesSplit = Math.floor(secondsSplit / 60);
    extraSeconds = Math.ceil(secondsSplit % 60);

    if (factor === mile) {
        $(".splitUnit").html("mi");
        $(".splitUnitItem").html("km");
    } else {
        $(".splitUnit").html("km");
        $(".splitUnitItem").html("mi");
    }

    $(".split").html(`You need to maintain ${minutesSplit} minutes and ${extraSeconds} seconds per`);
}

function playAudio(){
    if(Math.floor(Math.random() * 2) === 0)
        goggingsAudio.play();
    else
        wasaaAudio.play();
}