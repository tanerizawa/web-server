// Mengimpor TensorFlow.js Node.js backend
const tf = require("@tensorflow/tfjs-node");

// Fungsi asinkron untuk memuat model TensorFlow.js dari URL yang ditentukan dalam variabel lingkungan MODEL_URL
async function loadModel() {
  // Memuat model graf dari URL yang disediakan dan mengembalikannya
  return tf.loadGraphModel(process.env.MODEL_URL);
}

// Mengekspor fungsi loadModel untuk digunakan di tempat lain
module.exports = loadModel;
