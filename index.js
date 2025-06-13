// Simple background slideshow for mobile
document.addEventListener('DOMContentLoaded', function() {
  const backgrounds = [
    { id: 'bg-slide-1', duration: 3000 },
    { id: 'bg-slide-2', duration: 3000 },
    { id: 'bg-slide-3', duration: 3000 },
    { id: 'bg-slide-4', duration: 3000 },
    { id: 'bg-slide-5', duration: 3000 }
  ];
  
  // Initialize all backgrounds as hidden except first
  backgrounds.forEach((bg, index) => {
    const element = document.getElementById(bg.id);
    if (element) {
      element.style.opacity = index === 0 ? '1' : '0';
    }
  });
  
  let currentSlide = 0;
  
  function showNextSlide() {
    // Hide current slide
    const currentBg = document.getElementById(backgrounds[currentSlide].id);
    if (currentBg) currentBg.style.opacity = '0';
    
    // Move to next slide
    currentSlide = (currentSlide + 1) % backgrounds.length;
    
    // Show next slide
    const nextBg = document.getElementById(backgrounds[currentSlide].id);
    if (nextBg) nextBg.style.opacity = '1';
    
    // Set timeout for next transition
    setTimeout(showNextSlide, backgrounds[currentSlide].duration);
  }
  
  // Start the slideshow
  setTimeout(showNextSlide, backgrounds[0].duration);
});



 // Set the date we're counting down to (24 hours from now)
 const countDownDate = new Date().getTime() + (24 * 60 * 60 * 1000);

 // Update the countdown every 1 second
 const x = setInterval(function() {
   // Get today's date and time
   const now = new Date().getTime();
   
   // Find the distance between now and the countdown date
   const distance = countDownDate - now;
   
   // Time calculations for hours, minutes and seconds
   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
   
   // Display the result
   document.getElementById("countdown-hours").innerHTML = hours.toString().padStart(2, '0');
   document.getElementById("countdown-minutes").innerHTML = minutes.toString().padStart(2, '0');
   document.getElementById("countdown-seconds").innerHTML = seconds.toString().padStart(2, '0');
   
   // If the countdown is finished
   if (distance < 0) {
     clearInterval(x);
     document.getElementById("countdown-hours").innerHTML = "00";
     document.getElementById("countdown-minutes").innerHTML = "00";
     document.getElementById("countdown-seconds").innerHTML = "00";
   }
 }, 1000);