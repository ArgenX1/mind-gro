var sentence;
var pulledTone;
var pulledDailyQuote;
var mindGro = {
    journalEntires: {
        text,
        emotion,
        journalDay
    },
    flowerStatus : {
        pedal1,
        pedal2,
        pedal3,
        pedal4,
        pedal5,
    }


}


//function to pull data for tone analyzer
function toneAnalzyer() {

    var apikey = "9pVWbtcmVEdbu4Qv0BINCyJ0lYmCnvqqrEyyl8TefSbb";
    var urlTone = "https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/36c3b631-55ee-484b-89b6-0921340ffe10/v3/tone?version=2017-09-21";

    $.ajax({
        type: "POST",
        url: urlTone,
        data: sentence,
        headers: {
            "Authorization": "Basic " + btoa("apikey:" + apikey),
            "Content-Type": "text/plain",
        },
    })
    .done(function (result) {
        pulledTone = result;
        console.log(result);
    })
    .fail(function (result) {
        console.log("Error: ");
        console.log(result);
    });
}


//function to get quote of the day
function dailyQuote() {
    fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    pulledDailyQuote = data;
    console.log(data);
  });
}

// from input given send out information
function setQuoteData() {
    
}

// 
function setJournalData() {

}

//function to save local storage
function saveLocalStorage() {
    if(mindGro !== undefined) {
    localStorage.setItem('mindGro', JSON.stringify(mindGro));
    }
}
//function to pull local storage
function getLocalStorage() {
    if(mindGro !== undefined)
    {
        //add later functions that will set up both the journal page and they the function that will set up the flower
    }
}

/* Jared - VARIABLES:
emotion: string of 'fear', 'sadness', 'joy', or 'anger'
currentLayer: int 1-5
*/
function renderLayer() {

}

const newButton = document.querySelector("#newButton");
const backButton = document.querySelector("#backButton")
const pageContent = document.querySelector(".page-content");
const newEntry = document.querySelector(".new-entry");
const padButton = document.querySelector(".pad-button");
const glow = document.querySelector(".glow")

padButton.addEventListener("mouseover", function() {
    glow.classList.remove("hidden");
});

padButton.addEventListener("mouseout", function() {
    glow.classList.add("hidden");
});

newButton.addEventListener("click", function() {
    pageContent.classList.add("hidden");
    newEntry.classList.remove("hidden");
    newButton.classList.add("hidden");
    backButton.classList.remove("hidden");
});

backButton.addEventListener("click", function() {
    pageContent.classList.remove("hidden");
    newEntry.classList.add("hidden");
    newButton.classList.remove("hidden");
    backButton.classList.add("hidden")
});

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});

$(document).scroll(function() {
    const pos = document.querySelector('.quote-card').getBoundingClientRect().top;
    // console.log(document.querySelector('.quote-card').getBoundingClientRect().bottom/*  - $(window).scrollTop() */);
    const inline = $('.inline-quote-card');
    if (inline.hasClass('hidden') && pos < 0){
        console.log('UNHIDING');
        inline.removeClass('hidden');
        inline.addClass("fix-card");
        $('.quote-card').addClass('invisible');
    } else if (!inline.hasClass('hidden') && pos >= 0) {
        inline.addClass('hidden');
        $('.quote-card').removeClass('invisible');
    }
});