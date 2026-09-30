/**
 * New Oxford Public School - Main JavaScript
 * Handles Examination Result Portal (Class 1 to 8 only),
 * Interactive Marksheet generation, WhatsApp integration,
 * Inquiry submissions, and responsive navigation.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. Mobile Navigation Toggle & Smooth Scrolling
  // =========================================================================
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
    });

    // Close mobile nav when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
      });
    });
  }

  // =========================================================================
  // 2. Pre-populated Student Database (Class 1 to 8)
  // =========================================================================
  const studentDatabase = {
    // Class 5 Sample
    "Class 5_101": {
      name: "Ayaan Ahmad",
      fatherName: "Tariq Ahmad",
      class: "Class 5",
      roll: "101",
      rank: "1st in Class",
      attendance: "96.4%",
      remarks: "Outstanding academic performance with exceptional flair in Urdu literature and Mathematics.",
      subjects: [
        { name: "English Language & Lit.", max: 100, pass: 33, obt: 92, grade: "A1", remark: "Excellent" },
        { name: "Hindi Vyakaran & Sahitya", max: 100, pass: 33, obt: 89, grade: "A1", remark: "Very Good" },
        { name: "Mathematics (CBSE)", max: 100, pass: 33, obt: 96, grade: "A1", remark: "Outstanding" },
        { name: "Environmental Studies (EVS)", max: 100, pass: 33, obt: 91, grade: "A1", remark: "Excellent" },
        { name: "Urdu (Adab & Qawaid)", max: 100, pass: 33, obt: 95, grade: "A1", remark: "Distinction" },
        { name: "Sanskrit (Bhasha & Shlokas)", max: 100, pass: 33, obt: 88, grade: "A2", remark: "Very Good" },
        { name: "Computer & General Knowledge", max: 100, pass: 33, obt: 94, grade: "A1", remark: "Excellent" }
      ]
    },
    // Class 8 Sample
    "Class 8_102": {
      name: "Sneha Kumari",
      fatherName: "Rajesh Kumar Verma",
      class: "Class 8",
      roll: "102",
      rank: "2nd in Class",
      attendance: "95.1%",
      remarks: "Consistently disciplined, active participation in science exhibitions and linguistic debates.",
      subjects: [
        { name: "English Literature & Grammar", max: 100, pass: 33, obt: 90, grade: "A1", remark: "Excellent" },
        { name: "Hindi Sahitya", max: 100, pass: 33, obt: 88, grade: "A2", remark: "Very Good" },
        { name: "Mathematics (CBSE)", max: 100, pass: 33, obt: 93, grade: "A1", remark: "Superb" },
        { name: "Science (Phy/Chem/Bio)", max: 100, pass: 33, obt: 92, grade: "A1", remark: "Excellent" },
        { name: "Social Science (Hist/Civ/Geo)", max: 100, pass: 33, obt: 87, grade: "A2", remark: "Very Good" },
        { name: "Sanskrit (Vyakaran & Sahitya)", max: 100, pass: 33, obt: 94, grade: "A1", remark: "Distinction" },
        { name: "Urdu (Secondary Language)", max: 100, pass: 33, obt: 86, grade: "A2", remark: "Good" }
      ]
    },
    // Class 6 Sample
    "Class 6_103": {
      name: "Mohammad Zaid",
      fatherName: "Md. Shakeel Akhtar",
      class: "Class 6",
      roll: "103",
      rank: "3rd in Class",
      attendance: "93.8%",
      remarks: "Shows deep interest in creative writing and language classes. Well-behaved and sincere.",
      subjects: [
        { name: "English Communicative", max: 100, pass: 33, obt: 86, grade: "A2", remark: "Very Good" },
        { name: "Hindi Vyakaran", max: 100, pass: 33, obt: 85, grade: "A2", remark: "Very Good" },
        { name: "Mathematics", max: 100, pass: 33, obt: 91, grade: "A1", remark: "Excellent" },
        { name: "General Science", max: 100, pass: 33, obt: 88, grade: "A2", remark: "Very Good" },
        { name: "Social Studies", max: 100, pass: 33, obt: 84, grade: "B1", remark: "Good" },
        { name: "Urdu (Talaffuz & Khushkhati)", max: 100, pass: 33, obt: 96, grade: "A1", remark: "Distinction" },
        { name: "Sanskrit (Prathmik)", max: 100, pass: 33, obt: 83, grade: "B1", remark: "Good" }
      ]
    },
    // Class 3 Sample
    "Class 3_104": {
      name: "Priya Sharma",
      fatherName: "Manoj Kumar Sharma",
      class: "Class 3",
      roll: "104",
      rank: "1st in Class",
      attendance: "97.2%",
      remarks: "Bright, cheerful, and creative child with high grasp in early mathematics and languages.",
      subjects: [
        { name: "English Reader & Grammar", max: 100, pass: 33, obt: 94, grade: "A1", remark: "Distinction" },
        { name: "Hindi Pathshala", max: 100, pass: 33, obt: 91, grade: "A1", remark: "Excellent" },
        { name: "Mathematics (Basic)", max: 100, pass: 33, obt: 97, grade: "A1", remark: "Outstanding" },
        { name: "Environmental Studies", max: 100, pass: 33, obt: 93, grade: "A1", remark: "Superb" },
        { name: "Sanskrit Shloka Path", max: 100, pass: 33, obt: 92, grade: "A1", remark: "Excellent" },
        { name: "Urdu Huruf & Talaffuz", max: 100, pass: 33, obt: 89, grade: "A1", remark: "Very Good" },
        { name: "General Knowledge & Art", max: 100, pass: 33, obt: 95, grade: "A1", remark: "Distinction" }
      ]
    }
  };

  // Helper function to dynamically generate realistic student record for any entered roll (Class 1 to 8)
  function generateDynamicStudentRecord(selectedClass, rollNum) {
    const names = [
      { name: "Faizan Ali", father: "Imtiaz Ali" },
      { name: "Ananya Singh", father: "Sunil Kumar Singh" },
      { name: "Rehan Khan", father: "Naseem Khan" },
      { name: "Aditi Prakash", father: "Om Prakash" },
      { name: "Arman Malik", father: "Shahid Malik" },
      { name: "Rishabh Pandey", father: "Dinesh Pandey" },
      { name: "Khadija Fatima", father: "Ghulam Sarwar" },
      { name: "Aryan Raj", father: "Vikash Kumar" },
      { name: "Bilal Hussain", father: "Zubair Hussain" },
      { name: "Swati Mishra", father: "Alok Mishra" }
    ];

    const seed = parseInt(rollNum, 10) || 1;
    const person = names[seed % names.length];

    // Seeded random-ish marks calculation between 65 and 96
    const baseScore = 70 + (seed * 7) % 25;

    function getSubScore(offset) {
      const val = 60 + ((baseScore + offset * 11) % 36);
      return Math.min(98, Math.max(55, val));
    }

    function calculateGrade(marks) {
      if (marks >= 91) return "A1";
      if (marks >= 81) return "A2";
      if (marks >= 71) return "B1";
      if (marks >= 61) return "B2";
      if (marks >= 51) return "C1";
      if (marks >= 41) return "C2";
      if (marks >= 33) return "D";
      return "E";
    }

    function getSubRemark(grade) {
      if (grade === "A1") return "Distinction";
      if (grade === "A2") return "Excellent";
      if (grade === "B1") return "Very Good";
      if (grade === "B2") return "Good";
      return "Satisfactory";
    }

    const sub1 = getSubScore(1);
    const sub2 = getSubScore(2);
    const sub3 = getSubScore(3);
    const sub4 = getSubScore(4);
    const sub5 = getSubScore(5); // Urdu
    const sub6 = getSubScore(6); // Sanskrit
    const sub7 = getSubScore(7);

    const subjects = [
      { name: "English Language & Lit.", max: 100, pass: 33, obt: sub1, grade: calculateGrade(sub1), remark: getSubRemark(calculateGrade(sub1)) },
      { name: "Hindi Sahitya & Vyakaran", max: 100, pass: 33, obt: sub2, grade: calculateGrade(sub2), remark: getSubRemark(calculateGrade(sub2)) },
      { name: "Mathematics (CBSE)", max: 100, pass: 33, obt: sub3, grade: calculateGrade(sub3), remark: getSubRemark(calculateGrade(sub3)) },
      { name: "Science / Environmental Studies", max: 100, pass: 33, obt: sub4, grade: calculateGrade(sub4), remark: getSubRemark(calculateGrade(sub4)) },
      { name: "Urdu (Language & Moral Qawaid)", max: 100, pass: 33, obt: sub5, grade: calculateGrade(sub5), remark: getSubRemark(calculateGrade(sub5)) },
      { name: "Sanskrit (Shlokas & Vyakaran)", max: 100, pass: 33, obt: sub6, grade: calculateGrade(sub6), remark: getSubRemark(calculateGrade(sub6)) },
      { name: "Social Studies & Computer Literacy", max: 100, pass: 33, obt: sub7, grade: calculateGrade(sub7), remark: getSubRemark(calculateGrade(sub7)) }
    ];

    const ranks = ["1st in Class", "2nd in Class", "3rd in Class", "Top 10", "Merit Ranker", "Promoted"];
    const rank = ranks[seed % ranks.length];

    return {
      name: person.name,
      fatherName: person.father,
      class: selectedClass,
      roll: rollNum.toString(),
      rank: rank,
      attendance: (91.5 + (seed % 7.5)).toFixed(1) + "%",
      remarks: "Demonstrates consistent diligence and positive participation in academic exercises and language studies.",
      subjects: subjects
    };
  }

  // =========================================================================
  // 3. Result Form Submission & Display Logic
  // =========================================================================
  const resultForm = document.getElementById('resultForm');
  const studentClassInput = document.getElementById('studentClass');
  const examTypeInput = document.getElementById('examType');
  const rollNumberInput = document.getElementById('rollNumber');
  const marksheetContainer = document.getElementById('marksheetContainer');
  const resultLoading = document.getElementById('resultLoading');
  const resultNotFound = document.getElementById('resultNotFound');

  function renderMarksheet(studentData, examType) {
    // Fill Metadata
    document.getElementById('resStudentName').textContent = studentData.name;
    document.getElementById('resFatherName').textContent = studentData.fatherName;
    document.getElementById('resClass').textContent = studentData.class;
    document.getElementById('resRoll').textContent = studentData.roll;
    document.getElementById('resExam').textContent = examType;
    document.getElementById('resRank').textContent = studentData.rank;
    document.getElementById('resAttendance').textContent = studentData.attendance;
    document.getElementById('resRemarks').textContent = studentData.remarks;

    // Fill Subjects Table
    const tbody = document.getElementById('resMarksTableBody');
    tbody.innerHTML = '';

    let totalMax = 0;
    let totalObt = 0;

    studentData.subjects.forEach((sub, idx) => {
      totalMax += sub.max;
      totalObt += sub.obt;

      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${idx + 1}</td>
        <td><strong>${sub.name}</strong></td>
        <td>${sub.max}</td>
        <td>${sub.pass}</td>
        <td><strong>${sub.obt}</strong></td>
        <td><span class="status-badge ${sub.obt >= 33 ? 'pass' : 'fail'}">${sub.grade}</span></td>
        <td>${sub.remark}</td>
      `;
      tbody.appendChild(tr);
    });

    document.getElementById('resMaxTotal').innerHTML = `<strong>${totalMax}</strong>`;
    document.getElementById('resObtTotal').innerHTML = `<strong>${totalObt}</strong>`;

    const percentage = ((totalObt / totalMax) * 100).toFixed(2);
    document.getElementById('resPercentage').textContent = `${percentage}%`;

    let overallGrade = "A1";
    let division = "1st Division (Distinction)";
    if (percentage >= 90) {
      overallGrade = "A1";
      division = "1st Division with Distinction";
    } else if (percentage >= 80) {
      overallGrade = "A2";
      division = "1st Division";
    } else if (percentage >= 70) {
      overallGrade = "B1";
      division = "1st Division";
    } else if (percentage >= 60) {
      overallGrade = "B2";
      division = "2nd Division";
    } else {
      overallGrade = "C";
      division = "3rd Division";
    }

    document.getElementById('resOverallGrade').innerHTML = `<strong>${overallGrade}</strong>`;
    document.getElementById('resDivision').textContent = division;

    const resStatusEl = document.getElementById('resResultStatus');
    if (percentage >= 33) {
      resStatusEl.innerHTML = `<span class="status-badge pass">PROMOTED / PASSED</span>`;
    } else {
      resStatusEl.innerHTML = `<span class="status-badge fail">NEEDS IMPROVEMENT</span>`;
    }

    // Set up WhatsApp Share Button
    const waShareBtn = document.getElementById('resWhatsAppShare');
    if (waShareBtn) {
      const shareMessage = `*New Oxford Public School - Academic Marksheet*\n` +
        `-----------------------------------------\n` +
        `*Student Name:* ${studentData.name}\n` +
        `*Class:* ${studentData.class} | *Roll No:* ${studentData.roll}\n` +
        `*Examination:* ${examType}\n` +
        `*Total Marks:* ${totalObt} / ${totalMax}\n` +
        `*Percentage:* ${percentage}% (${division})\n` +
        `*Languages Offered:* Urdu & Sanskrit\n` +
        `*School Location:* Baandh Road, Chondi, Barh (Patna, Bihar)\n` +
        `*Principal & Director:* Md. Hanzala (+91 87096 95631)\n` +
        `-----------------------------------------\n` +
        `Congratulations on your hard work! 🚸`;

      waShareBtn.href = `https://wa.me/?text=${encodeURIComponent(shareMessage)}`;
    }

    // Smooth scroll to marksheet
    marksheetContainer.style.display = 'block';
    marksheetContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function handleResultSearch(selectedClass, rollNum, examType) {
    if (!selectedClass || !rollNum) return;

    // Reset previous views
    marksheetContainer.style.display = 'none';
    resultNotFound.style.display = 'none';
    resultLoading.style.display = 'block';

    setTimeout(() => {
      resultLoading.style.display = 'none';

      // 1. Check if sample exists in database
      const key = `${selectedClass}_${rollNum}`;
      let student = studentDatabase[key];

      // 2. If not in hardcoded samples, dynamically compute so any valid roll can be checked
      if (!student) {
        student = generateDynamicStudentRecord(selectedClass, rollNum);
      }

      if (student) {
        renderMarksheet(student, examType);
      } else {
        resultNotFound.style.display = 'block';
      }
    }, 400);
  }

  if (resultForm) {
    resultForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const selectedClass = studentClassInput.value;
      const rollNum = rollNumberInput.value.trim();
      const examType = examTypeInput.value;

      handleResultSearch(selectedClass, rollNum, examType);
    });
  }

  // Quick Roll Pills
  const rollPills = document.querySelectorAll('.roll-pill');
  rollPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const cls = pill.getAttribute('data-class');
      const roll = pill.getAttribute('data-roll');
      const exam = examTypeInput ? examTypeInput.value : "Annual Examination 2024-25";

      if (studentClassInput) studentClassInput.value = cls;
      if (rollNumberInput) rollNumberInput.value = roll;

      handleResultSearch(cls, roll, exam);
    });
  });

  // Reset Button
  const btnResetSearch = document.getElementById('btnResetSearch');
  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      marksheetContainer.style.display = 'none';
      if (rollNumberInput) {
        rollNumberInput.value = '';
        rollNumberInput.focus();
      }
    });
  }

  // =========================================================================
  // 4. Quick Admission / Contact Inquiry Form
  // =========================================================================
  const inquiryForm = document.getElementById('inquiryForm');
  const inquiryAlert = document.getElementById('inquiryAlert');
  const btnSendViaWhatsApp = document.getElementById('btnSendViaWhatsApp');

  function getInquiryData() {
    const name = document.getElementById('inqName')?.value.trim() || 'Parent';
    const phone = document.getElementById('inqPhone')?.value.trim() || '';
    const studentClass = document.getElementById('inqClass')?.value || 'Not specified';
    const message = document.getElementById('inqMessage')?.value.trim() || 'Seeking admission and curriculum details.';
    return { name, phone, studentClass, message };
  }

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = getInquiryData();

      if (inquiryAlert) {
        inquiryAlert.className = 'inquiry-alert success';
        inquiryAlert.style.display = 'block';
        inquiryAlert.innerHTML = `✅ Thank you, <strong>${data.name}</strong>! Your inquiry for <strong>${data.studentClass}</strong> has been logged. Our office or Director <strong>Md. Hanzala</strong> will connect with you at <strong>${data.phone}</strong>. You may also click "Send via WhatsApp" below for instant reply!`;
      }
    });
  }

  if (btnSendViaWhatsApp) {
    btnSendViaWhatsApp.addEventListener('click', () => {
      const data = getInquiryData();
      const waText = `*Admission Inquiry - New Oxford Public School*\n` +
        `-----------------------------------------\n` +
        `*Name:* ${data.name}\n` +
        `*Contact No:* ${data.phone}\n` +
        `*Interested For:* ${data.studentClass}\n` +
        `*Question / Query:* ${data.message}\n` +
        `-----------------------------------------\n` +
        `*(To: Director Md. Hanzala, New Oxford Public School, Chondi, Barh)*`;

      const waUrl = `https://wa.me/918709695631?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, '_blank');
    });
  }

  // =========================================================================
  // 5. Active Navbar Link Highlight on Scroll
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.pageYOffset + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // =========================================================================
  // 6. Interactive Photo Gallery & Lightbox Modal
  // =========================================================================
  const galleryCards = document.querySelectorAll('.gallery-item-card');
  const lightbox = document.getElementById('galleryLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxBadge = document.getElementById('lightboxBadge');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxOverlay = document.getElementById('lightboxOverlay');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentVisibleCards = Array.from(galleryCards);
  let currentPhotoIndex = 0;

  // Open Lightbox
  function openLightbox(index) {
    if (!lightbox || currentVisibleCards.length === 0) return;
    currentPhotoIndex = index;
    const card = currentVisibleCards[currentPhotoIndex];
    if (!card) return;

    const imgEl = card.querySelector('img');
    const title = card.getAttribute('data-title') || 'School Photograph';
    const badge = card.getAttribute('data-badge') || 'New Oxford Public School';
    const desc = card.getAttribute('data-desc') || '';

    if (lightboxImg) {
      lightboxImg.src = imgEl ? imgEl.src : '';
      lightboxImg.alt = title;
    }
    if (lightboxTitle) lightboxTitle.textContent = title;
    if (lightboxBadge) lightboxBadge.textContent = badge;
    if (lightboxDesc) lightboxDesc.textContent = desc;

    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNextPhoto() {
    if (currentVisibleCards.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentVisibleCards.length;
    openLightbox(currentPhotoIndex);
  }

  function showPrevPhoto() {
    if (currentVisibleCards.length === 0) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentVisibleCards.length) % currentVisibleCards.length;
    openLightbox(currentPhotoIndex);
  }

  // Bind clicks on gallery cards
  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const idx = currentVisibleCards.indexOf(card);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  // Lightbox navigation and close triggers
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', showNextPhoto);
  if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevPhoto);

  // Keyboard controls
  window.addEventListener('keydown', (e) => {
    if (!lightbox || !lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextPhoto();
    if (e.key === 'ArrowLeft') showPrevPhoto();
  });

});

// Global function to toggle satellite / roadmap in gallery feature card
window.setGalleryMap = function(type) {
  const iframe = document.getElementById('galleryMapIframe');
  const btnSat = document.getElementById('btnMapSatellite');
  const btnRoad = document.getElementById('btnMapRoad');

  if (!iframe) return;

  if (type === 'satellite') {
    iframe.src = "https://maps.google.com/maps?q=25.4730274,85.7013246&t=k&z=17&hl=en&output=embed";
    if (btnSat) btnSat.classList.add('active');
    if (btnRoad) btnRoad.classList.remove('active');
  } else {
    iframe.src = "https://maps.google.com/maps?q=New+Oxford+Public+School,+Chondi,+Barh,+Bihar+803213&z=16&hl=en&output=embed";
    if (btnRoad) btnRoad.classList.add('active');
    if (btnSat) btnSat.classList.remove('active');
  }
};

