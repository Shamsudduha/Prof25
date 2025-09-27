// Exam routine
const exams = [
  { name: "Forensic Medicine & Toxicology", start: "2025-11-18T10:00:00", end: "2025-11-18T13:00:00" },
  { name: "Pharmacology", start: "2025-11-24T10:00:00", end: "2025-11-24T13:00:00" },
  { name: "OSPE Examination", start: "2025-11-29T10:00:00", end: "2025-11-29T13:00:00" }
];

let currentExamIndex = 0;

function updateCountdown() {
  const now = new Date();

  if (currentExamIndex >= exams.length) {
    // After last exam → show viva message
    document.getElementById("status-text").innerText = "Wait for Viva Routine...";
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

    // Updated text
    document.getElementById("status-text").innerHTML = `<strong>Next Exam: ${exam.name}</strong>`;
    document.getElementById("next-exam").innerText = `Date & Time: ${start.toLocaleString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
})}`;



  } else if (now >= start && now <= end) {
    // During exam
    document.getElementById("status-text").innerText = `${exam.name} Exam is Ongoing...`;
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


