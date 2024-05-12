// Mengimpor fungsi predictClassification dari services/inferenceService
const predictClassification = require("../services/inferenceService");

// Mengimpor modul crypto untuk menghasilkan UUID
const crypto = require("crypto");

// Mengimpor fungsi storeData dari services/storeData
const storeData = require("../services/storeData");

// Mengimpor fungsi loadDataHistories dari services/loadDataHistories
const loadDataHistories = require("../services/loadDataHistories");

// Fungsi asinkron untuk menangani permintaan POST ke endpoint '/predict'
async function postPredictHandler(request, h) {
  // Mendapatkan gambar dari payload permintaan
  const { image } = request.payload;

  // Mendapatkan model dari properti app server
  const { model } = request.server.app;

  // Memanggil fungsi predictClassification untuk melakukan prediksi menggunakan model dan gambar yang diterima
  const { label, suggestion } = await predictClassification(model, image);

  // Membuat ID acak menggunakan crypto.randomUUID()
  const id = crypto.randomUUID();

  // Mendapatkan waktu saat ini sebagai string ISO
  const createdAt = new Date().toISOString();

  // Menyusun data hasil prediksi
  const data = {
    id: id,
    result: label,
    suggestion: suggestion,
    createdAt: createdAt,
  };

  // Menyimpan data ke dalam penyimpanan
  await storeData(id, data);

  // Membuat respons berhasil dengan kode status 201 (Created)
  const response = h.response({
    status: "success",
    message: "Model is predicted successfully",
    data,
  });
  response.code(201);
  return response;
}

// Fungsi asinkron untuk menangani permintaan GET ke endpoint '/predict/histories'
async function getPredictHistoriesHandler(request, h) {
  // Memuat data histori prediksi
  const data = await loadDataHistories();

  // Membuat respons berhasil dengan kode status 200 (OK) dan mengirimkan data histori
  const response = h.response({
    status: "success",
    message: "Data histori prediksi berhasil dimuat",
    data,
  });
  response.code(200);
  return response;
}

// Mengekspor fungsi-fungsi yang akan digunakan sebagai handler
module.exports = { postPredictHandler, getPredictHistoriesHandler };
