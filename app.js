// document.addEventListener("DOMContentLoaded", function () {
//     document.getElementById("predictBtn").addEventListener("click", async function () {
//         try {
//             let response = await fetch("http://127.0.0.1:5000/predict", {  // ✅ Correct endpoint
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ "input_data": "your_input_here" }) // Modify as needed
//             });

//             let data = await response.json();
//             console.log("Prediction:", data);
//             document.getElementById("result").innerText = `Prediction: ${data.prediction}`;
//         } catch (error) {
//             console.error("Error:", error);
//             document.getElementById("result").innerText = "Error fetching prediction.";
//         }
//     });
// });

document.getElementById("predictBtn").addEventListener("click", function () {
    window.location.href = "http://localhost:3000/";
});
document.getElementById("sleep-btn").addEventListener("click", function () {
    window.location.href = "sleep.html";
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.ansh').addEventListener('click', function() {
    window.location.href = './ayurvedicheal/ayurvedicHeals.html';
});
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('#bookb').addEventListener('click', function() {
    window.location.href = './booking/booking.html';
});
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.fixed-girl').addEventListener('click', function() {
    window.location.href = './chatbot/chatbot.html';
});
});