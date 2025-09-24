// AOS init
AOS.init({ duration: 900, once: true });

// Swiper (testimonials)
new Swiper(".mySwiper", {
  loop: true,
  autoplay: { delay: 3500, disableOnInteraction: false },
  pagination: { el: ".swiper-pagination", clickable: true },
  slidesPerView: 1,
  spaceBetween: 24,
  breakpoints: {
    768: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  }
});

// Animated counters (About stats)
(function(){
  const counters = document.querySelectorAll(".counter");
  if(!counters.length) return;

  const animate = (el) => {
    const target = +el.dataset.target;
    const step = Math.max(1, Math.ceil(target / 120)); // ~2s
    let n = 0;
    const tick = () => {
      n += step;
      if(n < target){ el.textContent = n; requestAnimationFrame(tick); }
      else { el.textContent = target; }
    };
    tick();
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e=>{
      if(e.isIntersecting){
        counters.forEach(animate);
        io.disconnect();
      }
    });
  }, { threshold: 0.3 });

  io.observe(document.querySelector("#about"));
})();

// Smooth scroll for nav links
document.querySelectorAll('a.nav-link[href^="#"]').forEach(a=>{
  a.addEventListener("click", (e)=>{
    const id = a.getAttribute("href");
    const el = document.querySelector(id);
    if(el){
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.pageYOffset - 70;
      window.scrollTo({ top: y, behavior: "smooth" });
      const nav = document.getElementById("nav");
      if(nav.classList.contains("show")) new bootstrap.Collapse(nav).hide();
    }
  });
});
