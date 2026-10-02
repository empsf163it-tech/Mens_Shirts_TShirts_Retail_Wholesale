/**
 * FORMEN Menswear - Main Interactive Script
 * Handles Login/Signup Auth Modal, Navigation, Fit Selector, Filters, Swatches & Toast Notifications.
 */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- Auth Modal (Login / Sign Up Popup) Toggle & Backdrop ---
  const authToggles = document.querySelectorAll("[data-auth-toggle]");
  const authModal = document.getElementById("authModal");
  const authCloses = document.querySelectorAll("[data-auth-close]");

  if (authToggles && authModal) {
    authToggles.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        authModal.classList.add("open");
      });
    });
  }

  if (authCloses && authModal) {
    authCloses.forEach((btn) => {
      btn.addEventListener("click", () => {
        authModal.classList.remove("open");
      });
    });
  }

  // Close modal when clicking on dark backdrop overlay
  if (authModal) {
    authModal.addEventListener("click", (e) => {
      if (e.target === authModal) {
        authModal.classList.remove("open");
      }
    });
  }

  // Auth Tab Switcher (Login vs Sign Up)
  const authTabs = document.querySelectorAll("[data-auth-tab]");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");

  authTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      authTabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const target = tab.dataset.authTab;
      if (target === "login" && loginForm && signupForm) {
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
      } else if (target === "signup" && loginForm && signupForm) {
        signupForm.classList.add("active");
        loginForm.classList.remove("active");
      }
    });
  });

  // --- Mobile Navigation Menu Toggle ---
  const toggleBtn = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".mobile-menu");
  
  if (toggleBtn && mobileNav) {
    toggleBtn.addEventListener("click", () => {
      mobileNav.classList.toggle("open");
    });
  }

  // --- Fit Selector Interactive Component ---
  document.querySelectorAll("[data-fit]").forEach((el) => {
    el.addEventListener("click", () => {
      document.querySelectorAll("[data-fit]").forEach((x) => x.classList.remove("selected"));
      el.classList.add("selected");
      
      const out = document.querySelector(".fit-result");
      if (out) {
        out.style.display = "block";
        out.innerHTML = `<strong>${el.dataset.fit} Fit Selected</strong><br>Displaying recommended specs and pattern details tailored for the ${el.dataset.fit.toLowerCase()} body profile.`;
      }
    });
  });

  // --- Category & Fit Filter for Product Grid ---
  document.querySelectorAll("[data-filter]").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((x) => x.classList.remove("active"));
      btn.classList.add("active");
      
      const value = btn.dataset.filter;
      document.querySelectorAll("[data-category]").forEach((card) => {
        card.style.display = (value === "all" || card.dataset.category.includes(value)) ? "" : "none";
      });
    });
  });

  // --- Size Selector Handler ---
  document.querySelectorAll("[data-size]").forEach((s) => {
    s.addEventListener("click", () => {
      document.querySelectorAll("[data-size]").forEach((x) => x.classList.remove("selected"));
      s.classList.add("selected");
    });
  });

  // --- Color Swatch Selector Handler ---
  document.querySelectorAll(".swatch").forEach((swatch) => {
    swatch.addEventListener("click", () => {
      document.querySelectorAll(".swatch").forEach((x) => x.classList.remove("selected"));
      swatch.classList.add("selected");
    });
  });

  // --- FAQ Accordion Toggle Handler ---
  document.querySelectorAll(".faq-question").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const answer = item.querySelector(".faq-answer");
      const isOpen = answer.style.display === "block";

      // Close all answers
      document.querySelectorAll(".faq-answer").forEach((a) => (a.style.display = "none"));
      document.querySelectorAll(".faq-question span:last-child").forEach((icon) => (icon.textContent = "+"));

      if (!isOpen) {
        answer.style.display = "block";
        btn.querySelector("span:last-child").textContent = "−";
      }
    });
  });

  // --- Demo Form Submission Notification ---
  document.querySelectorAll("form[data-demo]").forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (form.id === "loginForm") {
        showFlash("Successfully logged in! Welcome back to FORMEN.");
        if (authModal) authModal.classList.remove("open");
      } else if (form.id === "signupForm") {
        showFlash("Account created successfully! Welcome to FORMEN.");
        if (authModal) authModal.classList.remove("open");
      } else if (form.classList.contains("newsletter-form")) {
        showFlash("Thank you for subscribing! You will receive our latest season updates.");
      } else {
        showFlash("Thank you! Your enquiry has been received. Our team will get in touch shortly.");
      }

      form.reset();
    });
  });

  // --- Action Button Toast Notification ---
  document.querySelectorAll("[data-action]").forEach((b) => {
    b.addEventListener("click", (e) => {
      e.preventDefault();
      showFlash(b.dataset.action);
    });
  });

  // Helper Function: Show Toast Notification
  function showFlash(msg) {
    const f = document.querySelector(".flash");
    if (f) {
      f.textContent = msg;
      f.style.display = "block";
      setTimeout(() => {
        f.style.display = "none";
      }, 3200);
    }
  }

});
