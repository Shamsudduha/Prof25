const rollButtonsDiv = document.getElementById('roll-buttons');
const vivaDropdown = document.getElementById('viva-dropdown');

// ====== Viva Routine Data (Only for specified rolls) ======
const vivaRoutine = [
  { subject: "FORENSIC MEDICINE & TOXICOLOGY", date: "2025-12-17T09:00:00", rolls: ["7696-7710"] },
  { subject: "FORENSIC MEDICINE & TOXICOLOGY", date: "2025-12-18T09:00:00", rolls: ["7711-7725"] },
  { subject: "FORENSIC MEDICINE & TOXICOLOGY", date: "2025-12-20T09:00:00", rolls: ["7726-7740"] },
  { subject: "FORENSIC MEDICINE & TOXICOLOGY", date: "2025-12-21T09:00:00", rolls: ["7741-7755"] },
  { subject: "FORENSIC MEDICINE & TOXICOLOGY", date: "2025-12-22T09:00:00", rolls: ["7756-7770"] },
  
  { subject: "PHARMACOLOGY & THERAPEUTICS", date: "2025-12-28T09:00:00", rolls: ["7696-7710"] },
  { subject: "PHARMACOLOGY & THERAPEUTICS", date: "2025-12-29T09:00:00", rolls: ["7711-7725"] },
  { subject: "PHARMACOLOGY & THERAPEUTICS", date: "2025-12-30T09:00:00", rolls: ["7726-7740"] },
  { subject: "PHARMACOLOGY & THERAPEUTICS", date: "2025-12-31T09:00:00", rolls: ["7741-7755"] },
  { subject: "PHARMACOLOGY & THERAPEUTICS", date: "2026-01-01T09:00:00", rolls: ["7756-7770"] },
];

// ====== Roll Buttons ======
const rollRanges = ["7696-7710", "7711-7725", "7726-7740", "7741-7755", "7756-7770"];

rollRanges.forEach(range => {
  const btn = document.createElement('button');
  btn.innerText = range;
  btn.addEventListener('click', () => showVivaForRange(range));
  rollButtonsDiv.appendChild(btn);
});

// ====== Show Viva Routine for Selected Roll ======
function showVivaForRange(range) {
  vivaDropdown.innerHTML = '';
  const vivaForRange = vivaRoutine.filter(v => v.rolls.includes(range));
  
  vivaForRange.forEach((viva, index) => {
    const box = document.createElement('div');
    box.className = 'viva-box';
    const dateObj = new Date(viva.date);
    const options = { day:'2-digit', month:'long', year:'numeric', weekday:'long' };
    const formattedDate = dateObj.toLocaleDateString('en-GB', options);

    box.innerHTML = `
      <div class="viva-subject">${viva.subject}</div>
      <div class="viva-date">${formattedDate} | 09:00 AM</div>
      <div class="viva-countdown" id="viva-timer-${index}">
        <div class="time-box"><span>00</span><div class="label">Days</div></div>
        <div class="time-box"><span>00</span><div class="label">Hours</div></div>
        <div class="time-box"><span>00</span><div class="label">Min</div></div>
        <div class="time-box"><span>00</span><div class="label">Sec</div></div>
      </div>
    `;
    vivaDropdown.appendChild(box);

    // Countdown timer for each viva
    const timerEl = document.getElementById(`viva-timer-${index}`);
    const spans = timerEl.querySelectorAll('span');
    const interval = setInterval(() => {
      const now = new Date();
      let gap = dateObj - now;
      if(gap <= 0){
        clearInterval(interval);
        timerEl.innerHTML = "Viva is ongoing or completed!";
        return;
      }
      const days = Math.floor(gap / (1000*60*60*24));
      const hours = Math.floor((gap % (1000*60*60*24)) / (1000*60*60));
      const minutes = Math.floor((gap % (1000*60*60)) / (1000*60));
      const seconds = Math.floor((gap % (1000*60)) / 1000);
      spans[0].innerText = days.toString().padStart(2,'0');
      spans[1].innerText = hours.toString().padStart(2,'0');
      spans[2].innerText = minutes.toString().padStart(2,'0');
      spans[3].innerText = seconds.toString().padStart(2,'0');
    }, 1000);
  });

  vivaDropdown.style.display = 'flex';
}


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
    start: "2025-12-13T10:00:00", 
    end: "2025-12-13T13:00:00" 
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
