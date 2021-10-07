var sentence;
var pulledTone;
var pulledDailyQuote;
// var mindGro = [
//     {
//         text,
//         emotion,
//         journalDay
//     },
// }

var mindGro = [
    {
        emotion: 'joy'
    },
    {
        emotion: 'anger'
    },
    {
        emotion: 'joy'
    },
    {
        emotion: 'anger'
    }
];


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
        console.log(pulledTone);
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
    console.log(data);
  });
}

// from input given send out information
function setQuoteData() {
    var randomQuote = pulledDailyQuote[Math.floor(Math.random()*pulledDailyQuote.length)]
    console.log(randomQuote);
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
                //reset the flower im not sure how im going to do that yet
            
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
    console.log("HELLO");
    sentence = $('#entry-page').val();
    $('#entry-page').html("");
    await toneAnalzyer();

    if (mindGro.journalEntry.length >= 5)
        { resetData()}
        console.log(mindGro.journalEntry.length);
        mindGro.journalEntry[mindGro.journalEntry.length] = {
            entry: sentence,
            emotion: getMajorEmotion(),
            journalDay: moment().format("M/D/YYYY")
        }
        console.log(mindGro.journalEntry.length);
    var journals = $("#journalPage").children().children().children('span');
    journals.eq(mindGro.journalEntry.length-1).text(mindGro.journalEntry[mindGro.journalEntry.length-1].entry);
    saveLocalStorage();
}

// resets local storage and displays
function resetData() {
            window.localStorage.removeItem('mindGro');
            var journals = $("#journalPage").children().children().children('span');
            for (let i = 0; i < journals.length; i++) {
                journals.eq(i).text("");
                //reset the flower im not sure how im going to do that yet probably just set href to ""
            }
            getLocalStorage();
}



function getMajorEmotion() {
    var emotion = pulledTone.document_tone.tones.length > 0 ? pulledTone.document_tone.tones[0].tone_id : "default";
    
    if(emotion == "joy" || emotion == "fear" || emotion == "sadness" || emotion == "anger" || emotion == "default"){
        return emotion;
    }
}
function init() {
    dailyQuote();
    setJournalData();
}
/* Jared - VARIABLES:
emotion: string of 'fear', 'sadness', 'joy', or 'anger'
currentLayer: int 1-5
*/
function renderLayer() {
    for (var i = mindGro.length - 1; i >= 0; i--) {
        const img = document.createElement('div');
        const filePath = getFilePath(i + 1, mindGro[i].emotion);
        console.log(filePath);
        img.innerHTML = `<img class="flower" src="${filePath}">`;
        env.appendChild(img);
    }

    const img = document.createElement('div');
    img.innerHTML = '<img class="flower" src="./assets/images/middle.png">';
    env.appendChild(img);
}

function getFilePath(layer, tone) {
    return `./assets/images/${tone}/layer${layer}-${tone}.png`;
}

const newButton = document.querySelector("#newButton");
const backButton = document.querySelector("#backButton")
const pageContent = document.querySelector(".page-content");
const newEntry = document.querySelector(".new-entry");
const padButton = document.querySelector(".pad-button");
const glow = document.querySelector(".glow")
const env = document.querySelector("#env");

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

$('#intro').click(function() {
    this.modal();
});

$(document).ready(function(){
    $('#modal1').modal({endingTop:"5%"});
    $('#intro').modal();
  });

$('#submitbtn').click(setJournalEntry);

renderLayer();
init();
