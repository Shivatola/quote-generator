const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote-text');
const author=document.getElementById('author');
const twitterBtn=document.getElementById('twitter-button');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');
let apiQuotes=[];



// Show loading
function loading()
{ loader.hidden=false;
  quoteContainer.hidden=true;
} 
// Hide loading
function complete()
{ quoteContainer.hidden=false;
  loader.hidden=true;
} 



// Show new quote
function newQuote(){
        
        loading();
        // Pick a random quote from Quotes Array.
        const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

        // console.log(quote);
        quoteText.textContent=quote.text;

        //Check if the Author is unknown
        if(!quote.author) author.textContent='Unknown';
        else author.textContent=quote.author; 

        // Check the Quote length to determine styling
        if(quote.text.length > 50) { quoteText.classList.add('long-quote');}
        else { quoteText.classList.remove('long-quote'); }
        // Set quote,hide loader 
        complete();
}

// Get quotes from API
async function getQuotes()
{
    loading();
    const apiURL="https://type.fit/api/quotes";
    try{
        const response=await fetch(apiURL);
        apiQuotes=await response.json();
        newQuote();
    }catch(error)
    {
        // Catch error here
    }
}

// Tweet quote

function tweetQuote()
{
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent}-${author.textContent}`;
    window.open(twitterUrl,'_blank');
}

// Event listeners
newQuoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);

// On Load
 getQuotes(); 
