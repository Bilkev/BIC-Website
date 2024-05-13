const toggle = document.querySelector(".toggle");
const navigation = document.querySelector(".navigation");

toggle.addEventListener("click", () => {
  toggle.classList.toggle("active");
  navigation.classList.toggle("active");
});

// Hiding sections in work page
document.addEventListener("DOMContentLoaded", function() {
  // Initially hide all sections except "Tanks"
  const sections = document.querySelectorAll('section[id]');
  sections.forEach(section => {
    if (section.id !== 'tanks') {
      section.style.display = 'none';
    }
  });

  // Add click event listeners to navigation links
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);

      // Show the target section and hide all others
      sections.forEach(section => {
        if (section.id === targetId) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });
});



// JavaScript to handle lightbox functionality for each section separately
const sections = document.querySelectorAll('section'); // Select all sections

sections.forEach(section => {
  const gallery = section.querySelector('.gallery'); // Select the gallery within each section
  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  document.body.appendChild(lightbox);
  let currentImageIndex = 0;

  gallery.addEventListener('click', e => {
    if (e.target.tagName === 'IMG') {
      const imgSrc = e.target.getAttribute('src');
      showLightboxWithControls(imgSrc);
      currentImageIndex = Array.from(gallery.children).indexOf(e.target);
    }
  });

  lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  function showLightboxWithControls(imgSrc) {
    const lightboxImg = document.createElement('img');
    lightboxImg.src = imgSrc;
    lightboxImg.classList.add('lightbox-img');
    while (lightbox.firstChild) {
      lightbox.removeChild(lightbox.firstChild);
    }
    lightbox.appendChild(lightboxImg);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(nextBtn);
    lightbox.style.display = 'flex';
  }

  const prevBtn = document.createElement('div');
  prevBtn.classList.add('arrow-btn', 'prev-btn');
  prevBtn.innerHTML = '&lt;';

  const nextBtn = document.createElement('div');
  nextBtn.classList.add('arrow-btn', 'next-btn');
  nextBtn.innerHTML = '&gt;';

  prevBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex - 1 + gallery.children.length) % gallery.children.length;
    const imgSrc = gallery.children[currentImageIndex].getAttribute('src');
    showLightboxWithControls(imgSrc);
  });

  nextBtn.addEventListener('click', () => {
    currentImageIndex = (currentImageIndex + 1) % gallery.children.length;
    const imgSrc = gallery.children[currentImageIndex].getAttribute('src');
    showLightboxWithControls(imgSrc);
  });

  prevBtn.addEventListener('click', e => {
    e.stopPropagation();
  });

  nextBtn.addEventListener('click', e => {
    e.stopPropagation();
  });
});


