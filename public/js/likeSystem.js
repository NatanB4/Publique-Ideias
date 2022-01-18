function moreLikes(id) {
    let element = document.querySelector(`#label-${id}`);
    let value = parseInt(element.textContent) + 1;

    element.textContent = value;
}