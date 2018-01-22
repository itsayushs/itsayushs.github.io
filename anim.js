window.sr = ScrollReveal();
sr.reveal('.navbar', {
  duration: 1000,
  origin: 'bottom'
});
sr.reveal('#ayush', {
  duration: 700,
  delay: 800,
  origin: 'left',
  distance: '800px'
});
sr.reveal('.ptext', {
  duration: 700,
  origin: 'top',
  distance: '300px'
});
sr.reveal('#shand', {
  duration: 700,
  delay: 1000,
  origin: 'left',
  distance: '800px'
});
// for skill section
sr.reveal('.showcase-left', {
  duration: 2000,
  origin: 'left',
  distance: '300px',
  viewFactor: 0.2,
  delay: 500
});
sr.reveal('.skillset', {
  duration: 2000,
  origin: 'left',
  distance: '300px',
  viewFactor: 0.2
});
// for project
sr.reveal('.showcase-right', {
  duration: 2000,
  origin: 'right',
  distance: '300px',
  delay: 500,
  viewFactor: 0.5
});
sr.reveal('.proj', {
  duration: 1000,
  origin: 'left',
  distance: '300px',
  viewFactor: 0.35
});
// aboutme
sr.reveal('.prof', {
  duration: 1000,
  origin: 'top',
  distance: '300px',
  viewFactor: 0.2
});
sr.reveal('.abtme', {
  duration: 1000,
  origin: 'right',
  distance: '300px',
  viewFactor: 0.2
});
sr.reveal('.intr', {
  duration: 1000,
  origin: 'left',
  distance: '300px',
  viewFactor: 0.2
});
// smooothscroll effect from stack overflow
$(function() {
  // Smooth Scrolling
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
