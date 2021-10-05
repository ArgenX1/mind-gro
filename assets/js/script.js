var sentence;
var pulledTone;
var pulledDailyQuote;


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
function setJournalData () {

}