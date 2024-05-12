// Mengimpor library dotenv untuk mengelola variabel lingkungan
require("dotenv").config();

// Mengimpor library Hapi
const Hapi = require("@hapi/hapi");

// Mengimpor file rute dari direktori server
const routes = require("../server/routes");

// Mengimpor fungsi loadModel dari direktori services
const loadModel = require("../services/loadModel");

// Mengimpor kelas ClientError dari file exceptions
const ClientError = require("../exceptions/ClientError");

// Fungsi asinkron untuk menjalankan server
(async () => {
  // Membuat instance server Hapi
  const server = Hapi.server({
    port: 3000, // Menetapkan port server
    host: "0.0.0.0", // Menetapkan host server
    routes: {
      cors: {
        origin: ["*"], // Mengizinkan CORS dari semua origin
      },
    },
  });

  // Memuat model dan menetapkannya ke dalam properti app server
  const model = await loadModel();
  server.app.model = model;

  // Menetapkan rute-rute server
  server.route(routes);

  // Middleware untuk menangani respons sebelum dikirimkan ke client
  server.ext("onPreResponse", (request, h) => {
    const { response } = request;

    // Jika respons merupakan instance dari ClientError, mengubah responsnya
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    // Jika respons menggunakan Boom, mengubah responsnya
    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });
      newResponse.code(response.output.statusCode);
      return newResponse;
    }

    // Melanjutkan respons ke langkah berikutnya jika tidak ada perubahan yang diperlukan
    return h.continue;
  });

  // Memulai server
  await server.start();
  console.log(`Server start at: ${server.info.uri}`); // Mencetak informasi bahwa server telah dimulai
})();
