/* eslint-disable max-len */
// eslint-disable-next-line no-unused-vars
const projectName = 'random-quote-machine';
let quotesData;

/*
  Code by Gabriel Nunes
  Modified by Todd Chaffee to use Camper gist for JSON Quote data.
*/

var colors = [
  '#D5CEA3',
  '#F0997D',
  '#DFD3C3',
  '#46C2CB',
  '#FFDCA9',
  '#FCF9BE',
  '#FB6964',
  '#F49D1A',
  '#FF9F9F',
  '#BDBB99',
  '#FFAE6D',
  '#FFD8A9'
];
var currentQuote = '',
  currentAuthor = '';

function getQuotes() {
  return $.ajax({
    headers: {
      Accept: 'application/json'
    },
    url: 'https://gist.githubusercontent.com/demapuspita/e8fb30b19f9be4670d8ed1d907159e3e/raw/48f0100d975382f185aa748f3e33d39cb653a4e7/motivational.json',
    success: function (jsonQuotes) {
      if (typeof jsonQuotes === 'string') {
        quotesData = JSON.parse(jsonQuotes);
        console.log('quotesData');
        console.log(quotesData);
      }
    }
  });
}

function getRandomQuote() {
  return quotesData.quotes[
    Math.floor(Math.random() * quotesData.quotes.length)
  ];
}

function getQuote() {
  let randomQuote = getRandomQuote();

  currentQuote = randomQuote.quote;
  currentAuthor = randomQuote.author;


  $('.quote-text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(randomQuote.quote);
  });

  $('.quote-author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').html(randomQuote.author);
  });

  var color = Math.floor(Math.random() * colors.length);
  $('html body').animate(
    {
      backgroundColor: colors[color],
      color: colors[color]
    },
    1000
  );
  $('.btn').animate(
    {
      backgroundColor: colors[color]
    },
    1000
  );
}

$(document).ready(function () {
  getQuotes().then(() => {
    getQuote();
  });

  $('#new-quote').on('click', getQuote);
});
