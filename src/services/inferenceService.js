// Mengimpor TensorFlow.js Node.js backend
const tf = require("@tensorflow/tfjs-node");

// Mengimpor kelas PredictError dari file exceptions/PredictError
const PredictError = require("../exceptions/PredictError");

// Fungsi asinkron untuk melakukan klasifikasi/prediksi gambar
async function predictClassification(model, image) {
  try {
    // Mengubah gambar menjadi tensor, menyesuaikan ukuran, dan mengubahnya menjadi float tensor
    const tensor = tf.node
      .decodeJpeg(image)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    // Melakukan prediksi menggunakan model yang diberikan
    const prediction = model.predict(tensor);

    // Mengambil hasil prediksi sebagai array dari tensor dan menunggu hasilnya
    const score = await prediction.data();

    // Mendefinisikan variabel label dan saran berdasarkan skor prediksi
    let label, suggestion;
    if (score > 0.5) {
      label = "Cancer"; // Jika skor prediksi lebih dari 0.5, dianggap sebagai kanker
      suggestion = "Segera periksa ke dokter ya!!"; // Memberikan saran untuk segera memeriksakan diri ke dokter
    } else {
      label = "Non-cancer"; // Jika skor prediksi kurang dari atau sama dengan 0.5, dianggap tidak kanker
      suggestion = "Jaga kesehatan Anda dengan baik-baik ya!!"; // Memberikan saran untuk menjaga kesehatan
    }

    // Mengembalikan label dan saran hasil prediksi
    return { label, suggestion };
  } catch (error) {
    // Melemparkan error PredictError jika terjadi kesalahan dalam melakukan prediksi
    throw new PredictError("Terjadi kesalahan dalam melakukan prediksi");
  }
}

// Mengekspor fungsi predictClassification untuk digunakan di tempat lain
module.exports = predictClassification;
