const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

//
//  Functions
//
function getVideo () {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then( localMediaStream => {
      //console.log( {localMediaStream} ) ;
      video.srcObject =  localMediaStream ;
      //video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch( err => {
      console.error( 'Damn!', err);
    });
}
function toCanvas() {
  const width = video.videoWidth ;
  const height = video.videoHeight ;
  canvas.width = width ;
  canvas.height = height ;

  return setInterval( () => {
    ctx.drawImage( video,0,0, width,height);
    // extraemos datos
    let pixels = ctx.getImageData(0,0,width,height);
    // efecto
    //pixels = redEffect(pixels);
    ctx.globalAlpha = 0.5 ;
    pixels = rgbSplit( pixels );
    //pixels = greenScreen( pixels );
    // devolvemos los datos
    ctx.putImageData( pixels , 0 , 0 );
  } ,16 )

}
function takePhoto() {
  // sonido :3
  snap.currentTime = 0;
  snap.play();
  // datos
  const data = canvas.toDataURL( 'image/jpeg');
  const link = document.createElement( 'a' );
  link.href = data ;
  link.setAttribute('download', 'foti');
  link.innerHTML = `<img src="${data}" alt="">`;
  strip.insertBefore( link, strip.firstChild );
}
function redEffect(pixels) {
  for(let idx = 0 ; idx < pixels.data.length ; idx = idx + 4 ){
    pixels.data[ idx + 0 ] = pixels.data[ idx + 0 ] + 100;// red
    pixels.data[ idx + 1 ] = pixels.data[ idx + 1 ] - 50 ;// green
    pixels.data[ idx + 2 ] = pixels.data[ idx + 2 ] * 0.5 ;// blue
  }
  return pixels ;
}
function rgbSplit(pixels) {
  for( let idx = 0 ; idx < pixels.data.length ; idx = idx + 4 ){
    pixels.data[ idx - 100 ] = pixels.data[ idx + 0 ] ;// red
    pixels.data[ idx + 100 ] = pixels.data[ idx + 1 ] ;// green
    pixels.data[ idx - 175 ] = pixels.data[ idx + 2 ] ;// blue
  }
  return pixels ;
}
function greenScreen(pixels) {
  const levels = {};

  document.querySelectorAll('.rgb input').forEach((input) => {
    levels[input.name] = input.value ;
  });

  for ( let idx = 0 ; idx < pixels.data.length ; idx = idx + 4 ) {
    red = pixels.data[ idx + 0 ];
    green = pixels.data[ idx + 1 ];
    blue = pixels.data[ idx + 2 ];
    alpha = pixels.data[ idx + 3 ];

    if( red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax ) {
          pixels.data[ idx + 3 ] = 0 ;
        }
  }
  return pixels ;
}


getVideo();


//
//  Event Listeners
//
video.addEventListener( 'canplay', toCanvas ) ;
