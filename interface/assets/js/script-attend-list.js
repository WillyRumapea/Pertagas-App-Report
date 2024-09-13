const formAttendList = document.querySelector("#form-attend-list");
const inputKolom = document.querySelectorAll("input");
const buttonDownload = document.getElementById("download-excel");

formAttendList.addEventListener("submit", async (e) => {
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
      tanggal_meeting: formAttendList.tanggal.value,
      jenis_attend_list: formAttendList.jenisAttendList.value,
      lokasi: formAttendList.lokasi.value,
      topik_pembahasan: formAttendList.topikPembahasan.value,
      jumlah_peserta: formAttendList.jumPeserta.value,
      chairman: formAttendList.chairman.value,
      pelapor: formAttendList.pelapor.value,
    };

    await fetch("http://localhost:5000/laporan-attend-list", {
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
  formAttendList.reset();
});

buttonDownload.addEventListener("click", () => {
  window.location.href = "http://localhost:5000/convert-excel-att-list";
});
