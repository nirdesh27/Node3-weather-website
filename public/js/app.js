console.log('Client side java script is loaded ');

const weatherdata = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

messageOne.textContent = 'From parragraph 1';

weatherdata.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(
    'http://localhost:3000/weather?address=' + location
  ).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log('error');
        messageOne.textContent = 'error : ' + data.error;
      } else {
        console.log(data.place);
        console.log(data.forecast);
        messageOne.textContent = 'place : ' + data.place;
        messageTwo.textContent = 'temperature : ' + data.forecast.temperature;
      }
    });
  });
  //   console.log(location);
});
