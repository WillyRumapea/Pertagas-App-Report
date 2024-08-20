const formAttendList = document.querySelector("#form-attend-list");
const inputKolom = document.querySelectorAll("input");

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
    await fetch("http://localhost:8000/laporan-attend-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("data berhasil di input");
  }
  formAttendList.reset();
});
