const express = require("express");
const app = express();
const port = 8000;
const response = require("./response");
const connect = require("./conn");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../interfaces")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "interface", "main.html"));
});

// table PTI
app.get("/laporan-pti", (req, res) => {
  const sql = "SELECT * FROM test_laporan_pti";
  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, "Berhasil mendapatkan semua data", res);
    } else {
      response(404, result, "tidak ada data ditemukan", res);
    }
  });
});

app.get("/laporan-pti/operator/:operator", (req, res) => {
  const operator = req.params.operator;
  const sql = "SELECT * FROM test_laporan_pti WHERE operator = ?";
  connect.query(sql, [operator], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, "data didapat sesuai input", res);
    } else {
      response(404, result, "tidak ada data sesuai ditemukan ", res);
    }
  });
});

app.get("/laporan-pti/lokasi/:lokasi", (req, res) => {
  const lokasi = req.params.lokasi;
  const sql = "SELECT operator FROM test_laporan_pti WHERE lokasi = ?";
  connect.query(sql, [lokasi], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, "data yang didapat sesuai input", res);
    } else {
      response(404, result, "tidak ditemukan data yang sesuai", res);
    }
  });
});

app.post("/laporan-pti", (req, res) => {
  const {
    tanggal,
    jenis_unit,
    no_pol,
    lokasi,
    pekerjaan,
    temuan,
    operator,
    status,
    km_driven,
    hours_meter,
  } = req.body;
  const sql = `INSERT INTO test_laporan_pti (tanggal, jenis_unit, no_pol, lokasi, pekerjaan, temuan, operator, status, km_driven, hours_meter) VALUES ('${tanggal}', '${jenis_unit}', '${no_pol}','${lokasi}','${pekerjaan}','${temuan}','${operator}','${status}','${km_driven}','${hours_meter}')`;

  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "berhasilkan menginput data", res);
    } else {
      response(404, data, "gagal meng-input data", res);
    }
  });
});
// table PTI

// table attend list
app.get("/laporan-attend-list", (req, res) => {
  const sql = `SELECT * FROM test_laporan_att_list`;
  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, "berhasil mendapatkan semua data", res);
    } else {
      response(404, result, "tidak ada data ditemukan", res);
    }
  });
});

app.post("/laporan-attend-list", (req, res) => {
  const {
    tanggal_meeting,
    jenis_attend_list,
    lokasi,
    topik_pembahasan,
    jumlah_peserta,
    chairman,
    pelapor,
  } = req.body;

  const sql = `INSERT INTO test_laporan_att_list (tanggal_meeting, jenis_attend_list, lokasi, topik_pembahasan, jumlah_peserta, chairman, pelapor) VALUES ('${tanggal_meeting}', '${jenis_attend_list}', '${lokasi}', '${topik_pembahasan}', '${jumlah_peserta}', '${chairman}','${pelapor}')`;

  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      const data = {
        isSuccess: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "berhasil meng-inputkan data", res);
    } else {
      response(200, data, "gagal input data", res);
    }
  });
});
// table attend list

// table hse report
app.get("/laporan-hse", (req, res) => {
  const sql = `SELECT * FROM table_laporan_hse`;
  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      response(200, result, "berhasil mendapatkan semua data", res);
    } else {
      response(404, result, "tidak ada data yang didapatkan", res);
    }
  });
});

app.post("/laporan-hse", (req, res) => {
  const {
    tanggal_report,
    jenis_report,
    lokasi,
    pekerjaan,
    temuan,
    rekomendasi,
    pelapor,
  } = req.body;

  const sql = `INSERT INTO table_laporan_hse (tanggal_report, jenis_report,lokasi, pekerjaan, temuan, rekomendasi, pelapor) VALUES ('${tanggal_report}', '${jenis_report}', '${lokasi}', '${pekerjaan}', '${temuan}', '${rekomendasi}', '${pelapor}')`;

  connect.query(sql, (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      const data = {
        isSucces: result.affectedRows,
        id: result.insertId,
      };
      response(200, data, "berhasil menginputkan data", res);
    } else {
      response(404, data, "gagal menginputkan data", res);
    }
  });
});
// table hse report

app.listen(port, () => {
  console.log(`Aplikasi berjalan di port: ${port}`);
});
