var sentence;
var pulledTone;
var pulledDailyQuote;
var mindGro;


//function to pull data for tone analyzer
async function toneAnalzyer() {

    var apikey = "9pVWbtcmVEdbu4Qv0BINCyJ0lYmCnvqqrEyyl8TefSbb";
    var urlTone = "https://api.us-east.tone-analyzer.watson.cloud.ibm.com/instances/36c3b631-55ee-484b-89b6-0921340ffe10/v3/tone?version=2017-09-21";

    const tone = await $.ajax({
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
        return result;
    })
    .fail(function (result) {
        console.log("Error: ");
        console.log(pulledTone);
    });

    return tone;
}


//function to get quote of the day
function dailyQuote() {
    fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    pulledDailyQuote = data;
    setQuoteData();

  });
}

// from input given send out information
function setQuoteData() {
    var randomQuote = pulledDailyQuote[Math.floor(Math.random()*pulledDailyQuote.length)]

    $('#quote-text').text(randomQuote.text)
    $('#quote-author').text(" - " + randomQuote.author)
    if(randomQuote.author == null){
        $('#quote-author').text(" - Unknown")
    }
}

// 
function setJournalData() {
    getLocalStorage();
    if(mindGro !== undefined) {
        var journals = $("#journalPage").children().children().children('span');
            for (let i = 0; i < mindGro.journalEntry.length; i++) {
                journals.eq(i).text(mindGro.journalEntry[i].entry);
            }
    }
    else {return;}
}

//function to save local storage
function saveLocalStorage() {
    if(mindGro !== undefined) {
    localStorage.setItem('mindGro', JSON.stringify(mindGro));
    }
}

//function to pull local storage
function getLocalStorage() {
    mindGro = JSON.parse(window.localStorage.getItem('mindGro'));
    if(mindGro == undefined)
    {
        mindGro = {
            journalEntry: [],    
        }
        //add later functions that will set up both the journal page and they the function that will set up the flower
    }
}

// function to add new journal data
async function setJournalEntry() {
    $('#modal1').modal('close');
    sentence = $('#entry-page').val();
    if (!sentence) return;
    $('#entry-page').text("");
    await toneAnalzyer();

    const majorEmotion = getMajorEmotion();

    if (mindGro.journalEntry.length >= 5)
        { clearEntries() }

        mindGro.journalEntry[mindGro.journalEntry.length] = {
            entry: sentence,
            emotion: majorEmotion,
            journalDay: moment().format("M/D/YYYY")
        }
        console.log(mindGro.journalEntry.length);
    saveLocalStorage();
    renderLayer();
}

function clearEntries() {
    window.localStorage.removeItem('mindGro');
    resetRender();
    getLocalStorage();
}

function getMajorEmotion() {
    console.log(pulledTone);
    var emotion = pulledTone.document_tone.tones.length > 0 ? pulledTone.document_tone.tones[0].tone_id : "neutral";
    
    if(emotion == "joy" || emotion == "fear" || emotion == "sadness" || emotion == "anger"){
        return emotion;
    }

    return "neutral";
}

function init() {
    dailyQuote();
    setJournalData();
    renderLayer();
}

function renderLayer() {
    resetRender();
    for (var i = mindGro.journalEntry.length - 1; i >= 0; i--) {
        const img = document.createElement('div');
        const filePath = getFilePath(i + 1, mindGro.journalEntry[i].emotion);
        console.log(filePath);
        if (mindGro.journalEntry.length === 5 && i === 0) {
            img.innerHTML = `<img class="flower background" src="./assets/images/${mindGro.journalEntry[i].emotion}/bud-${mindGro.journalEntry[i].emotion}.png">`;
        } else {
            img.innerHTML = `<img class="flower background" src="${filePath}">`;
        }
        env.appendChild(img);
    }

    for (var i = 0; i < mindGro.journalEntry.length; i++) {
        const curEmotion = mindGro.journalEntry[i].emotion.toUpperCase();
        const entry = document.createElement('li');
        entry.classList.add('journal-entry');
        entry.innerHTML = `<div class="collapsible-header transparent">Day ${i + 1} - ${curEmotion}</div><div class="collapsible-body"><span>${mindGro.journalEntry[i].entry}</span></div>`;
        journalPage.appendChild(entry);
    }
}

function resetRender() {
    const entries = document.querySelectorAll(".journal-entry");
    const flowers = document.querySelectorAll(".flower");
    for (let i = 0; i < entries.length; i++) {
        entries[i].remove();
        //reset the flower im not sure how im going to do that yet probably just set href to ""
    }
    for (let i = 0; i < flowers.length; i++) {
        flowers[i].remove();
    }
}

function getFilePath(layer, tone) {
    return `./assets/images/${tone}/layer${layer}-${tone}.png`;
}

const newButton = document.querySelector("#newButton");
const backButton = document.querySelector("#backButton");
const pageContent = document.querySelector(".page-content");
const newEntry = document.querySelector(".new-entry");
const padButton = document.querySelector(".pad-button");
const glow = document.querySelector(".glow");
const env = document.querySelector("#env");
const clearButton = document.querySelector("#clear-btn");
const journalPage = document.querySelector("#journalPage");
const newEntryBtn = document.querySelector("#new-entry-btn");
const deleteBtnImg = document.querySelector('#delete-btn-img');

padButton.addEventListener("mouseover", function() {
    glow.classList.remove("hidden");
});

padButton.addEventListener("mouseout", function() {
    glow.classList.add("hidden");
});

padButton.addEventListener("click", function() {
    pageContent.classList.remove("hidden");
    newEntry.classList.add("hidden");
    newButton.classList.remove("hidden");
    newEntryBtn.classList.remove("hidden");
    deleteBtnImg.classList.remove("hidden");
    backButton.classList.add("hidden");
});

newButton.addEventListener("click", function() {
    pageContent.classList.add("hidden");
    newEntry.classList.remove("hidden");
    newButton.classList.add("hidden");
    newEntryBtn.classList.add("hidden");
    deleteBtnImg.classList.add("hidden");
    backButton.classList.remove("hidden");
});

backButton.addEventListener("click", function() {
    pageContent.classList.remove("hidden");
    newEntry.classList.add("hidden");
    newButton.classList.remove("hidden");
    newEntryBtn.classList.remove("hidden");
    deleteBtnImg.classList.remove("hidden");
    backButton.classList.add("hidden");
});

clearButton.addEventListener("click", clearEntries)

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems);
});

$('#intro').click(function() {
    this.modal();
});

$(document).ready(function(){
    $('#modal1').modal({endingTop:"5%"});
    $('#intro').modal();
});

$('#submitbtn').click(async function() {
    // pageContent.classList.remove("hidden");
    // newEntry.classList.add("hidden");
    // newButton.classList.remove("hidden");
    // backButton.classList.add("hidden");
    await setJournalEntry();
});

// $('.exit').click(function() {
//     pageContent.classList.remove("hidden");
//     newEntry.classList.add("hidden");
//     newButton.classList.remove("hidden");
//     backButton.classList.add("hidden");
// });

init();
