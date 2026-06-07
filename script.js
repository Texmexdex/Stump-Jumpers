// DATABASE: Invasive & High-Input Lawn Grasses in Southeast Texas
const grassData = {
  bermuda: {
    name: "Bermudagrass",
    summary:
      "Bermudagrass thrives in heat, spreads through aggressive runners (stolons) and deep rhizomes. It forms thick, dense mats that choke out native wildflower seedlings and ground-layer plants.",
    spread: "Creeping stolons, rhizomes, mower fragments, seed heads",
    risk: "High in open, sunny, disturbed areas, pasture edges, and yards",
    better:
      "Use physical steel/stone borders. Kill runners through sheet mulching or solarization before planting dense competitors like little bluestem or sideoats grama."
  },
  torpedo: {
    name: "Torpedograss",
    summary:
      "A notorious wetland invader from Europe/Asia. Its pointed, sharp rhizomes pierce through soils, mud, and riverbanks. It spreads aggressively along wet ditches, lakeshores, and bayous.",
    spread: "Sharp, creeping rhizomes and water currents carrying fragments",
    risk: "Severe around drainage paths, bayou banks, and low wet lawns",
    better:
      "After eradication, stabilize shorelines and ditches using native moisture-loving giants like Eastern Gamagrass, Powdery Thalia, sedges, and rushes."
  },
  johnson: {
    name: "Johnsongrass",
    summary:
      "A tall, coarse grass introduced as forage. It produces massive seed heads and spreads via thick rhizomes. It outcompetes native tallgrasses and represents a major hazard along roadsides.",
    spread: "Prolific seed production and thick underground rhizomes",
    risk: "High in open sun, disturbed construction soils, and unmanaged fields",
    better:
      "Prevent seed set by mowing/cutting early. Exhaust the root reserves, then install high-density native tallgrasses like Indiangrass and Switchgrass."
  },
  bahia: {
    name: "Bahiagrass",
    summary:
      "An aggressive South American pasture grass with characteristic 'Y-shaped' seed heads. It forms dense, low-diversity monocultures that provide zero food value for native insects or birds.",
    spread: "Creeping horizontal rhizomes and abundant seed heads",
    risk: "Moderate where it escapes into sandy soils and roadsides",
    better:
      "Reduce mowing frequency to exhaust seeds, solarize target areas, and replace with a native shortgrass/wildflower meadow mix."
  }
};

// DATABASE: Cultural Paradoxes & Unintended Consequences
const paradoxData = {
  predators: {
    title: "The Predator Vacuum",
    normal: "Killing non-venomous rat snakes, garter snakes, garden spiders, mud daubers, and opossums because they look 'scary' or 'dirty'.",
    consequences: "Wiping out these apex predators leaves an empty ecological niche. Without spiders, tick and mosquito populations swell. Without rat snakes and opossums (which eat thousands of ticks), disease-carrying rodents infest crawlspaces. These rodent infestations then draw in venomous pit vipers (like copperheads) seeking an abundant meal.",
    cure: "Host native garden spiders, leave rat snakes alone, and welcome opossums. They act as free, silent, 24/7 pest controllers who keep actual hazards away."
  },
  leaves: {
    title: "Leaf & Clipping Bagging",
    normal: "Raking up every autumn leaf and clipping grass short, placing them in plastic bags, sending them to landfills, and buying chemical fertilizers to feed the yard.",
    consequences: "This strips the soil of natural carbon, nitrogen, and trace minerals. Earthworms and mycorrhizal fungi starve. The soil compacts into a brick-like layer of hard clay, destroying its water-holding capacity. During Gulf downpours, rainwater cannot penetrate, causing local street flooding.",
    cure: "Use a mulching mower to shred leaves and clippings directly back into the lawn. They act as a free slow-release fertilizer and rebuild the organic soil sponge."
  },
  chemicals: {
    title: "The Chemical Squeeze",
    normal: "Applying broad-spectrum synthetic pesticides (like bifenthrin) and pre-emergent herbicides annually to eliminate all weeds and bugs.",
    consequences: "Synthetic pesticides kill 99% of beneficial insects, including pollinators and predators (ladybugs, lacewings, predatory mites). Pests like chinch bugs develop resistance and return in greater numbers. Herbicides wash into storm drains, contaminating public bayous and local tap water.",
    cure: "Stop broad-spectrum pesticide use. Plant native borders to attract beneficial predator insects, and hand-pull weeds or spot-treat using vinegar solutions."
  },
  ivy: {
    title: "Invasive Ivy & Privet",
    normal: "Planting fast-growing English Ivy as ground cover or Chinese Privet as quick privacy screens along fence lines.",
    consequences: "English Ivy climbs brickwork, trapping moisture and destroying wood and mortar. It crawls up mature oaks and pines, adding massive weight and wind resistance. During hurricanes, these ivy-heavy trees are the first to blow over onto roofs. Privet escapes into bayous, choking water flow and causing local floodwaters to rise.",
    cure: "Use native vines (like Coral Honeysuckle or Carolina Jessamine) and native evergreen privacy shrubs (like Wax Myrtle or Yaupon Holly) which hold soil without structural damage."
  },
  mowing: {
    title: "Scalping & Short Mowing",
    normal: "Shaving the lawn down to under 1.5 inches weekly to force a neat, golf-course look.",
    consequences: "Mowing grass too short starves its ability to photosynthesize. The plant sheds root depth to balance its height, leaving roots only 1-2 inches deep. This shallow root system makes the lawn highly vulnerable to drought, heat waves, and fungal patch diseases, requiring constant watering and chemical fungicides.",
    cure: "Raise your mower blades to 3-4 inches. Taller grass shades its own roots, keeps soil moisture locked in, prevents weed seeds from germinating, and develops deeper roots."
  }
};

