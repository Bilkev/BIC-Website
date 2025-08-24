document.addEventListener("DOMContentLoaded", () => {
  // Tabs logic
  const tabs = document.querySelectorAll("#galleryTabs button");
  const contents = document.querySelectorAll(".gallery-content");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      contents.forEach(c => c.classList.add("d-none"));
      document.getElementById(tab.dataset.category).classList.remove("d-none");
    });
  });

  // Lightbox logic
  let currentIndex = 0;
  let currentImages = [];

  const lightbox = document.getElementById("lightboxModal"); // Bootstrap modal
  const lightboxImg = document.getElementById("lightboxImg");

  // Add click for all images inside each gallery-content
  document.querySelectorAll(".gallery-content").forEach(section => {
    section.addEventListener("click", e => {
      if (e.target.classList.contains("gallery-img")) {
        // get all images inside this category
        currentImages = Array.from(section.querySelectorAll(".gallery-img"));
        currentIndex = currentImages.indexOf(e.target);
        showImage();
        // show bootstrap modal
        const modal = new bootstrap.Modal(lightbox);
        modal.show();
      }
    });
  });

  function showImage() {
    lightboxImg.src = currentImages[currentIndex].src;
  }

  // Prev / Next buttons
  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    showImage();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    showImage();
  });

  // Close button logic
  document.getElementById("closeBtn").addEventListener("click", () => {
    bootstrap.Modal.getInstance(lightbox).hide();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (document.querySelector(".modal.show")) {
      if (e.key === "ArrowRight") document.getElementById("nextBtn").click();
      else if (e.key === "ArrowLeft") document.getElementById("prevBtn").click();
      else if (e.key === "Escape") bootstrap.Modal.getInstance(lightbox).hide();
    }
  });
});


// Counter Animation (slower)
function animateCounter(el) {
  const target = +el.getAttribute("data-target");
  const duration = 4000; // slower (4 sec total)
  const stepTime = Math.max(50, duration / target);

  let count = 0;
  const timer = setInterval(() => {
    count += 1;
    el.innerText = count;
    if (count >= target) clearInterval(timer);
  }, stepTime);
}

// Reveal on scroll
const statItems = document.querySelectorAll(".stat-item");
const counters = document.querySelectorAll(".counter");

function revealStats() {
  statItems.forEach((item, idx) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50 && !item.classList.contains("visible")) {
      item.classList.add("visible");
      setTimeout(() => animateCounter(counters[idx]), 400); // slight delay for smoothness
    }
  });
}

window.addEventListener("scroll", revealStats);


