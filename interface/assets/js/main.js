const buttonForm = document.querySelectorAll(".button-report-list button");

const addresFrom = {
  ATT: "form-atd-list.html",
  HSE: "form-hse.html",
  PTI: "form-pti.html",
};

buttonForm.forEach((button, index) => {
  button.addEventListener("click", () => {
    let url;

    if (index === 0) {
      url = addresFrom.ATT;
    } else if (index === 1) {
      url = addresFrom.HSE;
    } else if (index === 2) {
      url = addresFrom.PTI;
    }
    window.location.href = url;
  });
});
