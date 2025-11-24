// ====== Exam Routine ======
const exams = [
  { 
    name: "Pharmacology (Written)", 
    start: "2025-12-03T10:00:00", 
    end: "2025-12-03T13:00:00" 
  },
  { 
    name: "Forensic Medicine (Central OSPE)", 
    start: "2025-12-09T10:00:00", 
    end: "2025-12-09T13:00:00" 
  },
  { 
    name: "Pharmacology (Central OSPE)", 
    start: "2025-12-11T10:00:00", 
    end: "2025-12-11T13:00:00" 
  }
];

let currentExamIndex = 0;

// ====== Countdown Function ======
function updateCountdown() {
  const now = new Date();

  if (currentExamIndex >= exams.length) {
    // After all exams → Viva message
    document.getElementById("status-text").innerText = "🎓 All exams completed! Viva starts on 17 December 2025.";
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
