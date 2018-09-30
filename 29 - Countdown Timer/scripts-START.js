//
//  Nouns
//
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('.timer__button');
const input = document.querySelector('[name=minutes]');
let countdown ;

//
//  Functions
//
function timer(seconds) {
  const now = Date.now() ;
  const then = now + (seconds*1000);
  displayTimeLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
      const secLeft = Math.round((then - (Date.now()))/1000);

      if( secLeft < 0 ) {
        clearInterval( countdown);
        return ;
      }
      displayTimeLeft(secLeft);
  }, 1000);
}
function displayTimeLeft(seconds) {
  clearInterval(countdown);
  const mins = Math.floor(seconds/60);
  const secLeft = seconds % 60 ;
  const display = `${mins}:${secLeft < 10 ? '0' : '' }${secLeft}`;
  timerDisplay.textContent = display ;
  document.title = display ;
}
function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours() ;
  const minutes = end.getMinutes() ;

  endTime.textContent = `Be back at: ${hour}:${minutes < 10 ? '0' : '' }${minutes}`;

}
function startTimer() {
  const seconds = parseInt(this.dataset.time) ;
  timer(seconds);
}

//
//  Event Listeners
//
buttons.forEach( button => button.addEventListener( 'click', startTimer));
document.customForm.addEventListener('submit', function (evt) {
  evt.preventDefault();
  const minutes = this.minutes.value ;
  timer( minutes * 60) ;
  this.reset();
})
