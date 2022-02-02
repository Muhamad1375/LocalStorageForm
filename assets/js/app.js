//Variables

const tweetList = document.getElementById('tweet-list');

//Event Listener

eventListener();
function eventListener() {

      //Form Submission
      document.querySelector('#form').addEventListener('submit', newTweet);

      //remoce tweet from tyhe list
      tweetList.addEventListener('click', removeTweet);

      //document
      document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//Functions

function newTweet(e) {
      e.preventDefault();

      //Read the textarea value
      const tweet = document.getElementById('tweet').value

      //creat the remove button
      const removeBtn = document.createElement('a');
      removeBtn.classList = 'remove-tweet';
      removeBtn.textContent = 'X';

      //creat an li element
      const li = document.createElement('li');
      li.textContent = tweet;

      //Add tehe remove button to each tweet
      li.appendChild(removeBtn);

      //add to the list
      tweetList.appendChild(li);

      //add to local storage
      addTweetLocalStorage(tweet);
}

//removes the tweets from the dom

function removeTweet(e) {
      if(e.target.classList.contains('remove-tweet')){
            e.target.parentElement.remove();
      }

 
      //remove from storage
      removeTweetLocalStorage( e.target.parentElement.textContent );

}

//Add the tweets into the local storage

function addTweetLocalStorage(tweet) {
      let tweets = getTweetsFromStorage();
      //add the tweet into the array
      tweets.push(tweet);

      //convert tweet array into string
      localStorage.setItem('tweets', JSON.stringify(tweets ) );
}

function getTweetsFromStorage() {
      let tweets;
      const tweetLS = localStorage.getItem('tweets');
      // get the values, if null is returned then we create an empty array
      if( tweetLS === null){
            tweets = [];
      }else{
            tweets = JSON.parse( tweetLS );
      }
      return tweets;
}

//print local storage tweets on load

function localStorageOnLoad() {
      let tweets = getTweetsFromStorage();
      
      //loop throught storage and then print the value
      tweets.forEach(function(tweet) {
            const removeBtn = document.createElement('a');
            removeBtn.classList = 'remove-tweet';
            removeBtn.textContent = 'X';

            //creat an li element
            const li = document.createElement('li');
            li.textContent = tweet;

            //Add tehe remove button to each tweet
            li.appendChild(removeBtn);

            //add to the list
            tweetList.appendChild(li);
      });
}

//REMOVES THE TWEET FROM LOCAL STORAGE    
 function removeTweetLocalStorage(tweet) {
       //get tweets from storage
        let tweets = getTweetsFromStorage();
        //remove the X from the tweet

        const tweetDelet = tweet.substring(0, tweet.length -1);

        // loop throught the tweets and remove the tweet thats's equal

        tweets.forEach(function(tweetLS, index) {
              if (tweetDelet === tweetLS) {
                  tweets.splice(index, 1)
            }
        });
        // save the data
        localStorage.setItem('tweets', JSON.stringify(tweets));
      }