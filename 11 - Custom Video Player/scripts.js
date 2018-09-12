 // Get our elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
//
// fullscreen
//
const fullscreen = player.querySelector('.fullscreen');

 // Functions
function togglePlay(){
  video.paused ? video.play() : video.pause() ;
}
function updateButton(){
  const icon = this.paused ? '<i class="fa fa-play"></i>' : '<i class="fa fa-pause"></i>' ;
  toggle.innerHTML = icon ;
}
function skip() {
  video.currentTime += parseFloat(this.dataset.skip) ;
}
function handleRangeUpdate() {
  video[this.name] = this.value ;
}
function handleProgress() {
  const percent = ( video.currentTime / video.duration ) * 100 ;
  progressBar.style.flexBasis = `${percent}%`;
}
function scrub(evt) {
  const scrubTime = ( evt.offsetX / progress.offsetWidth ) * video.duration ;
  video.currentTime = scrubTime ;
}
/*function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  this.requestFullscreen ? this.requestFullscreen() : this.exitFullscreen() ;


  console.log(this);
}*/

function toggleFullScreen() {
  const doc = window.document;
  const docEl = doc.documentElement;

  const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  let fullscreenElement = !doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement ;

  if( fullscreenElement ) {
    requestFullScreen.call(docEl);
    fullscreen.innerHTML = '<i class="fa fa-compress"></i>';
  }
  else {
    cancelFullScreen.call(doc);
    fullscreen.innerHTML = '<i class="fa fa-arrows-alt"></i>';
  }
}


// Event Listeners
//let dblclick = false ;
// video.addEventListener('dblclick', () => !dblclick ) ;
//video.addEventListener('click', () => {if(!dblclick) togglePlay() });
video.addEventListener('click', togglePlay );
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
video.addEventListener('dblclick', toggleFullScreen ) ;
/* () => {
  dblclick = !dblclick ;
  console.log(dblclick);
  toggleFullScreen();
  dblclick = !dblclick ;
  console.log(dblclick);
});*/

toggle.addEventListener('click', togglePlay );

skipButtons.forEach( button => button.addEventListener('click', skip ));

ranges.forEach(range=> range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));

let mousedown = false ;
progress.addEventListener('click', scrub );
progress.addEventListener('mousemove', (evt) => mousedown && scrub(evt));
progress.addEventListener('mousedown', () => mousedown = true );
progress.addEventListener('mouseup', () => mousedown = false );

fullscreen.addEventListener('click', toggleFullScreen ) ;
