var sentence;
var pulledTone;
var pulledDailyQuote;
// var mindGro = {
//     journalEntry: [{
//         text,
//         emotion,
//         journalDay
//     }],
//     flowerStatus : [{
//         pedalTone
//     }],
//        ifVisited,
//        current,
// }


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
        pulledTone = result
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

// function to add new journal data
function setJournalEntry() {
    sentence = $('#entry-page').val();
    toneAnalzyer();
    if (mindGro.journalEntry.length >= 5)
        { resetData()}
    else {
        mindGro.journalEntry[mindGro.journalEntry.length] = {
            text: sentence,
            emotion: getMajorEmotion(),
            journalDay: moment().format("M/D/YYYY")
        }
    }
    var journals = $("#journalPage").children().children().children('span');
    journals[mindGro.journalEntry.length-1].text(mindGro.journalEntry[mindGro.journalEntry.length-1].text);
    console.log(journals);

}
// resets local storage and displays
function resetData() {

}



function getMajorEmotion() {
    var emotion = pulledTone.document_tone.tones[0].tone_id;
    if(emotion == "joy" || emotion == "fear" || emotion == "sadness" || emotion == "anger"){
        return emotion;
    }
    
}

const newButton = document.querySelector("#newButton");
const backButton = document.querySelector("#backButton")
const pageContent = document.querySelector(".page-content");
const newEntry = document.querySelector(".new-entry");

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
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
  });

  setJournalEntry();