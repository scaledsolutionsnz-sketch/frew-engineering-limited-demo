/* Frew Engineering Limited — site interactions */
(function(){
  "use strict";

  /* ---- intro overlay ---- */
  var intro = document.getElementById('intro');
  if(intro){
    window.addEventListener('load', function(){
      setTimeout(function(){ intro.classList.add('done'); }, 1400);
    });
    // safety: never trap the page
    setTimeout(function(){ intro.classList.add('done'); }, 2600);
  }

  /* ---- nav: scroll state + mobile menu ---- */
  var nav = document.querySelector('.nav');
  var burger = document.querySelector('.hamburger');
  var links = document.querySelector('.nav-links');
  function onScroll(){
    if(!nav) return;
    if(window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  if(burger && links){
    burger.addEventListener('click', function(){
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        burger.classList.remove('open');
        links.classList.remove('open');
      });
    });
  }

  /* ---- hero slideshow ---- */
  var slides = document.querySelectorAll('.hero-slide');
  if(slides.length > 1){
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(!reduce){
      var i = 0;
      // lazy-load the non-first slides
      slides.forEach(function(s, idx){
        if(idx !== 0){
          var bg = s.getAttribute('data-bg');
          if(bg) s.style.backgroundImage = "url('" + bg + "')";
        }
      });
      setInterval(function(){
        slides[i].classList.remove('active');
        i = (i + 1) % slides.length;
        slides[i].classList.add('active');
      }, 5200);
    }
  }

  /* ---- reveal on scroll ---- */
  var reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    reveals.forEach(function(r){ io.observe(r); });
  } else {
    reveals.forEach(function(r){ r.classList.add('in'); });
  }

  /* ---- build email address + gmail compose links (Cloudflare-safe) ---- */
  document.querySelectorAll('a[data-gmail]').forEach(function(a){
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });
  // render the plain email text where needed
  document.querySelectorAll('[data-email]').forEach(function(el){
    el.textContent = el.getAttribute('data-user') + '@' + el.getAttribute('data-domain');
  });

  /* ---- current year ---- */
  document.querySelectorAll('[data-year]').forEach(function(el){
    el.textContent = new Date().getFullYear();
  });
})();
