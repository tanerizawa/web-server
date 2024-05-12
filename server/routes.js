// Mengimpor handler yang diperlukan dari direktori server/handler
const { postPredictHandler, getPredictHistoriesHandler } = require('../server/handler');

// Array yang berisi definisi rute-rute yang akan digunakan oleh server
const routes = [
  {
    // Rute untuk menangani permintaan POST ke endpoint '/predict'
    path: '/predict',
    method: 'POST',
    handler: postPredictHandler, // Menggunakan fungsi postPredictHandler sebagai handler
    options: {
      payload: {
        allow: 'multipart/form-data', // Mengizinkan tipe konten 'multipart/form-data' untuk payload
        multipart: true, // Mengaktifkan fitur multipart untuk meng-handle payload
        maxBytes: 1000000, // Menetapkan batas maksimum ukuran payload dalam byte (1 MB)
      },
    },
  },
  {
    // Rute untuk menangani permintaan GET ke endpoint '/predict/histories'
    path: '/predict/histories',
    method: 'GET',
    handler: getPredictHistoriesHandler, // Menggunakan fungsi getPredictHistoriesHandler sebagai handler
  },
];

// Menetapkan rute-rute yang telah didefinisikan untuk diekspor agar dapat digunakan oleh server
module.exports = routes;
