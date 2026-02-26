/**
 * Travel Recommendation Website - Main JavaScript Module
 * Handles country-based recommendations and contact form validation
 */

// IIFE to avoid global variables and create isolated scope
(function() {
  'use strict';

  // Country recommendation data
  const countryData = {
    India: {
      title: 'Taj Mahal, Agra',
      description: 'The Taj Mahal is an iconic ivory-white marble mausoleum located in Agra, India. Built by Mughal Emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal, it stands as a timeless symbol of love and architectural brilliance. Recognized as one of the Seven Wonders of the World, the Taj Mahal attracts millions of visitors who marvel at its intricate designs, symmetrical beauty, and serene gardens.',
      images: [
        { src: 'images/india1.jpg', alt: 'Taj Mahal front view with reflecting pool' },
        { src: 'images/india2.jpg', alt: 'Taj Mahal at sunset with golden sky' }
      ]
    },
    Japan: {
      title: 'Mount Fuji, Honshu',
      description: 'Mount Fuji is Japan\'s highest and most iconic mountain, standing at 3,776 meters. This active stratovolcano is revered as a sacred site and has inspired artists and poets for centuries. With its perfectly symmetrical cone shape, Mount Fuji offers breathtaking views, especially during cherry blossom season and winter when its snow-capped peak glistens against the blue sky. It\'s a UNESCO World Heritage site and a must-visit for nature lovers and adventure seekers.',
      images: [
        { src: 'images/japan1.jpg', alt: 'Mount Fuji with cherry blossoms in foreground' },
        { src: 'images/japan2.jpg', alt: 'Snow-capped Mount Fuji reflecting in lake' }
      ]
    },
    Australia: {
      title: 'Sydney Opera House, Sydney',
      description: 'The Sydney Opera House is one of the most recognizable and celebrated buildings in the world. Located on the stunning Sydney Harbour, this architectural masterpiece features a unique design with sail-shaped shells. It serves as a premier venue for performing arts and hosts over 1,500 performances annually. The Opera House is not only an engineering marvel but also a symbol of Australia\'s cultural identity and creative spirit.',
      images: [
        { src: 'images/australia1.jpg', alt: 'Sydney Opera House with harbour bridge in background' },
        { src: 'images/australia2.jpg', alt: 'Sydney Opera House illuminated at night' }
      ]
    }
  };

  /**
   * Renders country recommendation to the DOM
   * @param {string} country - Selected country name
   */
  function renderCountryRecommendation(country) {
    const resultContainer = document.getElementById('country-result');
    
    if (!resultContainer) {
      console.error('Country result container not found');
      return;
    }

    const data = countryData[country];
    
    if (data) {
      // Build HTML with proper structure
      const html = `
        <article class="card country-card">
          <h3>${escapeHtml(data.title)}</h3>
          <p>${escapeHtml(data.description)}</p>
          <div class="image-gallery">
            <img src="${escapeHtml(data.images[0].src)}" alt="${escapeHtml(data.images[0].alt)}" loading="lazy">
            <img src="${escapeHtml(data.images[1].src)}" alt="${escapeHtml(data.images[1].alt)}" loading="lazy">
          </div>
        </article>
      `;
      
      resultContainer.innerHTML = html;
      resultContainer.style.display = 'block';
    } else {
      resultContainer.innerHTML = '<p class="error-text">Please select a country to see recommendations.</p>';
      resultContainer.style.display = 'block';
    }
  }

  /**
   * Handles country recommendation button click
   */
  function handleCountryRecommendation() {
    const countrySelect = document.getElementById('country-select');
    
    if (!countrySelect) {
      console.error('Country select element not found');
      return;
    }

    const selectedCountry = countrySelect.value;
    
    if (!selectedCountry) {
      const resultContainer = document.getElementById('country-result');
      if (resultContainer) {
        resultContainer.innerHTML = '<p class="warning-text">⚠ Please select a country from the dropdown menu.</p>';
        resultContainer.style.display = 'block';
      }
      return;
    }

    renderCountryRecommendation(selectedCountry);
  }

  /**
   * Validates email format
   * @param {string} email - Email address to validate
   * @returns {boolean} True if valid email format
   */
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Validates a form field
   * @param {HTMLInputElement|HTMLTextAreaElement} field - Form field to validate
   * @returns {boolean} True if field is valid
   */
  function validateField(field) {
    const errorElement = document.getElementById(`${field.id}-error`);
    let isValid = true;
    let errorMessage = '';

    // Check if field is empty
    if (!field.value.trim()) {
      isValid = false;
      errorMessage = `${field.name.charAt(0).toUpperCase() + field.name.slice(1)} is required.`;
    } else if (field.type === 'email' && !isValidEmail(field.value.trim())) {
      isValid = false;
      errorMessage = 'Please enter a valid email address.';
    } else if (field.id === 'message' && field.value.trim().length < 10) {
      isValid = false;
      errorMessage = 'Message must be at least 10 characters long.';
    }

    // Display error message
    if (errorElement) {
      errorElement.textContent = errorMessage;
      errorElement.style.display = isValid ? 'none' : 'block';
    }

    // Add/remove error styling
    if (isValid) {
      field.classList.remove('error');
      field.classList.add('valid');
    } else {
      field.classList.add('error');
      field.classList.remove('valid');
    }

    return isValid;
  }

  /**
   * Handles contact form submission
   * @param {Event} event - Form submit event
   */
  function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const successMessage = document.getElementById('success-message');

    // Validate all fields
    const isNameValid = validateField(nameField);
    const isEmailValid = validateField(emailField);
    const isMessageValid = validateField(messageField);

    // If all fields are valid, show success message
    if (isNameValid && isEmailValid && isMessageValid) {
      // Hide form and show success message
      form.style.display = 'none';
      if (successMessage) {
        successMessage.style.display = 'block';
      }

      // Reset form after 3 seconds and hide success message
      setTimeout(() => {
        form.reset();
        form.style.display = 'block';
        if (successMessage) {
          successMessage.style.display = 'none';
        }
        // Clear validation states
        [nameField, emailField, messageField].forEach(field => {
          field.classList.remove('error', 'valid');
          const errorElement = document.getElementById(`${field.id}-error`);
          if (errorElement) {
            errorElement.style.display = 'none';
          }
        });
      }, 3000);
    }
  }

  /**
   * Escapes HTML to prevent XSS attacks
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /**
   * Initializes event listeners when DOM is ready
   */
  function initializeEventListeners() {
    // Country recommendation functionality
    const recommendBtn = document.getElementById('recommend-btn');
    if (recommendBtn) {
      recommendBtn.addEventListener('click', handleCountryRecommendation);
    }

    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', handleFormSubmit);

      // Real-time validation on blur
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');

      if (nameField) {
        nameField.addEventListener('blur', () => validateField(nameField));
      }
      if (emailField) {
        emailField.addEventListener('blur', () => validateField(emailField));
      }
      if (messageField) {
        messageField.addEventListener('blur', () => validateField(messageField));
      }
    }
  }

  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
  } else {
    initializeEventListeners();
  }

})();
