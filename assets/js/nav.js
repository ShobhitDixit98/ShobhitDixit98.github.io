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

  /* ── Typewriter Effect for Page Subtitles ── */
  const subtitles = document.querySelectorAll('.page-subtitle');
  subtitles.forEach(sub => {
    // Save original HTML and clear it out
    const htmlText = sub.innerHTML.trim();
    if (!htmlText) return;
    
    sub.innerHTML = '';
    sub.style.opacity = '1'; 
    
    let i = 0;
    let isTag = false;
    let currentHtml = '';
    
    function type() {
      if (i < htmlText.length) {
        let char = htmlText.charAt(i);
        
        // Handle HTML tags (e.g., <br>)
        if (char === '<') {
          isTag = true;
        } 
        // Handle HTML entities (e.g., &amp;)
        else if (char === '&' && !isTag) {
          let entity = '';
          while (i < htmlText.length && htmlText.charAt(i) !== ';') {
            entity += htmlText.charAt(i);
            i++;
          }
          if (i < htmlText.length) {
            entity += htmlText.charAt(i); // include the ';'
          }
          currentHtml += entity;
          sub.innerHTML = currentHtml + '<span class="type-cursor"></span>';
          i++; // move past ';'
          setTimeout(type, 18);
          return;
        }

        currentHtml += char;
        if (char === '>') isTag = false;
        
        i++;
        
        if (isTag) {
           type(); // immediately recurse for HTML tags
        } else {
           sub.innerHTML = currentHtml + '<span class="type-cursor"></span>';
           setTimeout(type, 18); // typing speed
        }
      } else {
        // Finish typing, keep cursor blinking briefly
        sub.innerHTML = currentHtml + '<span class="type-cursor blink"></span>';
        setTimeout(() => {
          const cursor = sub.querySelector('.type-cursor');
          if (cursor) cursor.style.display = 'none';
        }, 3500);
      }
    }
    
    // Start after page fade-in (400ms CSS + 300ms buffer)
    setTimeout(type, 700);
  });

})();
