// ====== Exam Routine ======
const exams = [
  { name: "Forensic Medicine (Written)", start: "2025-11-20T10:00:00", end: "2025-11-20T13:00:00" },
  { name: "Pharmacology (Written)", start: "2025-11-25T10:00:00", end: "2025-11-25T13:00:00" },
  { name: "Central OSPE - Forensic Medicine", start: "2025-11-29T09:00:00", end: "2025-11-29T12:00:00" },
  { name: "Central OSPE - Pharmacology", start: "2025-12-02T09:00:00", end: "2025-12-02T12:00:00" }
];

let currentExamIndex = 0;

// ====== Countdown Function ======
function updateCountdown() {
  const now = new Date();

  if (currentExamIndex >= exams.length) {
    // After all exams → Viva message
    document.getElementById("status-text").innerText = "🎓 All exams completed! Viva starts on 06 December 2025.";
    document.getElementById("timer").style.display = "none";
    document.getElementById("next-exam").style.display = "none";
    return;
  }

  const exam = exams[currentExamIndex];
  const start = new Date(exam.start);
  const end = new Date(exam.end);

  if (now < start) {
    // Before exam → show countdown
    const gap = start - now;
    const days = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hours = Math.floor((gap % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((gap % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days.toString().padStart(2, '0');
    document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');

    document.getElementById("status-text").innerHTML = `<strong>Next Exam: ${exam.name}</strong>`;
    document.getElementById("next-exam").innerText = `📅 ${start.toLocaleDateString('en-GB', {
      weekday: 'long', day: '2-digit', month: 'short', year: 'numeric'
    })} | 🕙 ${start.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    })} - ${end.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', hour12: true
    })}`;

  } else if (now >= start && now <= end) {
    // During exam
    document.getElementById("status-text").innerText = `${exam.name} is ongoing...`;
    document.getElementById("timer").style.display = "none";
    document.getElementById("next-exam").style.display = "none";

  } else {
    // After exam → move to next
    currentExamIndex++;
    document.getElementById("timer").style.display = "flex";
    document.getElementById("next-exam").style.display = "block";
    updateCountdown();
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
