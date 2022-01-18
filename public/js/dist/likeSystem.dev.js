"use strict";

function moreLikes(id) {
  var element = document.querySelector("#label-".concat(id));
  var value = parseInt(element.textContent) + 1;
  element.textContent = value;
}