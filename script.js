(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  var systemLight = window.matchMedia("(prefers-color-scheme: light)");

  function currentTheme() {
    return root.dataset.theme === "light" ? "light" : "dark";
  }

  function updateThemeControls() {
    var theme = currentTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.setAttribute("aria-label", theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему");
      button.setAttribute("title", theme === "dark" ? "Светлая тема" : "Тёмная тема");
    });

    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "light" ? "#ecece5" : "#07100d");
    }
  }

  function applyTheme(theme, persist) {
    root.dataset.theme = theme;
    if (persist) {
      try {
        localStorage.setItem("bill-theme", theme);
      } catch (_error) {
        // Theme persistence is optional; the interface still works without storage.
      }
    }
    updateThemeControls();
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
    button.addEventListener("click", function () {
      applyTheme(currentTheme() === "dark" ? "light" : "dark", true);
    });
  });

  systemLight.addEventListener("change", function (event) {
    try {
      if (!localStorage.getItem("bill-theme")) {
        applyTheme(event.matches ? "light" : "dark", false);
      }
    } catch (_error) {
      applyTheme(event.matches ? "light" : "dark", false);
    }
  });

  updateThemeControls();

  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.hidden = !open;
    document.body.toggleAttribute("data-menu-open", open);
    var label = menuToggle.querySelector(".sr-only");
    if (label) label.textContent = open ? "Закрыть меню" : "Открыть меню";
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        setMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        menuToggle.focus();
      }
    });

    window.matchMedia("(min-width: 901px)").addEventListener("change", function (event) {
      if (event.matches) setMenu(false);
    });
  }

  requestAnimationFrame(function () {
    requestAnimationFrame(function () {
      root.classList.add("is-ready");
    });
  });

  var reveals = Array.from(document.querySelectorAll(".reveal"));
  if (reduceMotion.matches || !("IntersectionObserver" in window)) {
    reveals.forEach(function (element) {
      element.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6%" },
    );
    reveals.forEach(function (element) {
      revealObserver.observe(element);
    });
  }

  var tabList = document.querySelector('[role="tablist"]');
  var tabs = Array.from(document.querySelectorAll("[data-case-tab]"));
  var panels = Array.from(document.querySelectorAll("[data-case-panel]"));

  function activateTab(nextTab, focus) {
    if (!nextTab) return;
    var caseName = nextTab.dataset.caseTab;
    tabs.forEach(function (tab) {
      var active = tab === nextTab;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.dataset.casePanel !== caseName;
    });
    if (focus) nextTab.focus();
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      activateTab(tab, false);
    });
  });

  if (tabList) {
    tabList.addEventListener("keydown", function (event) {
      var activeIndex = tabs.findIndex(function (tab) {
        return tab.getAttribute("aria-selected") === "true";
      });
      var nextIndex = activeIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (activeIndex + 1) % tabs.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = tabs.length - 1;
      if (nextIndex !== activeIndex) {
        event.preventDefault();
        activateTab(tabs[nextIndex], true);
      }
    });
  }

  var magneticElements = Array.from(document.querySelectorAll("[data-magnetic]"));
  var magneticFrame = 0;
  var pointer = { x: -1000, y: -1000 };

  function resetMagnetic() {
    magneticElements.forEach(function (element) {
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
    });
  }

  function renderMagnetic() {
    magneticFrame = 0;
    if (!finePointer.matches || reduceMotion.matches) {
      resetMagnetic();
      return;
    }

    magneticElements.forEach(function (element) {
      var rect = element.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var deltaX = pointer.x - centerX;
      var deltaY = pointer.y - centerY;
      var distance = Math.hypot(deltaX, deltaY);
      var radius = element.classList.contains("field-node") || element.classList.contains("field-core") ? 180 : 110;
      var strength = Number(element.dataset.magneticStrength || 0.12);
      var influence = Math.max(0, 1 - distance / radius);
      var maxOffset = element.classList.contains("field-node") ? 6 : 4;
      var offsetX = Math.max(-maxOffset, Math.min(maxOffset, deltaX * strength * influence));
      var offsetY = Math.max(-maxOffset, Math.min(maxOffset, deltaY * strength * influence));
      element.style.setProperty("--mx", offsetX.toFixed(2) + "px");
      element.style.setProperty("--my", offsetY.toFixed(2) + "px");
    });
  }

  function scheduleMagnetic() {
    if (!magneticFrame) magneticFrame = requestAnimationFrame(renderMagnetic);
  }

  if (magneticElements.length) {
    window.addEventListener(
      "pointermove",
      function (event) {
        pointer.x = event.clientX;
        pointer.y = event.clientY;
        scheduleMagnetic();
      },
      { passive: true },
    );
    document.documentElement.addEventListener("pointerleave", resetMagnetic);
    reduceMotion.addEventListener("change", scheduleMagnetic);
    finePointer.addEventListener("change", scheduleMagnetic);
  }

  var fieldNodes = Array.from(document.querySelectorAll(".field-node"));
  fieldNodes.forEach(function (activeNode) {
    activeNode.addEventListener("pointerenter", function () {
      if (!finePointer.matches || reduceMotion.matches) return;
      var activeRect = activeNode.getBoundingClientRect();
      var activeX = activeRect.left + activeRect.width / 2;
      var activeY = activeRect.top + activeRect.height / 2;
      fieldNodes.forEach(function (otherNode) {
        if (otherNode === activeNode) return;
        var rect = otherNode.getBoundingClientRect();
        var deltaX = activeX - (rect.left + rect.width / 2);
        var deltaY = activeY - (rect.top + rect.height / 2);
        var distance = Math.max(1, Math.hypot(deltaX, deltaY));
        otherNode.style.setProperty("--ax", ((deltaX / distance) * 3).toFixed(2) + "px");
        otherNode.style.setProperty("--ay", ((deltaY / distance) * 3).toFixed(2) + "px");
      });
    });
    activeNode.addEventListener("pointerleave", function () {
      fieldNodes.forEach(function (node) {
        node.style.setProperty("--ax", "0px");
        node.style.setProperty("--ay", "0px");
      });
    });
  });

  document.querySelectorAll("[data-track]").forEach(function (control) {
    control.addEventListener("click", function () {
      document.dispatchEvent(
        new CustomEvent("bill:cta", {
          detail: { placement: control.dataset.track },
        }),
      );
    });
  });

  var form = document.querySelector("[data-application-form]");
  if (!form) return;

  var submitButton = form.querySelector("[data-submit]");
  var submitLabel = form.querySelector("[data-submit-label]");
  var responseBox = form.querySelector("[data-form-response]");
  var fallbackBox = form.querySelector("[data-form-fallback]");
  var copyButton = form.querySelector("[data-copy-application]");
  var retryButton = form.querySelector("[data-retry-application]");
  var utmNames = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  var inFlight = false;

  var query = new URLSearchParams(window.location.search);
  utmNames.forEach(function (name) {
    var field = form.elements.namedItem(name);
    if (field) field.value = query.get(name) || "";
  });

  function showResponse(message, state) {
    responseBox.textContent = message;
    if (state) responseBox.dataset.state = state;
    else delete responseBox.dataset.state;
  }

  function setLoading(loading) {
    inFlight = loading;
    submitButton.disabled = loading;
    submitButton.setAttribute("aria-busy", String(loading));
    submitButton.classList.toggle("is-loading", loading);
    submitLabel.textContent = loading ? "Отправляем" : "Отправить заявку";
  }

  function valueOf(name) {
    var field = form.elements.namedItem(name);
    return field ? String(field.value || "").trim() : "";
  }

  function buildPayload() {
    var payload = {
      name: valueOf("name"),
      company: valueOf("company"),
      contact: valueOf("contact"),
    };
    utmNames.forEach(function (name) {
      payload[name] = valueOf(name);
    });
    return payload;
  }

  function validateField(field, message) {
    field.setCustomValidity(message || "");
    field.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateForm() {
    var name = form.elements.namedItem("name");
    var company = form.elements.namedItem("company");
    var contact = form.elements.namedItem("contact");
    var consent = form.elements.namedItem("consent");

    validateField(name, valueOf("name").length < 2 ? "Укажите имя — минимум два символа." : "");
    validateField(company, valueOf("company").length < 2 ? "Укажите компанию — минимум два символа." : "");
    validateField(contact, valueOf("contact").length < 3 ? "Укажите телефон, email или Telegram." : "");
    validateField(consent, consent.checked ? "" : "Подтвердите согласие на обработку персональных данных.");

    return form.checkValidity();
  }

  ["name", "company", "contact"].forEach(function (name) {
    var field = form.elements.namedItem(name);
    field.addEventListener("input", function () {
      validateField(field, "");
      if (responseBox.dataset.state === "error") showResponse("", "");
    });
  });

  form.elements.namedItem("consent").addEventListener("change", function (event) {
    validateField(event.target, "");
  });

  async function submitApplication() {
    if (inFlight) return;
    fallbackBox.hidden = true;
    showResponse("", "");

    if (!validateForm()) {
      form.reportValidity();
      showResponse("Проверьте отмеченные поля.", "error");
      return;
    }

    var payload = buildPayload();
    var endpoint = String((window.BILL_CONFIG && window.BILL_CONFIG.formEndpoint) || "").trim();
    setLoading(true);

    try {
      if (!endpoint) {
        var missingEndpointError = new Error("FORM_ENDPOINT_NOT_CONFIGURED");
        missingEndpointError.code = "FORM_ENDPOINT_NOT_CONFIGURED";
        throw missingEndpointError;
      }

      var controller = new AbortController();
      var timeout = window.setTimeout(function () {
        controller.abort();
      }, 12000);

      var response;
      try {
        response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          credentials: "same-origin",
          signal: controller.signal,
          body: JSON.stringify(payload),
        });
      } finally {
        window.clearTimeout(timeout);
      }

      if (!response.ok) {
        throw new Error("HTTP_" + response.status);
      }

      showResponse("Заявка отправлена. Мы свяжемся с вами по указанному контакту.", "success");
      form.reset();
      utmNames.forEach(function (name) {
        var field = form.elements.namedItem(name);
        if (field) field.value = query.get(name) || "";
      });
      document.dispatchEvent(new CustomEvent("bill:lead-success", { detail: { source: "application-form" } }));
    } catch (error) {
      var noEndpoint = error && error.code === "FORM_ENDPOINT_NOT_CONFIGURED";
      var message = noEndpoint
        ? "Сервис отправки пока настраивается. Данные никуда не переданы и остались в форме."
        : "Не удалось отправить заявку. Данные остались в форме — можно повторить или скопировать их.";
      showResponse(message, "error");
      fallbackBox.hidden = false;
    } finally {
      setLoading(false);
    }
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitApplication();
  });

  retryButton.addEventListener("click", function () {
    submitApplication();
  });

  copyButton.addEventListener("click", async function () {
    var payload = buildPayload();
    var copyText = [
      "Заявка на подключение Bill.su",
      "Имя: " + payload.name,
      "Компания: " + payload.company,
      "Контакт: " + payload.contact,
    ].join("\n");

    try {
      await navigator.clipboard.writeText(copyText);
      showResponse("Данные заявки скопированы.", "success");
    } catch (_error) {
      var textarea = document.createElement("textarea");
      textarea.value = copyText;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      var copied = document.execCommand("copy");
      textarea.remove();
      showResponse(copied ? "Данные заявки скопированы." : "Не удалось скопировать данные автоматически.", copied ? "success" : "error");
    }
  });
})();
