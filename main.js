
// Make ScrollTrigger available for use in GSAP animations
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetId = link.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (!targetElement) return;

      // Find the parent item that contains this section
      const parentItem = targetElement.closest('.item');
      if (!parentItem) return;

      // Find the index of this item within its scroll section
      const scrollSection = parentItem.closest('.scroll-section');
      const items = [...scrollSection.querySelectorAll('.item')];
      const itemIndex = items.indexOf(parentItem);

      // Calculate the scroll position
      const scrollPosition = scrollSection.offsetTop + (itemIndex * window.innerHeight);

      // Scroll to position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  });
});


// Make ScrollTrigger available for use in GSAP animations
gsap.registerPlugin(ScrollTrigger);

// Select the HTML elements needed for the animation
const scrollSection = document.querySelectorAll(".scroll-section");

scrollSection.forEach((section) => {
  const wrapper = section.querySelector(".wrapper");
  const items = wrapper.querySelectorAll(".item");

  // Initialize
  let direction = null;

  if (section.classList.contains("vertical-section")) {
    direction = "vertical";
  } else if (section.classList.contains("horizontal-section")) {
    direction = "horizontal";
  }

  initScroll(section, items, direction);
});

function initScroll(section, items, direction) {
  // Initial states
  items.forEach((item, index) => {
    if (index !== 0) {
      direction == "horizontal"
        ? gsap.set(item, { xPercent: 100 })
        : gsap.set(item, { yPercent: 100 });
    }
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: true,
      start: "top top",
      end: () => `+=${items.length * 100}%`,
      scrub: 1,
      invalidateOnRefresh: true,
      // markers: true,
    },
    defaults: { ease: "true" },
  });
  items.forEach((item, index) => {
    timeline.to(item, {
      scale: 0.9,
      borderRadius: "15px",
    });

    direction == "horizontal"
      ? timeline.to(
          items[index + 1],
          {
            xPercent: 0,
          },
          "<"
        )
      : timeline.to(
          items[index + 1],
          {
            yPercent: 0,
          },
          "<"
        );
  });
}