// DATABASE: Multi-Question Educational Quiz
const quizData = [
  {
    question: "You notice garden spiders and non-venomous rat snakes in your yard. What is the most ecological action?",
    options: [
      { text: "Kill or remove them immediately to keep the yard safe.", correct: false },
      { text: "Leave them alone; they devour roaches, ticks, and disease-carrying rodents.", correct: true },
      { text: "Spray chemical insecticides to dry up their food source so they leave.", correct: false }
    ],
    explanation: "Spiders and rat snakes are natural predators. Spiders keep roaches and mosquitoes down, while rat snakes keep rodent populations in check. Wiping them out leaves a predator vacuum, inviting infestations of pests and venomous copperheads that hunt rodents."
  },
  {
    question: "What is the primary ecological hazard of maintaining a St. Augustine lawn in Southeast Texas?",
    options: [
      { text: "It absorbs too much rainfall, drying out the regional water table.", correct: false },
      { text: "Its shallow roots flush trace minerals from soil, and fertilizer runoff fuels Gulf algal dead zones.", correct: true },
      { text: "It attracts native caterpillars that wipe out neighborhood flowerbeds.", correct: false }
    ],
    explanation: "St. Augustine grass has extremely shallow roots (2-4 inches) in clay. Constant heavy watering washes essential micronutrients (iron, magnesium) out of the root zone, while excessive chemical runoff enters local bayous, fueling massive toxic algal blooms downstream."
  },
  {
    question: "Why does raking, bagging, and throwing away autumn leaves actually harm the homeowner?",
    options: [
      { text: "It strips the soil of organic carbon, causing clay soil to compact, harden, and shed floodwaters.", correct: true },
      { text: "It causes weed seeds to germinate twice as fast in the winter.", correct: false },
      { text: "It releases toxic spores from the soil that yellow the grass.", correct: false }
    ],
    explanation: "Autumn leaves are the soil's natural food source. Shredding them with a mower feeds earthworms and fungi, creating a soft, organic soil sponge. Throwing them away leaves soil bare, dry, and compacted—turning your yard into a concrete-like surface that increases local flooding."
  },
  {
    question: "Why do turf yards treated with heavy synthetic fertilizers get attacked by insect pests more frequently?",
    options: [
      { text: "The chemical odors attract insects from miles away.", correct: false },
      { text: "Synthetic nitrogen forces rapid, watery blade growth with thin cell walls that are very easy for pests to eat.", correct: true },
      { text: "Fertilizer crystals provide direct nesting materials for sod webworms.", correct: false }
    ],
    explanation: "Synthetic nitrogen fertilizer forces rapid top growth but starves root development. This watery, structural leaf growth lacks natural chemical defenses and has thin cell walls. Chinch bugs and sod webworms feed on this soft tissue effortlessly, leading to major pest outbreaks."
  },
  {
    question: "How can you design a native planting to prevent complaints from neighbors or Homeowner Associations (HOAs)?",
    options: [
      { text: "Let the yard grow completely wild without any borders or maintenance.", correct: false },
      { text: "Use formal design cues like defined borders, gravel paths, mowed edges, and bird baths.", correct: true },
      { text: "Plant only tall native switchgrass to shield the view of your yard from the street.", correct: false }
    ],
    explanation: "HOAs and neighbors react to signs of neglect, not native plants. By using 'cues to care'—such as crisp metal borders, stone pathways, a cleanly mowed turf frame, and bird feeders—you signal that the wild native planting is an intentional, high-end landscape design."
  }
];

