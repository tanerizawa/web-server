// Mengimpor modul Firestore dari paket '@google-cloud/firestore'
const { Firestore } = require("@google-cloud/firestore");

// Fungsi asinkron untuk memuat data histori prediksi dari Firestore
async function loadDataHistories() {
  // Membuat instance Firestore dengan menggunakan konfigurasi dari variabel lingkungan
  const db = new Firestore({
    projectId: process.env.PROJECT_ID, // Menggunakan ID proyek dari variabel lingkungan
    databaseId: process.env.DATABASE_ID, // Menggunakan ID database dari variabel lingkungan
  });

  // Mendapatkan koleksi 'Predictions' dari Firestore
  const predictCollection = db.collection("Predictions");

  // Mendapatkan snapshot dokumen yang diurutkan berdasarkan waktu pembuatan secara menurun
  const snapshots = await predictCollection.orderBy("createdAt", "desc").get();

  // Jika tidak ada snapshot yang ditemukan, mengembalikan array kosong
  if (snapshots.empty) return new Array([]);

  // Mendefinisikan array kosong untuk menyimpan hasil prediksi
  const predictions = [];

  // Iterasi melalui setiap dokumen dalam snapshot
  snapshots.forEach((doc) => {
    // Membuat objek prediction yang berisi ID dokumen dan data histori prediksi
    const prediction = {
      id: doc.id,
      history: doc.data(),
    };

    // Menambahkan objek prediction ke dalam array predictions
    predictions.push(prediction);
  });

  // Mengembalikan array predictions yang berisi data histori prediksi
  return predictions;
}

// Mengekspor fungsi loadDataHistories untuk digunakan di tempat lain
module.exports = loadDataHistories;
