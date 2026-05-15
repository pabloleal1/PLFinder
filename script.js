const headerMount = document.getElementById("siteHeader");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isHomePage = currentPage === "index.html";

if (headerMount) {
  const homeLink = isHomePage ? "#top" : "index.html";
  const sectionHref = (id) => (isHomePage ? `#${id}` : `index.html#${id}`);

  headerMount.innerHTML = `
    <header class="site-header" id="top">
      <div class="container header-inner">
        <a href="${homeLink}" class="brand" aria-label="PLFinder inicio">
          <img src="assets/plfinder-logo.jpeg" alt="PLFinder" class="brand-logo" />
          <div><span>QA & Testing Partner</span></div>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="main-nav" id="mainNav">
          <a href="${sectionHref("digital-quality")}">Calidad digital</a>
          <a href="${sectionHref("iqa")}">iQA</a>
          <a href="${sectionHref("method")}">Método</a>
          <a href="servicios.html">Servicios</a>
          <a href="testing-software.html">Testing software</a>
          <a href="${sectionHref("contact")}">Contacto</a>
        </nav>
        <a href="${sectionHref("contact")}" class="header-cta">Habla con nosotros</a>
      </div>
    </header>
  `;
}

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const navLinks = mainNav ? Array.from(mainNav.querySelectorAll("a")) : [];
const year = document.getElementById("year");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const setActiveNavLink = (href) => {
  navLinks.forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("href") === href);
  });
};

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");

      const href = link.getAttribute("href");
      if (href && href.startsWith("#")) {
        setActiveNavLink(href);
      }
    });
  });
}

const sectionLinks = navLinks.filter((link) => {
  const href = link.getAttribute("href");
  return href && href.startsWith("#") && href !== "#top";
});

const pagePath = currentPage;
const pageLink = navLinks.find((link) => link.getAttribute("href") === pagePath);

if (pageLink) {
  setActiveNavLink(pageLink.getAttribute("href"));
} else if (sectionLinks.length) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visibleEntry) {
        setActiveNavLink(`#${visibleEntry.target.id}`);
      }
    },
    {
      rootMargin: "-35% 0px -45% 0px",
      threshold: [0.12, 0.28, 0.48]
    }
  );

  sectionLinks.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) {
      sectionObserver.observe(section);
    }
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
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const name = data.get("name");
    const email = data.get("email");
    const company = data.get("company");
    const message = data.get("message");
    const submitButton = contactForm.querySelector("button[type='submit']");

    formMessage.textContent = "Enviando solicitud...";
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, company, message })
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      contactForm.reset();
      formMessage.textContent = "Solicitud enviada. Te responderemos lo antes posible.";
    } catch (error) {
      formMessage.textContent = "No se pudo enviar la solicitud. Escríbenos a PLFinder@outlook.es.";
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
