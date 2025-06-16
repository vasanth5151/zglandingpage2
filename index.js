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


function createCounterAnimation(targetElement0, targetElement1, initialValue) {
  let counter = initialValue;
  let isAnimating = false;
  let pendingValue = null;
  
  function countDown(newValue) {
    if (isAnimating) {
      pendingValue = newValue;
      return;
    }
    
    if (newValue !== undefined) {
      counter = newValue;
    } else if (counter > 0) {
      counter--;
    } else {
      counter = 59; // For seconds/minutes
    }
    
    isAnimating = true;
    targetElement1.textContent = counter.toString().padStart(2, '0');
    
    gsap.to([targetElement0, targetElement1], {
      y: "+=100",
      duration: 0.45, // Faster animation
      ease: "power3.inOut",
      onComplete: swapNodes
    });
  }
  
  function swapNodes() {
    targetElement0.textContent = counter.toString().padStart(2, '0');
    gsap.set([targetElement0, targetElement1], { 
      y: "-=100",
      onComplete: () => {
        isAnimating = false;
        if (pendingValue !== null) {
          const value = pendingValue;
          pendingValue = null;
          countDown(value);
        }
      }
    });
  }
  
  return {
    update: function(newValue) {
      const current = parseInt(targetElement0.textContent);
      if (current !== newValue || isAnimating) {
        countDown(newValue);
      }
    }
  };
}



// Initialize counters
// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  // Initialize counters
  const hoursCounter = createCounterAnimation(
    document.getElementById("hours0"),
    document.getElementById("hours1"),
    0
  );
  
  const minutesCounter = createCounterAnimation(
    document.getElementById("minutes0"),
    document.getElementById("minutes1"),
    0
  );
  
  const secondsCounter = createCounterAnimation(
    document.getElementById("seconds0"),
    document.getElementById("seconds1"),
    0
  );
  
  function updateCountdown(h, m, s) {
    hoursCounter.update(h);
    minutesCounter.update(m);
    secondsCounter.update(s);
  }
  
  function startCountdown(targetDate) {
    function update() {
      const now = new Date().getTime();
      let distance = targetDate - now;
      
      // If countdown is finished
      if (distance <= 0) {
        clearInterval(countdownTimer);
        updateCountdown(0, 0, 0);
        return;
      }
      
      // Calculate total hours (max 24)
      const totalHours = Math.min(24, Math.floor(distance / (1000 * 60 * 60)));
      const hours = totalHours;
      
      // Calculate remaining minutes and seconds
      const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));
      
      updateCountdown(hours, minutes, seconds);
    }
    
    update();
    const countdownTimer = setInterval(update, 1000);
    return countdownTimer;
  }
  
  // Example usage:
  // Countdown to next New Year
  const newYear = new Date();
  newYear.setFullYear(newYear.getFullYear() + 1);
  newYear.setMonth(0, 1);
  newYear.setHours(0, 0, 0, 0);
  
  startCountdown(newYear.getTime());
  
  // Or countdown to a specific date:
  // const targetDate = new Date("December 31, 2023 23:59:59").getTime();
  // startCountdown(targetDate);
});
