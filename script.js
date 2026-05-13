const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company");
    const message = data.get("message");

    const subject = encodeURIComponent("Solicitud de contacto desde web PLFinder");
    const body = encodeURIComponent(
      `Nombre: ${name}\nEmail: ${email}\nEmpresa: ${company || "-"}\n\nMensaje:\n${message}`
    );

    formMessage.textContent = "Abriendo tu cliente de correo...";
    window.location.href = `mailto:contact@plfinder.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      formMessage.textContent = "Si no se abrió el correo, escríbenos a contact@plfinder.com.";
    }, 1200);
  });
}
