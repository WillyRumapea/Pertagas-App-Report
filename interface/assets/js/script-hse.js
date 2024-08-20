const formHSE = document.querySelector("#form-hse-report");
const inputKolom = document.querySelectorAll("input");

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
    await fetch("http://localhost:8000/laporan-hse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("data berhasil di input");
  }
  formHSE.reset();
});
