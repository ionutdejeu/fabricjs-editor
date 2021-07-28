
const noop = () => {};
const $ = {}
$.q = (selector, scope = window.document) => {
  return scope.querySelector(selector);
};
$.qall = (selector, scope = window.document) => {
  return scope.querySelectorAll(selector);
};
{$}
const on = (target, type, callback = noop, useCapture = false) => {
  target.addEventListener(type, callback, !!useCapture);
};
const replaceAll = (target, search, replacement) =>
  target.replace(new RegExp(search, "g"), replacement);
const htmlEscapes = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
const escapeHtmlChar = chr => htmlEscapes[chr];
const reUnescapedHtml = /[&<>"'`]/g;
const reHasUnescapedHtml = new RegExp(reUnescapedHtml.source);
const escape = string =>
  string && reHasUnescapedHtml.test(string)
    ? string.replace(reUnescapedHtml, escapeHtmlChar)
    : string;


function Menu(){
    console.log($.q("menu_layers"))
}


Menu()
