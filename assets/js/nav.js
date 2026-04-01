/* nav.js — Shared navigation logic */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const mobile = document.getElementById('nav-mobile');

  if (toggle && mobile) {
    toggle.addEventListener('click', () => {
      const isOpen = mobile.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
    });

    // Close on link click
    mobile.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobile.classList.remove('open');
        toggle.classList.remove('open');
      });
    });
  }
})();
