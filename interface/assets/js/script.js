const inputLaporan = document.querySelector("#form-laporan");
const inputKolom = document.querySelectorAll("input");

const noPol = {
  "Foco Truck": ["BM 8141 EU", "BM 8142 EU"],
  "Vacum Truck": [
    "BM 8182 DU",
    "BM 8188 EU",
    "BM 8638 DU",
    "BM 8647 DU",
    "BM 8662 DU",
    "BM 8664 DU",
  ],
  "Water Truck": ["BM 8183 EU", "BM 8184 EU", "BM 9487 EU", "BM 9937 EU"],
  "SG/HWI/CIP": [
    "BM 9200 QA",
    "BM 9220 QA",
    "BM 9214 QA",
    "BM 9219 QA",
    "BM 9124 EU",
  ],
};

document.getElementById("jenUn").addEventListener("input", (e) => {
  const selectedUnit = e.target.value;
  const noPolList = document.getElementById("noPolList");

  console.log("Selected Unit:", selectedUnit);
  console.log("No. Polisi Options:", noPol[selectedUnit]);

  noPolList.innerHTML = "";

  if (noPol[selectedUnit]) {
    noPol[selectedUnit].forEach((list) => {
      const option = document.createElement("option");
      option.value = list;
      noPolList.appendChild(option);
    });
  }
});

inputLaporan.addEventListener("submit", async (e) => {
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
      tanggal: inputLaporan.tanggal.value,
      jenis_unit: inputLaporan.jenisUnit.value,
      no_pol: inputLaporan.noPol.value,
      lokasi: inputLaporan.lokasi.value,
      pekerjaan: inputLaporan.pekerjaan.value,
      temuan: inputLaporan.temuan.value,
      operator: inputLaporan.operator.value,
      status: inputLaporan.status.value,
      km_driven: inputLaporan.kmDriven.value,
      hours_meter: inputLaporan.hoursMeter.value,
    };
    await fetch("http://localhost:8000/laporan-pti", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    alert("data berhasil di input");
  }
  inputLaporan.reset();
});
