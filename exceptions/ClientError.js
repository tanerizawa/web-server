// Mendefinisikan kelas ClientError yang merupakan turunan dari kelas Error
class ClientError extends Error {
  constructor(message, statusCode = 400) {
    // Memanggil konstruktor kelas induk (Error)
    super(message);

    // Menetapkan properti statusCode berdasarkan argumen yang diberikan atau default ke 400 (Bad Request)
    this.statusCode = statusCode;

    // Menetapkan nama kelas untuk error
    this.name = "ClientError";
  }
}

// Mengekspor kelas ClientError untuk digunakan di tempat lain
module.exports = ClientError;