// STATE MANAGEMENT
let currentQuizIndex = 0;

// DOM ELEMENTS
const profileElement = document.querySelector("#grassProfile");
const grassButtons = document.querySelectorAll(".grass-card");
const slider = document.querySelector("#nativeSlider");
const nativePercent = document.querySelector("#nativePercent");
const habitatMeter = document.querySelector("#habitatMeter");
const waterMeter = document.querySelector("#waterMeter");
const erosionMeter = document.querySelector("#erosionMeter");
const mowMeter = document.querySelector("#mowMeter");
const labNarrative = document.querySelector("#labNarrative");
const rainOverlay = document.querySelector("#rainOverlay");

// CALCULATOR ELEMENTS
const calcArea = document.querySelector("#calcArea");
const calcWater = document.querySelector("#calcWater");
const calcCost = document.querySelector("#calcCost");
const calcMowing = document.querySelector("#calcMowing");
const outWater = document.querySelector("#outWater");
const outCost = document.querySelector("#outCost");
const outLabor = document.querySelector("#outLabor");
const outToxicity = document.querySelector("#outToxicity");
const outPestRisk = document.querySelector("#outPestRisk");
const outPestDetail = document.querySelector("#outPestDetail");

// Render Selected Grass Profile
function renderGrassProfile(key) {
  const grass = grassData[key];
  if (!grass) return;

  profileElement.innerHTML = `
    <div class="profile-details">
      <h3>${grass.name}</h3>
      <p class="summary">${grass.summary}</p>
      <div class="profile-specs">
        <p><strong>How it spreads:</strong> ${grass.spread}</p>
        <p><strong>Southeast Texas Risk Factor:</strong> ${grass.risk}</p>
        <p><strong>Native Solution:</strong> ${grass.better}</p>
      </div>
    </div>
  `;
}

// Update Ecological Impact Lab Slider
function updateLab() {
  const nativeVal = Number(slider.value);
  const turfVal = 100 - nativeVal;

  const habitat = Math.min(100, 10 + nativeVal * 0.9);
  const water = Math.min(100, 15 + nativeVal * 0.85);
  const biology = Math.min(100, 20 + nativeVal * 0.8);
  const inputs = Math.max(5, 95 - nativeVal * 0.9);

  nativePercent.textContent = `${nativeVal}%`;
  habitatMeter.style.width = `${habitat}%`;
  waterMeter.style.width = `${water}%`;
  erosionMeter.style.width = `${biology}%`;
  mowMeter.style.width = `${inputs}%`;

  // Adjust rain opacity based on slider to show sponge effect
  // More turf = more rain hitting the surface/running off. More native = rain gets absorbed.
  // Actually, let's toggle rain visual speed or visibility
  if (nativeVal < 25) {
    labNarrative.innerHTML = `<strong>At ${turfVal}% Turf Monoculture:</strong> The lawn acts like a concrete slab. Rain runs off immediately, flushing fertilizers into local bayous and causing streets to pool. Soil biology is dormant, requiring weekly mowing and heavy chemical inputs to survive.`;
    rainOverlay.style.opacity = "0.7";
  } else if (nativeVal < 65) {
    labNarrative.innerHTML = `<strong>At ${nativeVal}% Native Mix:</strong> A balanced suburban landscape. Deep prairie roots begin to open macro-pores in the clay, reducing runoff. Insects, frogs, and insect-eating birds return. Mowing labor is cut in half.`;
    rainOverlay.style.opacity = "0.4";
  } else {
    labNarrative.innerHTML = `<strong>At ${nativeVal}% Native Sponge:</strong> The yard functions as a living storm drainage system. Deep native roots anchor soil, capture 90%+ of rainfall, and sequester carbon. Pest populations are controlled naturally by nesting spiders and beneficial wasps. Mowing drops to twice a year.`;
    rainOverlay.style.opacity = "0.15";
  }
}

