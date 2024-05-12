// Mengimpor kelas ClientError dari file exceptions/ClientError
const ClientError = require("../exceptions/ClientError");

// Mendefinisikan kelas PredictError yang merupakan turunan dari kelas ClientError
class PredictError extends ClientError {
  constructor(message) {
    // Memanggil konstruktor kelas induk (ClientError) dengan pesan yang diterima
    super(message);

    // Menetapkan nama kelas untuk error
    this.name = "PredictError";
  }
}

// Mengekspor kelas PredictError untuk digunakan di tempat lain
module.exports = PredictError;
