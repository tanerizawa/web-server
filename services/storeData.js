// Mengimpor modul Firestore dari paket '@google-cloud/firestore'
const { Firestore } = require("@google-cloud/firestore");

// Fungsi asinkron untuk menyimpan data ke dalam Firestore
async function storeData(id, data) {
  // Membuat instance Firestore dengan menggunakan konfigurasi dari variabel lingkungan
  const db = new Firestore({
    projectId: process.env.PROJECT_ID, // Menggunakan ID proyek dari variabel lingkungan
    databaseId: process.env.DATABASE_ID, // Menggunakan ID database dari variabel lingkungan
  });

  // Mendapatkan koleksi 'Predictions' dari Firestore
  const predictCollection = db.collection("Predictions");

  // Menyimpan data dengan ID yang ditentukan ke dalam koleksi 'Predictions'
  return await predictCollection.doc(id).set(data);
}

// Mengekspor fungsi storeData untuk digunakan di tempat lain
module.exports = storeData;