// Cultural Paradox Explorer Tabs
function renderParadoxTab(tabKey) {
  const data = paradoxData[tabKey];
  const container = document.querySelector("#paradoxContent");
  if (!data || !container) return;

  container.style.opacity = 0;
  container.style.transform = "translateY(10px)";
  
  setTimeout(() => {
    container.innerHTML = `
      <div class="paradox-grid">
        <div class="paradox-side normal">
          <h4>The Normal Practice</h4>
          <p>${data.normal}</p>
        </div>
        <div class="paradox-side backfire">
          <h4>The Homeowner Backfire</h4>
          <p class="warning-text">${data.consequences}</p>
        </div>
        <div class="paradox-side cure">
          <h4>The Ecological Solution</h4>
          <p class="cure-text">${data.cure}</p>
        </div>
      </div>
    `;
    container.style.opacity = 1;
    container.style.transform = "translateY(0)";
  }, 150);
}

// Calculate Yard Financial & Ecological Footprint
function calculateFootprint() {
  const area = parseFloat(calcArea.value) || 0;
  const minsWater = parseFloat(calcWater.value) || 0;
  const cost = parseFloat(calcCost.value) || 0;
  const mowingHrs = parseFloat(calcMowing.value) || 0;

  // Formulas
  // Water: Standard sprinkler output is ~0.6 gallons/sqft per hour.
  // Watering 30 weeks a year (spring-fall).
  const annualWaterGal = Math.round(area * (minsWater / 60) * 0.623 * 30);
  
  // Direct Financial Drain: Chemical treatment + turf replacement cycles + water bills
  // Water cost average: $5 per 1,000 gallons in TX.
  const waterCost = (annualWaterGal / 1000) * 5;
  const totalCost = Math.round(cost + waterCost);

  // Labor hours spent per year: 35 weeks of active lawn care
  const annualLaborHrs = Math.round(mowingHrs * 35);

  // Runoff toxicity load index
  let runoffRisk = "Low";
  let runoffClass = "safe";
  if (minsWater > 60 && cost > 500) {
    runoffRisk = "Extreme Risk";
    runoffClass = "extreme";
  } else if (minsWater > 30 && cost > 200) {
    runoffRisk = "High Risk";
    runoffClass = "warning";
  } else if (minsWater > 0 || cost > 0) {
    runoffRisk = "Moderate Risk";
    runoffClass = "moderate";
  }

  // Pest Vulnerability Index
  let pestRisk = "Balanced & Protected";
  let pestDetail = "With zero chemical fertilizer or pesticide application, your yard hosts a diverse food web of predatory spiders, ladybugs, and non-venomous snakes. Severe pest infestations are naturally suppressed.";
  let pestClass = "safe";

  if (cost > 600) {
    pestRisk = "Severely Vulnerable";
    pestDetail = "High pesticide use has wiped out 95%+ of your garden's natural predators. Spiders, opossums, and ladybugs are gone. As a result, chinch bugs, sod webworms, ticks, roaches, and rodents will experience sudden, uncontrolled population explosions.";
    pestClass = "extreme";
  } else if (cost > 150) {
    pestRisk = "Elevated Risk";
    pestDetail = "Routine lawn treatments are suppressing natural predator populations. Pests can rebound quickly after rains because there are few spiders, beneficial wasps, or frogs to eat them.";
    pestClass = "warning";
  }

  // Render to DOM
  outWater.textContent = `${annualWaterGal.toLocaleString()} gal / yr`;
  outCost.textContent = `$${totalCost.toLocaleString()} / yr`;
  outLabor.textContent = `${annualLaborHrs} hrs / yr`;
  
  outToxicity.textContent = runoffRisk;
  outToxicity.className = `output-val ${runoffClass}`;

  outPestRisk.textContent = pestRisk;
  outPestRisk.className = `output-val ${pestClass}`;
  outPestDetail.textContent = pestDetail;
}

