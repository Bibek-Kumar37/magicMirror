// import {showOnly} from"./utils/showMeData"

const btn = document.querySelector('.input');
const content = document.querySelector('.content');
let audioElement;

function speak(text) {
  const text_speak = new SpeechSynthesisUtterance(text);

  text_speak.rate = 1;
  text_speak.volume = 1;
  text_speak.pitch = 1;

  window.speechSynthesis.speak(text_speak);
}

function wishMe() {
  var day = new Date();
  var hour = day.getHours();

  if (hour >= 5 && hour <= 12) {
    speak("Have a Good Morning...")
  }

  else if (hour > 12 && hour <= 18) {
    speak("Good Afternoon Sir...")
  }

  else if (hour > 18 && hour <= 21) {
    speak("Good Evening Sir...")
  }
  else {
    speak("Good night & Have a horror dream")
  }

}

window.addEventListener('load', () => {
  speak("Initializing ...");
  wishMe();
  startListening();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

// Check if SpeechRecognition is supported
const recognition = new SpeechRecognition();
console.log(recognition);
    // Now you can use recognition object


function startListening() {
  recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
  }
  recognition.start();
}

recognition.onend = () => {
  startListening();
}

function stopMusic() {
    if (audioElement && audioElement.paused === false) {
      audioElement.pause();
      speak("Stopping music...");
    }
}

function showOnly(elementClass) {

    const elements = document.querySelectorAll('.container > *');
    console.log(elements);
    elements.forEach(el => {
      el.classList.add('fade-out');
    });
    document.querySelector(elementClass).classList.remove('fade-out');
    document.querySelector('.footer').classList.add("fade-out");
  }

function takeCommand(message) {
  showDataCommand(message)

  if (message.includes('hey') || message.includes('hello') || message.includes('hi')) {
    speak("Hello Sir, How May I Help You?");
  }
//   else if (message.includes("open google")) {
//     window.open("https://google.com", "_blank");
//     speak("Opening Google...")
//   }

  else if (message.includes("play music")) {
    if (!audioElement) {
      const audioFilePath = "assets/music/Premika.mp3";
      audioElement = new Audio(audioFilePath);
    }
    audioElement.currentTime = 0;
    audioElement.play();
    speak("Playing your favourite music...");
  } 
  else if (message.includes("open youtube")) {
    window.open("https://youtube.com", "_blank");
    speak("Opening Youtube...")
  }
  else if (message.includes("open facebook")) {
    window.open("https://facebook.com", "_blank");
    speak("Opening Facebook...")
  }

  else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
    window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    const finalText = "This is what i found on internet regarding " + message;
    speak(finalText);
  }

  else if (message.includes('wikipedia')) {
    window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "")}`, "_blank");
    const finalText = "This is what i found on wikipedia regarding " + message;
    speak(finalText);
  }

  else if (message.includes('time')) {
    const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" })
    const finalText = time;
    speak(finalText);
  }

  else if (message.includes('date')) {
    const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" })
    const finalText = date;
    speak(finalText);
  }

  else if (message.includes('calculator')) {
    window.open('Calculator:///')
    const finalText = "Opening Calculator";
    speak(finalText);
  }
  else if (message.includes('stop music') || message.includes('stop')) {
    stopMusic();
  }

  else {
    // window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
    // const finalText = "I found some information for " + message + " on google";
    // speak(finalText);
  }
}
function showDataCommand(message){
  if (message.includes("time")) {
      showOnly('.center-side');
  } else if (message.includes("weather")) {
      showOnly('.right-side');
  } else if (message.includes("news")) {
      showNewsOnly('.news-section');
  } else if (message.includes("Holiday list only") || message.includes("holiday")){
      showOnly('.left-side');
  } else if (message.includes("all") || message.includes("everything")) {
    const finalText = "Showing everything...";
    speak(finalText);
    const elements = document.querySelectorAll('.container > *');
    elements.forEach(el => {
      el.classList.remove('fade-out');
    });
    document.querySelector('.footer').classList.remove("fade-out");
    document.querySelector('.news-section').classList.add("fade-out");
  }
}

function showNewsOnly(elementClass){
  document.querySelector('.news-section').classList.remove("fade-out");
  const element = document.querySelector('.news-section');
  console.log(element);
  const elementData = document.querySelectorAll('.container > *');
    elementData.forEach(el => {
      el.classList.add('fade-out');
    });
    document.querySelector('.footer').classList.add("fade-out");

}