// ===== Navigation interactivity: mobile menu + dropdown =====
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.getElementById('navbar');
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const desktopQuery = window.matchMedia('(min-width: 901px)');

  // --- Mobile hamburger menu ---
  function closeMobileMenu() {
    if (!navbar) return;
    navbar.classList.remove('open');
    document.body.classList.remove('menu-open');
    if (menuToggle) {
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    closeDropdown();
  }

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navbar.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      document.body.classList.toggle('menu-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // Close drawer when a nav link is clicked
  if (navbar) {
    navbar.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (!desktopQuery.matches) closeMobileMenu();
      });
    });
  }

  // --- Dropdown ("AI Solutions") ---
  function openDropdown() {
    if (!dropdown) return;
    dropdown.classList.add('open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'true');
  }

  function closeDropdown() {
    if (!dropdown) return;
    dropdown.classList.remove('open');
    if (dropdownToggle) dropdownToggle.setAttribute('aria-expanded', 'false');
  }

  function isDropdownOpen() {
    return dropdown ? dropdown.classList.contains('open') : false;
  }

  if (dropdownToggle) {
    dropdownToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      isDropdownOpen() ? closeDropdown() : openDropdown();
    });
  }

  // Desktop: open on hover, close when leaving the dropdown area
  if (dropdown) {
    dropdown.addEventListener('mouseenter', () => {
      if (desktopQuery.matches) openDropdown();
    });
    dropdown.addEventListener('mouseleave', () => {
      if (desktopQuery.matches) closeDropdown();
    });
  }

  // Close dropdowns/menus when clicking anywhere outside
  document.addEventListener('click', (e) => {
    if (dropdown && !dropdown.contains(e.target)) closeDropdown();
    if (navbar && menuToggle &&
        !navbar.contains(e.target) &&
        !menuToggle.contains(e.target) &&
        !desktopQuery.matches) {
      closeMobileMenu();
    }
  });

  // Keyboard: Escape closes dropdown first, then mobile menu
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (isDropdownOpen()) {
      closeDropdown();
      if (dropdownToggle) dropdownToggle.focus();
    } else if (navbar && navbar.classList.contains('open')) {
      closeMobileMenu();
      if (menuToggle) menuToggle.focus();
    }
  });

  // Reset menu state when crossing the breakpoint (e.g. rotate tablet)
  const onBreakpointChange = () => closeMobileMenu();
  if (desktopQuery.addEventListener) {
    desktopQuery.addEventListener('change', onBreakpointChange);
  } else if (desktopQuery.addListener) {
    desktopQuery.addListener(onBreakpointChange); // legacy Safari
  }
});
