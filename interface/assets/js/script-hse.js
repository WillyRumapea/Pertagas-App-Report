const formHSE = document.querySelector("#form-hse-report");
const inputKolom = document.querySelectorAll("input");
const buttonDownload = document.getElementById("download-excel");

formHSE.addEventListener("submit", async (e) => {
  e.preventDefault();

  let columnValidation = true;
  inputKolom.forEach((e) => {
    if (e.value.trim() === "") {
      columnValidation = false;
    }
  });

  if (!columnValidation) {
    alert("tolong inputkan data dengan sesuai");
  } else {
    const data = {
      tanggal_report: formHSE.tanggal.value,
      jenis_report: formHSE.jenisHSE.value,
      lokasi: formHSE.lokasi.value,
      pekerjaan: formHSE.pekerjaan.value,
      temuan: formHSE.temuan.value,
      rekomendasi: formHSE.rekomendasi.value,
      pelapor: formHSE.pelapor.value,
    };

    await fetch("http://localhost:5000/laporan-hse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    Swal.fire({
      title: "Good job!",
      text: "Your Report is record",
      icon: "success",
    });
  }
  formHSE.reset();
});

buttonDownload.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/convert-excel-hse";
});
