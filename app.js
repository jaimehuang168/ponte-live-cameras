"use strict";

const cameras = {
  brasil: {
    code: "CDE → Foz",
    name: "Sentido Brasil",
    help: "Ciudad del Este para Foz do Iguaçu.",
    url: "https://playerv.logicahost.com.br/video-ip-camera/portovelhomamore//true/true/V2tjeGMyRXhjRmhQU0dSUFVYcFdlbGxxU210alJtdDVVbTA1YVUwd05IZFVSekZQWkcxS1ZFNVhiR3BhZWpBNStS/16:9/V1ZWb1UwMUhUa2xVVkZwTlpWUm5PUT09K1I=/fozpontedaamizadesentidobrasil.stream/?autoplay=1&muted=1"
  },
  paraguai: {
    code: "Foz → CDE",
    name: "Sentido Paraguai",
    help: "Foz do Iguaçu para Ciudad del Este.",
    url: "https://playerv.logicahost.com.br/video-ip-camera/portovelhomamore//true/true/V2tjeGMyRXhjRmhQU0dSUFVYcFdlbGxxU210alJtdDVVbTA1YVUwd05IZFVSekZQWkcxS1ZFNVhiR3BhZWpBNStS/16:9/V1ZWb1UwMUhUa2xVVkZwTlpWUm5PUT09K1I=/fozpontedaamizadesentidoparaguai.stream/?autoplay=1&muted=1"
  }
};

const routeCode = document.querySelector("#routeCode");
const routeName = document.querySelector("#routeName");
const routeHelp = document.querySelector("#routeHelp");
const openCamera = document.querySelector("#openCamera");
const switchButtons = Array.from(document.querySelectorAll(".switch-button"));

function selectCamera(key) {
  const camera = cameras[key] || cameras.brasil;

  routeCode.textContent = camera.code;
  routeName.textContent = camera.name;
  routeHelp.textContent = camera.help;
  openCamera.href = camera.url;

  switchButtons.forEach((button) => {
    const isActive = button.dataset.camera === key;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  });
}

switchButtons.forEach((button) => {
  button.addEventListener("click", () => selectCamera(button.dataset.camera));
});
