"use strict";

const translations = {
  pt: {
    htmlLang: "pt-BR",
    documentTitle: "Ponte da Amizade ao vivo",
    live: "Ao vivo",
    title: "Ponte da Amizade",
    intro: "Escolha o sentido. O player abre separado, e esta tela fica aqui para trocar de câmera.",
    closeWindow: "Fechar janela",
    closeHint: "O navegador bloqueou o fechamento automático. Saindo desta tela...",
    cameraSection: "Selecionar câmera",
    cameraDirection: "Sentido da câmera",
    openCamera: "Abrir câmera em nova aba",
    openCameraLabel: "Abrir câmera {code} em nova aba",
    providerNote: "Para trocar de sentido, volte para esta tela e use o switch acima. O player externo não permite botões personalizados dentro dele.",
    routes: {
      brasil: {
        name: "Sentido Brasil",
        help: "Ciudad del Este para Foz do Iguaçu."
      },
      paraguai: {
        name: "Sentido Paraguai",
        help: "Foz do Iguaçu para Ciudad del Este."
      }
    }
  },
  es: {
    htmlLang: "es",
    documentTitle: "Puente de la Amistad en vivo",
    live: "En vivo",
    title: "Puente de la Amistad",
    intro: "Elige el sentido. El reproductor se abre por separado, y esta pantalla queda disponible para cambiar de cámara.",
    closeWindow: "Cerrar ventana",
    closeHint: "El navegador bloqueó el cierre automático. Saliendo de esta pantalla...",
    cameraSection: "Seleccionar cámara",
    cameraDirection: "Sentido de la cámara",
    openCamera: "Abrir cámara en una nueva pestaña",
    openCameraLabel: "Abrir cámara {code} en una nueva pestaña",
    providerNote: "Para cambiar de sentido, vuelve a esta pantalla y usa el selector de arriba. El reproductor externo no permite botones personalizados dentro de él.",
    routes: {
      brasil: {
        name: "Sentido Brasil",
        help: "Ciudad del Este hacia Foz do Iguaçu."
      },
      paraguai: {
        name: "Sentido Paraguay",
        help: "Foz do Iguaçu hacia Ciudad del Este."
      }
    }
  },
  "zh-Hant": {
    htmlLang: "zh-Hant",
    documentTitle: "友誼橋即時影像",
    live: "直播",
    title: "友誼橋",
    intro: "選擇行車方向。播放器會另外開啟，這個畫面保留用來切換攝影機。",
    closeWindow: "關閉視窗",
    closeHint: "瀏覽器阻擋了自動關閉。正在離開此畫面...",
    cameraSection: "選擇攝影機",
    cameraDirection: "攝影機方向",
    openCamera: "在新分頁開啟攝影機",
    openCameraLabel: "在新分頁開啟 {code} 攝影機",
    providerNote: "若要切換方向，請回到此畫面並使用上方切換器。外部播放器不支援在內部加入自訂按鈕。",
    routes: {
      brasil: {
        name: "往巴西方向",
        help: "東方市前往伊瓜蘇市。"
      },
      paraguai: {
        name: "往巴拉圭方向",
        help: "伊瓜蘇市前往東方市。"
      }
    }
  }
};

const cameras = {
  brasil: {
    code: "CDE → Foz",
    url: "https://playerv.logicahost.com.br/video-ip-camera/portovelhomamore//true/true/V2tjeGMyRXhjRmhQU0dSUFVYcFdlbGxxU210alJtdDVVbTA1YVUwd05IZFVSekZQWkcxS1ZFNVhiR3BhZWpBNStS/16:9/V1ZWb1UwMUhUa2xVVkZwTlpWUm5PUT09K1I=/fozpontedaamizadesentidobrasil.stream/?autoplay=1&muted=1"
  },
  paraguai: {
    code: "Foz → CDE",
    url: "https://playerv.logicahost.com.br/video-ip-camera/portovelhomamore//true/true/V2tjeGMyRXhjRmhQU0dSUFVYcFdlbGxxU210alJtdDVVbTA1YVUwd05IZFVSekZQWkcxS1ZFNVhiR3BhZWpBNStS/16:9/V1ZWb1UwMUhUa2xVVkZwTlpWUm5PUT09K1I=/fozpontedaamizadesentidoparaguai.stream/?autoplay=1&muted=1"
  }
};

const routeCode = document.querySelector("#routeCode");
const routeName = document.querySelector("#routeName");
const routeHelp = document.querySelector("#routeHelp");
const openCamera = document.querySelector("#openCamera");
const closeWindow = document.querySelector("#closeWindow");
const closeHint = document.querySelector("#closeHint");
const switchButtons = Array.from(document.querySelectorAll(".switch-button"));
const languageButtons = Array.from(document.querySelectorAll(".language-button"));

let currentCameraKey = "brasil";
let currentLanguage = localStorage.getItem("ponte-language") || "pt";

function t(key) {
  return translations[currentLanguage][key] || translations.pt[key] || "";
}

function applyLanguage(lang) {
  currentLanguage = translations[lang] ? lang : "pt";
  localStorage.setItem("ponte-language", currentLanguage);

  const copy = translations[currentLanguage];
  document.documentElement.lang = copy.htmlLang;
  document.title = copy.documentTitle;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = copy[key] || translations.pt[key] || "";
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const key = element.dataset.i18nAria;
    element.setAttribute("aria-label", copy[key] || translations.pt[key] || "");
  });

  closeWindow.setAttribute("aria-label", copy.closeWindow);
  closeWindow.title = copy.closeWindow;

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  selectCamera(currentCameraKey);
}

function selectCamera(key) {
  const camera = cameras[key] || cameras.brasil;
  const route = translations[currentLanguage].routes[key] || translations.pt.routes[key];
  currentCameraKey = cameras[key] ? key : "brasil";

  routeCode.textContent = camera.code;
  routeName.textContent = route.name;
  routeHelp.textContent = route.help;
  openCamera.href = camera.url;
  openCamera.setAttribute("aria-label", t("openCameraLabel").replace("{code}", camera.code));

  switchButtons.forEach((button) => {
    const isActive = button.dataset.camera === currentCameraKey;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

switchButtons.forEach((button) => {
  button.addEventListener("click", () => selectCamera(button.dataset.camera));
});

languageButtons.forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.lang));
});

closeWindow.addEventListener("click", () => {
  closeHint.hidden = false;
  window.close();

  setTimeout(() => {
    if (window.closed) {
      return;
    }

    if (window.history.length > 1) {
      window.history.back();
      return;
    }

    window.location.replace("about:blank");
  }, 220);
});

applyLanguage(currentLanguage);
