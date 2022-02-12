const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("button");
const quoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

// show loading
function loading()
{
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// hide loading 
function complete(){
  loader.hidden = true;
  quoteContainer.hidden = false;
}

let apiQuotes = [];
//get a new quote
function newQuote() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  //check if author field is blank and replace it unknown
  if (!quote.author) {
    authorText.textContent = "unknown";
  } else {
    authorText.textContent = quote.author;
  }
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // set quote

  quoteText.textContent = quote.text;
  complete();
}
//check the quote length

// get quotes from api
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (e) {}
}
//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//event listeners
quoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click",tweetQuote);


//onLoad
getQuotes();

