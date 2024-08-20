const buttonForm = document.querySelectorAll(".button-report-list button");

const addresFrom = {
  ATT: "../../interface/form-atd-list.html",
  HSE: "../../interface/form-hse.html",
  PTI: "../../interface/form-pti.html",
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
