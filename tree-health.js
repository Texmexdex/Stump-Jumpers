// DATABASE: Tree DDD Symptoms
const diagnosticData = {
  fungal: {
    name: "Fungal Bracket Conks",
    summary:
      "Bracket conks (mushrooms) growing on the roots or trunk bark are the fruiting bodies of wood-decay fungi. They indicate that the heartwood (structural support wood) inside the tree is actively rotting and becoming hollow.",
    spread: "Microscopic wind-blown fungal spores entering through bark wounds or pruning cuts.",
    risk: "Extremely High. The tree loses its structural strength while remaining fully green, making it prone to breaking clean at the base in high winds.",
    better: "Schedule an arborist hollow-sound test immediately. Never cut these conks off to hide the problem, as it does not halt internal heart rot."
  },
  codominant: {
    name: "Included Bark Cracks",
    summary:
      "Co-dominant limbs grow close together at the same size, trapping bark between their stems. This included bark acts as a giant structural wedge, preventing solid wood grains from binding the union together.",
    spread: "Natural structural growth pattern when saplings are not pruned early.",
    risk: "Severe. The V-crotch union splits down the center during hurricane gusts, throwing half of the canopy directly onto targets.",
    better: "Install structural cable systems to brace the canopy, or carefully remove one leader early in its growth cycle to establish dominance."
  },
  dieback: {
    name: "Crown Dieback",
    summary:
      "Canopy branches dying from the tips downward. This indicates severe root distress, soil compaction, root rot pathogens, or a severed vascular system beneath the soil line.",
    spread: "Root death from yard construction, heavy machinery, or prolonged flood suffocation.",
    risk: "Moderate to High. Dead canopy branches represent immediate falling hazards in standard storms.",
    better: "Reduce soil compaction using vertical mulching or root aeration. Safely prune deadwood to reduce wind resistance."
  },
  frass: {
    name: "Borer Exit Frass",
    summary:
      "Tiny holes in the bark accompanied by fine, sawdust-like powder (frass) or sap leaking down the trunk. This is an indicator of wood-boring beetle larvae tunnels carving through the vascular cambium layer.",
    spread: "Beetles drawn to trees stressed by oak wilt, root damage, or drought.",
    risk: "High. The tunnels girdle the trunk, cutting off nutrients and starving the leaves.",
    better: "Inject systemic arborist treatments to kill larval stages, water heavily during droughts, and avoid pruning during beetle swarming season."
  }
};

// DOM ELEMENTS
const diagnosticProfile = document.querySelector("#diagnosticProfile");
const symptomCards = document.querySelectorAll(".grass-card");

// Swarm Alarm Elements
const termiteVisual = document.querySelector("#termiteVisual");
const triggerSwarmBtn = document.querySelector("#triggerSwarmBtn");
const pulseDot = document.querySelector("#pulseDot");
const systemStatusText = document.querySelector("#systemStatusText");
const swarmDesc = document.querySelector("#swarmDesc");
const swarmAlertBanner = document.querySelector("#swarmAlertBanner");
const swarmForm = document.querySelector("#swarmForm");
const signupBox = document.querySelector("#signupBox");
const confirmBox = document.querySelector("#confirmBox");
const confirmText = document.querySelector("#confirmText");
const resetSignupBtn = document.querySelector("#resetSignupBtn");

// Render Selected Symptom Profile
function renderDiagnosticProfile(key) {
  const symptom = diagnosticData[key];
  if (!symptom) return;

  diagnosticProfile.innerHTML = `
    <div class="profile-details">
      <h3>${symptom.name}</h3>
      <p class="summary">${symptom.summary}</p>
      <div class="profile-specs">
        <p><strong>Common Source:</strong> ${symptom.spread}</p>
        <p><strong>Storm Failure Risk Factor:</strong> ${symptom.risk}</p>
        <p><strong>Arborist Action Plan:</strong> ${symptom.better}</p>
      </div>
    </div>
  `;
}

// Swarm Alert Dashboard Controller
let isSwarmingActive = false;

function toggleSwarmAlarm() {
  isSwarmingActive = !isSwarmingActive;
  
  if (isSwarmingActive) {
    termiteVisual.classList.add("active-alarm");
    triggerSwarmBtn.textContent = "Admin: Reset Swarm Status";
    triggerSwarmBtn.classList.add("active");
    
    // Status indicators
    pulseDot.className = "pulse-dot status-red";
    systemStatusText.textContent = "ACTIVE SWARM ALARM";
    systemStatusText.style.color = "var(--rose)";
    
    swarmDesc.innerHTML = `<strong>WARNING: Active swarms detected in Southeast Texas.</strong> Formosan subterranean termites and swarming aphids are currently flight-active. Turn off all outdoor landscaping lighting and draw interior blinds to prevent house entry.`;
    
    // Alert banner slide up
    swarmAlertBanner.classList.add("active-alert");
  } else {
    termiteVisual.classList.remove("active-alarm");
    triggerSwarmBtn.textContent = "Admin: Simulate Swarm Trigger";
    triggerSwarmBtn.classList.remove("active");
    
    // Status indicators
    pulseDot.className = "pulse-dot status-green";
    systemStatusText.textContent = "CALM";
    systemStatusText.style.color = "var(--green)";
    
    swarmDesc.textContent = "Active weather monitoring indicates no termite swarms in the area. Standard night lighting is safe.";
    
    // Alert banner slide down
    swarmAlertBanner.classList.remove("active-alert");
  }
}

// SETUP INTERACTION OBSERVERS FOR SCROLL REVEALS
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

// INITIALIZATION
document.addEventListener("DOMContentLoaded", () => {
  // Attach observers
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Symptom card selectors
  symptomCards.forEach(btn => {
    btn.addEventListener("click", () => {
      symptomCards.forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderDiagnosticProfile(btn.dataset.symptom);
    });
  });

  // Swarm Alarm trigger handler
  if (triggerSwarmBtn) {
    triggerSwarmBtn.addEventListener("click", toggleSwarmAlarm);
  }

  // Swarm Signup Form handler
  if (swarmForm) {
    swarmForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.querySelector("#userName").value;
      const contact = document.querySelector("#userContact").value;
      
      confirmText.innerHTML = `Thank you, <strong>${name}</strong>! Your alarm contact (<strong>${contact}</strong>) is verified. You will receive emergency swarming notifications when flying insect vectors are active in your area.`;
      
      signupBox.style.display = "none";
      confirmBox.style.display = "flex";
    });
  }

  // Reset Signup Form
  if (resetSignupBtn) {
    resetSignupBtn.addEventListener("click", () => {
      swarmForm.reset();
      confirmBox.style.display = "none";
      signupBox.style.display = "block";
    });
  }

// Initial renders
  renderDiagnosticProfile("fungal");
});
