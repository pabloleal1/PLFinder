const headerMount = document.getElementById("siteHeader");
const currentPage = window.location.pathname.split("/").pop() || "index.html";
const isHomePage = currentPage === "index.html";
const availableLanguages = {
  es: { label: "🇪🇸 ES", path: "" },
  en: { label: "🇬🇧 EN", path: "en" },
  fr: { label: "🇫🇷 FR", path: "fr" },
  pt: { label: "🇵🇹 PT", path: "pt" }
};
const languageCodes = Object.keys(availableLanguages);
const headerCopy = {
  es: {
    brandLabel: "PLFinder inicio",
    tagline: "QA & Testing Partner",
    menuLabel: "Abrir menú",
    digitalQuality: "Calidad digital",
    testingTypes: [
      { title: "Testing funcional manual", href: "testing-software.html" },
      { title: "Testing funcional automatizado", href: "automatizacion-pruebas.html" },
      { title: "Testing web y mobile", href: "testing-web-mobile.html" },
      { title: "Accesibilidad", href: "accesibilidad.html" },
      { title: "Testing de back", href: "testing-apis.html" },
      { title: "Usabilidad", href: "usabilidad.html" }
    ],
    method: "Cómo trabajamos",
    services: "Servicios",
    contact: "Contacto",
    cta: "Habla con nosotros",
    languageLabel: "Seleccionar idioma",
    sending: "Enviando solicitud...",
    success: "Solicitud enviada. Te responderemos lo antes posible.",
    error: "No se pudo enviar la solicitud. Escríbenos a PLFinder@outlook.es."
  },
  en: {
    brandLabel: "PLFinder home",
    tagline: "QA & Testing Partner",
    menuLabel: "Open menu",
    digitalQuality: "Digital quality",
    testingTypes: [
      { title: "Manual functional testing", href: "testing-software.html" },
      { title: "Automated functional testing", href: "automatizacion-pruebas.html" },
      { title: "Web and mobile testing", href: "testing-web-mobile.html" },
      { title: "Accessibility", href: "accesibilidad.html" },
      { title: "Backend testing", href: "testing-apis.html" },
      { title: "Usability", href: "usabilidad.html" }
    ],
    method: "How we work",
    services: "Services",
    contact: "Contact",
    cta: "Talk to us",
    languageLabel: "Select language",
    sending: "Sending request...",
    success: "Request sent. We will get back to you as soon as possible.",
    error: "We could not send the request. Email us at PLFinder@outlook.es."
  },
  fr: {
    brandLabel: "Accueil PLFinder",
    tagline: "Partenaire QA & Testing",
    menuLabel: "Ouvrir le menu",
    digitalQuality: "Qualité digitale",
    testingTypes: [
      { title: "Testing fonctionnel manuel", href: "testing-software.html" },
      { title: "Testing fonctionnel automatisé", href: "automatizacion-pruebas.html" },
      { title: "Testing web et mobile", href: "testing-web-mobile.html" },
      { title: "Accessibilité", href: "accesibilidad.html" },
      { title: "Testing backend", href: "testing-apis.html" },
      { title: "Utilisabilité", href: "usabilidad.html" }
    ],
    method: "Comment nous travaillons",
    services: "Services",
    contact: "Contact",
    cta: "Parlons-en",
    languageLabel: "Choisir la langue",
    sending: "Envoi de la demande...",
    success: "Demande envoyée. Nous vous répondrons dès que possible.",
    error: "La demande n'a pas pu être envoyée. Écrivez-nous à PLFinder@outlook.es."
  },
  pt: {
    brandLabel: "Início PLFinder",
    tagline: "Parceiro QA & Testing",
    menuLabel: "Abrir menu",
    digitalQuality: "Qualidade digital",
    testingTypes: [
      { title: "Testing funcional manual", href: "testing-software.html" },
      { title: "Testing funcional automatizado", href: "automatizacion-pruebas.html" },
      { title: "Testing web e mobile", href: "testing-web-mobile.html" },
      { title: "Acessibilidade", href: "accesibilidad.html" },
      { title: "Testing de backend", href: "testing-apis.html" },
      { title: "Usabilidade", href: "usabilidad.html" }
    ],
    method: "Como trabalhamos",
    services: "Serviços",
    contact: "Contacto",
    cta: "Fale connosco",
    languageLabel: "Selecionar idioma",
    sending: "A enviar pedido...",
    success: "Pedido enviado. Responderemos o mais brevemente possível.",
    error: "Não foi possível enviar o pedido. Escreva-nos para PLFinder@outlook.es."
  }
};

const getCurrentLanguage = () => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);

  if (window.location.protocol === "file:") {
    const parentDirectory = pathSegments[pathSegments.length - 2];
    return languageCodes.includes(parentDirectory) ? parentDirectory : "es";
  }

  const firstPathSegment = pathSegments[0];
  return languageCodes.includes(firstPathSegment) ? firstPathSegment : "es";
};

