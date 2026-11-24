// Shared navigation, scroll helpers, form validation and AJAX demonstration.
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    navLinks.classList.remove("open"); menuToggle.setAttribute("aria-expanded", "false");
  }));
}
const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
const progress = document.getElementById("scrollProgress"), backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = `${scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0}%`;
  if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
});
if (backTop) backTop.addEventListener("click", () => window.scrollTo({top:0,behavior:"smooth"}));
const form = document.getElementById("contactForm");
if (form) form.addEventListener("submit", async event => {
  event.preventDefault();
  const status = document.getElementById("formStatus");
  if (!form.reportValidity()) return;
  const payload = Object.fromEntries(new FormData(form).entries());
  status.textContent = "Sending demonstration request…";
  try {
    // AJAX demo: JSONPlaceholder is a public test API, not a real message service.
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(payload)
    });
    if (!response.ok) throw new Error("Request failed");
    const result = await response.json();
    status.textContent = `Demo request submitted successfully (test record #${result.id}). This does not send an email.`;
    form.reset();
  } catch (error) {
    status.textContent = "The demo API could not be reached. Please check your internet connection; no message was sent.";
  }
});