// Educational Quiz System
function renderQuizQuestion() {
  const container = document.querySelector("#quiz-question-box");
  const fill = document.querySelector("#quizProgressFill");
  if (!container || !fill) return;

  const currentQ = quizData[currentQuizIndex];
  const progressPercent = (currentQuizIndex / quizData.length) * 100;
  fill.style.width = `${progressPercent}%`;

  // Render Quiz Question card
  container.innerHTML = `
    <div class="question-header">
      <span class="question-num">Question ${currentQuizIndex + 1} of ${quizData.length}</span>
      <h3>${currentQ.question}</h3>
    </div>
    <div class="quiz-choices">
      ${currentQ.options
        .map(
          (opt, i) => `
        <button class="choice-btn" data-correct="${opt.correct}" data-index="${i}">
          ${opt.text}
        </button>
      `
        )
        .join("")}
    </div>
    <div class="quiz-explanation-box" id="quizExp" style="display:none;">
      <p id="quizFeedbackText"></p>
      <p class="explanation-details">${currentQ.explanation}</p>
      <button class="button primary" id="nextQuizBtn" style="margin-top:1rem;">
        ${currentQuizIndex === quizData.length - 1 ? "Finish Quiz & See Score" : "Next Question &rarr;"}
      </button>
    </div>
  `;

  // Add choice click handlers
  const choices = container.querySelectorAll(".choice-btn");
  choices.forEach(btn => {
    btn.addEventListener("click", () => {
      // Disable all other buttons
      choices.forEach(b => (b.disabled = true));
      
      const isCorrect = btn.getAttribute("data-correct") === "true";
      if (isCorrect) {
        btn.classList.add("correct");
        document.querySelector("#quizFeedbackText").innerHTML = "<strong style='color:var(--green);'>&check; Correct!</strong>";
      } else {
        btn.classList.add("wrong");
        document.querySelector("#quizFeedbackText").innerHTML = "<strong style='color:var(--rose);'>&cross; Incorrect.</strong>";
        // Highlight correct option
        choices.forEach(b => {
          if (b.getAttribute("data-correct") === "true") b.classList.add("correct");
        });
      }

      // Show explanation
      const expBox = document.querySelector("#quizExp");
      expBox.style.display = "block";
      expBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  });

  // Next Question Button
  document.querySelector("#nextQuizBtn").addEventListener("click", () => {
    currentQuizIndex++;
    if (currentQuizIndex < quizData.length) {
      renderQuizQuestion();
    } else {
      renderQuizFinished();
    }
  });
}

function renderQuizFinished() {
  const container = document.querySelector("#quiz-question-box");
  const fill = document.querySelector("#quizProgressFill");
  if (!container || !fill) return;

  fill.style.width = "100%";
  container.innerHTML = `
    <div class="quiz-finished-card">
      <div class="finished-icon">&starf;</div>
      <h3>Quiz Completed!</h3>
      <p>
        You have successfully explored the hidden ecological mechanics of Southeast Texas. Remember: lawn monocultures are a modern construct pushed by chemical dependency. Planting native tallgrasses and hosting beneficial spiders and snakes helps lock rain into the clay, stops runoff, and balances the food chain.
      </p>
      <button class="button primary" id="restartQuizBtn">Restart Quiz</button>
    </div>
  `;

  document.querySelector("#restartQuizBtn").addEventListener("click", () => {
    currentQuizIndex = 0;
    renderQuizQuestion();
  });
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

  // Grass card selectors
  grassButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      grassButtons.forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderGrassProfile(btn.dataset.grass);
    });
  });

  // Paradox explorer tabs
  const tabButtons = document.querySelectorAll(".paradox-tabs .tab-btn");
  tabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      tabButtons.forEach(b => {
        b.classList.remove("active");
        b.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderParadoxTab(btn.dataset.tab);
    });
  });

  // Calculator inputs event listeners
  [calcArea, calcWater, calcCost, calcMowing].forEach(input => {
    if (input) {
      input.addEventListener("input", calculateFootprint);
    }
  });

  // Slider event listener
  if (slider) {
    slider.addEventListener("input", updateLab);
  }

// Initial renders
  renderGrassProfile("bermuda");
  renderParadoxTab("predators");
  calculateFootprint();
  updateLab();
  renderQuizQuestion();

  // Storm simulator trigger
  const heroVisual = document.querySelector("#heroVisual");
  const stormBtn = document.querySelector("#stormBtn");
  const stormBtnText = document.querySelector("#stormBtnText");

  if (stormBtn && heroVisual) {
    stormBtn.addEventListener("click", () => {
      heroVisual.classList.toggle("active-storm");
      const isActive = heroVisual.classList.contains("active-storm");
      if (isActive) {
        stormBtnText.textContent = "Stop Storm";
        stormBtn.classList.add("active");
      } else {
        stormBtnText.textContent = "Trigger Gulf Downpour";
        stormBtn.classList.remove("active");
      }
    });
  }
});
