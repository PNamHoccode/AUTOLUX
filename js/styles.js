document.addEventListener("DOMContentLoaded", function () {
  // Toggle mobile menu
  const navMenu = document.querySelector(".nav-menu");
  function toggleMobileMenu() {
    navMenu.classList.toggle("active");
  }
  window.toggleMobileMenu = toggleMobileMenu; // Để gọi từ HTML

  // Toggle search box
  const searchIcon = document.querySelector(".search-icon");
  const searchContainer = document.querySelector(".search-container");
  if (searchIcon && searchContainer) {
    searchIcon.addEventListener("click", () => {
      searchContainer.classList.toggle("active");
    });
  }

  // Smooth scrolling for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        navMenu.classList.remove("active"); // Đóng menu trên mobile
      }
    });
  });

  // Header background on scroll
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.background = "rgba(0, 0, 0, 0.98)";
    } else {
      header.style.background = "rgba(0, 0, 0, 0.95)";
    }

    // Scroll progress bar
    const winScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById("scrollProgressBar");
    if (progressBar) {
      progressBar.style.width = scrolled + "%";
    }
  });

  // Ripple effect on buttons
  document.querySelectorAll(".view-btn, .cta-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        pointer-events: none;
      `;
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Inject ripple animation style
  const style = document.createElement("style");
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    .view-btn, .cta-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);

  // Scroll animations using IntersectionObserver
  const animationObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  document
    .querySelectorAll(".fade-in, .slide-left, .slide-right")
    .forEach((el) => animationObserver.observe(el));

  // Animate car image
  const carImage = document.querySelector(".carcare-image");
  if (carImage) {
    const carObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );
    carObserver.observe(carImage);
  }

  // Counter animation for statistics
  const statsSection = document.querySelector(".stats-grid");
  if (statsSection) {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statsObserver.observe(statsSection);
  }

  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");
    counters.forEach((counter) => {
      const target = counter.textContent;
      const isPercent = target.includes("%");
      const isTime = target.includes("/");
      if (!isPercent && !isTime) {
        const finalNumber = parseInt(target.replace("+", ""));
        let current = 0;
        const increment = finalNumber / 50;
        const update = () => {
          if (current < finalNumber) {
            current += increment;
            counter.textContent = Math.floor(current) + "+";
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        update();
      }
    });
  }
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});