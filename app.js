// 1. YOUR FIREBASE CONFIGURATION
// Replace the placeholder values below with your actual Firebase Project web config settings
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqG5eM_4wPrENuY3AK3UES8wN0dEbKjdg",
  authDomain: "telemedicine-3d569.firebaseapp.com",
  projectId: "telemedicine-3d569",
  storageBucket: "telemedicine-3d569.firebasestorage.app",
  messagingSenderId: "860464920719",
  appId: "1:860464920719:web:a0add3afb54fb27cfc18fa",
  measurementId: "G-VF2J4344CL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 2. WHATSAPP CONFIGURATION
// Replace with the phone number linked to Dr. Anil Kapoor's clinic (include country code, e.g., 91 for India)
const CLINIC_WHATSAPP_NUMBER = "919999999999"; 

// WhatsApp Feature Integration
document.getElementById('whatsappBtn').addEventListener('click', () => {
    const customMessage = encodeURIComponent("Hello Dr. Anil Kapoor's Clinic, I would like to inquire about booking an appointment quick check-up.");
    const whatsappUrl = `https://wa.me/${CLINIC_WHATSAPP_NUMBER}?text=${customMessage}`;
    window.open(whatsappUrl, '_blank');
});

// Firebase Appointment Booking Logic
document.getElementById('appointmentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('patientPhone').value;
    const date = document.getElementById('appointmentDate').value;
    const symptoms = document.getElementById('symptoms').value;
    const statusMessage = document.getElementById('statusMessage');

    try {
        // Save the health data directly to Firebase [cite: 11]
        await db.collection("appointments").add({
            clinicName: "Dr. Anil Kapoor - Palia Kalan",
            patientName: name,
            patientPhone: phone,
            appointmentDate: date,
            symptoms: symptoms,
            createdAt: new Date().toISOString()
        });

        // Show Success UI
        statusMessage.textContent = "✔ Appointment saved! Dr. Kapoor's team will contact you shortly.";
        statusMessage.className = "success";
        document.getElementById('appointmentForm').reset();

    } catch (error) {
        console.error("Error writing document: ", error);
        statusMessage.textContent = "❌ Error booking appointment. Please try again or use WhatsApp.";
        statusMessage.className = "error";
    }
});
