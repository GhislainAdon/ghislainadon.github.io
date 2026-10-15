// Language toggle (remembered), uptime since 2020, scroll reveals.
(function () {
  const root = document.documentElement;
  const saved = localStorage.getItem("lang");
  const initial = saved || ((navigator.language || "fr").startsWith("fr") ? "fr" : "en");
  setLang(initial);

  document.getElementById("langToggle").addEventListener("click", () => {
    setLang(root.dataset.lang === "fr" ? "en" : "fr");
  });

  function setLang(l) {
    root.dataset.lang = l;
    root.lang = l;
    localStorage.setItem("lang", l);
  }

  const start = new Date(2020, 7, 1);
  const months = (new Date().getFullYear() - start.getFullYear()) * 12 + new Date().getMonth() - start.getMonth();
  document.getElementById("uptime").textContent = `${Math.floor(months / 12)}y ${months % 12}m`;
  document.getElementById("year").textContent = new Date().getFullYear();

  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in-view");
          e.target.style.opacity = "";
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll(".stage, .card, .certs li, .values").forEach((el, i) => {
      el.style.opacity = "0";
      el.style.animationDelay = `${(i % 7) * 70}ms`;
      io.observe(el);
    });
  }
})();