function createFloatingElements(container) {
    if (!container) return;
  
    // Remove existing floating elements
    const existingElements = container.querySelectorAll('.floating-background');
    existingElements.forEach(el => el.remove());
    
    // Create new floating elements
    const numElements = container.classList.contains('hero') ? 15 : 8;
    
    for (let i = 0; i < numElements; i++) {
      const element = document.createElement('div');
      element.className = 'floating-background';
      
      const size = Math.random() * 150 + 100;
      const delay = Math.random() * 5;
      const duration = Math.random() * 4 + 6;
      
      element.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.15 + 0.05};
        animation: float ${duration}s ease-in-out infinite;
        animation-delay: -${delay}s;
        background: radial-gradient(circle at center, #bc13fe, transparent);
        border-radius: 50%;
        position: absolute;
        pointer-events: none;
        z-index: 0;
      `;
      container.appendChild(element);      
    }
    
}
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.float-circle');
    // console.log(sections)
    sections.forEach(section => {
      createFloatingElements(section);
    });
});

// gsap.fromTo(
//   ".loading-page",
//   { opacity: 1 },
//   {
//       opacity: 0,
//       display: "none",
//       duration: 1.5,
//       delay: 3.5,
//   }
// );

// Initially hide navbar
gsap.set(".navbar", { 
  opacity: 0,
  y: -100 
});

// After loading animation completes, show navbar and initialize scroll behavior
gsap.fromTo(
".loading-page",
{ opacity: 1 },
{
    opacity: 0,
    display: "none",
    duration: 1.5,
    delay: 3.5,
    onComplete: () => {
        // Show navbar after loading completes
        gsap.to(".navbar", {
            opacity: 1,
            y: 0,
            // duration: 0.1,
            onComplete: initNavbarScroll
        });
    }
}
);  

gsap.fromTo(
  ".logo-name",
  {
      y: 50,
      opacity: 0,
  },
  {
      y: 0,
      opacity: 1,
      duration: 1,
      delay: 0.5,
  }
);

// Enhanced 3D animation with better clarity
gsap.timeline()
  .fromTo("#svg", {
      rotateX: 45,
      rotateY: -45,
      scale: 0.8,
      opacity: 0.5,
  }, {
      rotateX: 25,
      rotateY: -25,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.out"
  })
  .to("#svg", {
      rotateX: 30,
      rotateY: -30,
      y: -15,
      z: 30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
  });

// Add subtle rotation on mouse move for extra depth
document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
  
  gsap.to("#svg", {
      rotationY: -25 + xAxis,
      rotationX: 25 + yAxis,
      duration: 1,
      ease: "power2.out"
  });
});
// -------------------------------
// for svg2
// Enhanced 3D animation with better clarity
gsap.timeline()
  .fromTo("#svg2", {
      rotateX: 45,
      rotateY: -45,
      scale: 0.8,
      opacity: 0.5,
  }, {
      rotateX: 25,
      rotateY: -25,
      scale: 1,
      opacity: 1,
      duration: 2,
      ease: "power2.out"
  })
  .to("#svg2", {
      rotateX: 30,
      rotateY: -30,
      y: -3,
      z: 30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
  });

// Add subtle rotation on mouse move for extra depth
document.addEventListener('mousemove', (e) => {
  const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
  const yAxis = (window.innerHeight / 2 - e.pageY) / 50;
  
  gsap.to("#svg2", {
      rotationY: -25 + xAxis,
      rotationX: 25 + yAxis,
      duration: 1,
      ease: "power2.out"
  });
});
const images = document.querySelectorAll('.coding-image');
let angle = 0;

// Speed adjustment (lower values = slower rotation)
const speed = 0.1;

function animate() {
  angle += speed;
  images.forEach((image, index) => {
    const currentAngle = angle + index * (360 / images.length); // Dynamic angle calculation
    image.style.setProperty('--angle', currentAngle);
  });
  requestAnimationFrame(animate);
}

animate();

// Cat airplane animation setup
gsap.registerPlugin(MotionPathPlugin);

const catContainer = document.querySelector('.cat-container');
const propeller = document.querySelector('.propeller');
const catEyes = document.querySelector('.eyes');
const catHead = document.querySelector('.cat-head');

// Create a master timeline for the cat
const catMasterTimeline = gsap.timeline({
    repeat: -1,
    defaults: {
        ease: "power1.inOut"
    }
});

// Continuous propeller spin
gsap.to(propeller, {
    rotation: 360,
    transformOrigin: "center",
    duration: 1,
    repeat: -1,
    ease: "none"
});

// Blinking animation
gsap.to(catEyes, {
    scaleY: 0.3,
    transformOrigin: "center",
    duration: 0.5,
    repeat: -1,
    yoyo: true,
    repeatDelay: 2.5
});

// Function to generate random path points
function generateRandomPath() {
    const screenWidth = window.innerWidth - 200;
    const screenHeight = window.innerHeight - 200;
    
    return [
        { x: Math.random() * screenWidth, y: Math.random() * screenHeight },
        { x: Math.random() * screenWidth, y: Math.random() * screenHeight },
        { x: Math.random() * screenWidth, y: Math.random() * screenHeight }
    ];
}

// Function to animate the cat along a path
function animateCatFlight() {
    const path = generateRandomPath();
    
    gsap.to(catContainer, {
        duration: 5,
        motionPath: {
            path: path,
            curviness: 1.5,
            autoRotate: true,
            alignOrigin: [0.5, 0.5]
        },
        ease: "power2.inOut",
        onComplete: animateCatFlight
    });

    // Simultaneous head tilt animation
    gsap.to(catHead, {
        rotation: gsap.utils.random(-10, 10),
        duration: 2,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut"
    });
}

// Start animations when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initial position
    gsap.set(catContainer, { 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2 
    });
    
    // Start the flight animation
    animateCatFlight();
});

// Update animation on window resize
window.addEventListener('resize', () => {
    // Restart the animation with new screen dimensions
    gsap.killTweensOf(catContainer);
    animateCatFlight();
});


// let lastScroll = 0;

// window.addEventListener("scroll", () => {
//   const navbar = document.querySelector(".navbar");
//   const currentScroll = window.pageYOffset;

//   if (currentScroll <= 0) {
//     // At the top of the page
//     navbar.classList.remove("navbar--hidden");
//     return;
//   }

//   if (currentScroll > lastScroll && !navbar.classList.contains("navbar--hidden")) {
//     // Scrolling down & navbar is visible
//     navbar.classList.add("navbar--hidden");
//   } else if (currentScroll < lastScroll && navbar.classList.contains("navbar--hidden")) {
//     // Scrolling up & navbar is hidden
//     navbar.classList.remove("navbar--hidden");
//   }

//   lastScroll = currentScroll;
// });
function initNavbarScroll() {
  let lastScroll = 0;
  const navbar = document.querySelector(".navbar");
  
  window.addEventListener("scroll", () => {
      const currentScroll = window.scrollY;
      
      // Detect scroll direction
      if (currentScroll > lastScroll && currentScroll > 50) {
          // Scrolling DOWN and not at the top
          gsap.to(navbar, {
              y: -100,
              duration: 0.3,
              ease: "power2.inOut"
          });
      } else {
          // Scrolling UP or at the top
          gsap.to(navbar, {
              y: 0,
              duration: 0.3,
              ease: "power2.inOut"
          });
      }

      lastScroll = currentScroll;
  });
}