const currentLanguage = getCurrentLanguage();
const copy = headerCopy[currentLanguage] || headerCopy.es;
const assetPrefix = currentLanguage === "es" ? "" : "../";

const getBasePagePath = () => {
  const pathSegments = window.location.pathname.split("/").filter(Boolean);

  if (window.location.protocol === "file:") {
    return pathSegments[pathSegments.length - 1] || "index.html";
  }

  if (languageCodes.includes(pathSegments[0])) {
    pathSegments.shift();
  }

  return pathSegments.join("/") || "index.html";
};

const getLocalizedUrl = (language) => {
  const languageConfig = availableLanguages[language] || availableLanguages.es;
  const basePagePath = getBasePagePath();
  const isHomePath = basePagePath === "index.html";
  const pagePath = isHomePath && window.location.protocol !== "file:" ? "" : basePagePath;

  if (language === currentLanguage) {
    return window.location.href;
  }

  if (currentLanguage === "es") {
    return languageConfig.path
      ? `${languageConfig.path}/${pagePath}${window.location.hash}`
      : `${pagePath || "index.html"}${window.location.hash}`;
  }

  return languageConfig.path
    ? `../${languageConfig.path}/${pagePath}${window.location.hash}`
    : `../${pagePath || "index.html"}${window.location.hash}`;
};

if (headerMount) {
  const homeLink = isHomePage ? "#top" : "index.html";
  const sectionHref = (id) => (isHomePage ? `#${id}` : `index.html#${id}`);
  const testingTypeLinks = copy.testingTypes
    .map((item) => `
      <a href="${item.href}" class="nav-dropdown-link">${item.title}</a>
    `)
    .join("");

  headerMount.innerHTML = `
    <header class="site-header" id="top">
      <div class="container header-inner">
        <a href="${homeLink}" class="brand" aria-label="${copy.brandLabel}">
          <img src="${assetPrefix}assets/plfinder-logo.jpeg" alt="PLFinder" class="brand-logo" />
          <div><span>${copy.tagline}</span></div>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="${copy.menuLabel}" aria-expanded="false">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav class="main-nav" id="mainNav">
          <div class="nav-dropdown">
            <button type="button" class="nav-dropdown-trigger" aria-haspopup="true">
              ${copy.digitalQuality}
              <span aria-hidden="true">v</span>
            </button>
            <div class="nav-dropdown-menu">
              ${testingTypeLinks}
            </div>
          </div>
          <a href="${sectionHref("method")}">${copy.method}</a>
          <a href="servicios.html">${copy.services}</a>
          <a href="${sectionHref("contact")}" class="nav-contact-link">${copy.contact}</a>
        </nav>
        <div class="header-actions">
          <a href="${sectionHref("contact")}" class="header-cta">${copy.cta}</a>
          <label class="language-switcher" for="languageSelect" aria-label="${copy.languageLabel}">
            <select id="languageSelect" name="language">
              ${Object.entries(availableLanguages)
                .map(([code, language]) => `<option value="${code}">${language.label}</option>`)
                .join("")}
            </select>
          </label>
        </div>
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
const messageInput = document.getElementById("message");
const messageCount = document.getElementById("messageCount");
const languageSelect = document.getElementById("languageSelect");

document.documentElement.lang = currentLanguage;

if (languageSelect) {
  languageSelect.value = currentLanguage;

  languageSelect.addEventListener("change", () => {
    const selectedLanguage = languageSelect.value;

    window.location.href = getLocalizedUrl(selectedLanguage);
  });
}

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

document.querySelectorAll(".faq-list").forEach((faqList, listIndex) => {
  faqList.classList.add("is-enhanced");

  faqList.querySelectorAll(".faq-item").forEach((item, itemIndex) => {
    const title = item.querySelector("h3");
    const answer = item.querySelector("p");

    if (!title || !answer) {
      return;
    }

    const answerId = `faq-answer-${listIndex}-${itemIndex}`;
    const button = document.createElement("button");

    answer.id = answerId;
    button.type = "button";
    button.className = "faq-toggle";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);
    button.setAttribute("aria-label", title.textContent.trim());
    button.textContent = "+";

    button.addEventListener("click", () => {
      const isOpen = item.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      button.textContent = isOpen ? "-" : "+";
    });

    item.prepend(button);
  });
});

if (messageInput && messageCount) {
  const maxLength = Number(messageInput.getAttribute("maxlength")) || 1000;
  const updateMessageCount = () => {
    messageCount.textContent = `${messageInput.value.length}/${maxLength}`;
  };

  messageInput.addEventListener("input", updateMessageCount);
  updateMessageCount();
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const submitButton = contactForm.querySelector("button[type='submit']");

    formMessage.textContent = copy.sending;
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: data
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error("Contact request failed");
      }

      contactForm.reset();
      formMessage.textContent = copy.success;
    } catch (error) {
      formMessage.textContent = copy.error;
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
