const t={body:document.querySelector("body"),btnStart:document.querySelector("[data-start]"),btnStop:document.querySelector("[data-stop]")};let e=null;function n(t){t.hasAttribute("disabled")||t.setAttribute("disabled","")}function o(t){t.hasAttribute("disabled")&&t.removeAttribute("disabled")}n(t.btnStop),t.btnStart.addEventListener("click",(function(){n(t.btnStart),o(t.btnStop),e||(e=setInterval((()=>{t.body.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16)}`}),1e3))})),t.btnStop.addEventListener("click",(function(){n(t.btnStop),o(t.btnStart),e=clearInterval(e)}));
//# sourceMappingURL=01-color-switcher.a96e51df.js.map