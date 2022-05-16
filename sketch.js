let song;
let amp;
let fft;
  // Define in how many pieces you want to divide the circle
  var pieces = 32;

  // Circle's radius
  var radius = 200;
// audio file is loaded before anything else starts
function preload() {
  song = loadSound('Ketsa - After You.mp3');
}


// happens once
// Draws the canvas

function setup() {
  createCanvas(800, 500);
 slider= createSlider(0,1,0.5,0.01);
  slider.position(10, 200);
  song.play();
  amp = new p5.Amplitude();
  // Initiate the FFT object
  fft = new p5.FFT();
   
   
  }

function draw(){
  background(0);
 song.setVolume(slider.value());
  let ampValue = amp.getLevel();

 
  // Run the analysis, while the audio is playing
  fft.analyze();

  // Get different values for different frequency ranges
  // -----------------------------------------------------
  // p5.sound comes with predefined keywords, 
  // but giving getEnergy() 2 numbers instead of a keyword 
  // you could use your custom range if needed
  var bass    = fft.getEnergy( "bass" );
  var treble  = fft.getEnergy( "treble" );
  var mid     = fft.getEnergy( "mid" );     
  var custom  = fft.getEnergy( 100, 200 );

  // Map the range of each volume with your desired numbers 
  var mapBass     = map( bass, 0, 255, -100, 100 );
  var mapMid      = map( mid, 0, 255, -150, 150 );
  var mapTreble   = map( treble, 0, 255, -200, 200 );

   // Move the origin to the center of the canvas
  translate( width/2, height/2 );

//   // The centered circle
//   stroke( 0, 0, 255 );
//   // ellipse( 0, 0, radius );

//   // For each piece draw a line
//   for( i = 0; i < pieces; i++ ) {
    
//     // Rotate the point of origin
//     rotate( TWO_PI / pieces );
     
//     // Draw the red lines
//     stroke( 255, 0, 0 );
//     line( 10, radius/2, 0, radius );
    
//     //Optionally also draw to the opposite direction
//     stroke( 0 );
//     line( -10, radius/2, 0, radius ); 
//   }

 
  for( i = 0; i < pieces; i++ ) {
    
    rotate( TWO_PI / pieces );
    stroke( 234,72,219 );
    // Draw the bass lines
   line( mapBass, radius/4, 0, radius );
    stroke( 100, 250, 200 );
    // Draw the mid lines
 line( mapMid, radius/2, 0, radius );    
  stroke( 250, 250, 250 );
    // Draw the treble lines
   line( mapTreble, radius/2, 0, radius );        
    
  }
  }