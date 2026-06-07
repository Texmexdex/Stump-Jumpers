// DATABASE: Invasive Trees in Southeast Texas
const treeData = {
  tallow: {
    name: "Chinese Tallow Tree",
    summary:
      "A highly aggressive invader from East Asia, also known as the 'popcorn tree'. It colonizes wet prairies, stream banks, and pastures. A single mature tree produces thousands of toxic seeds that wipe out native grass seedlings.",
    spread: "Prolific seeds spread by birds, storm water, and bayou currents.",
    risk: "Critical. Quickly transforms biodiverse wetlands into closed-canopy single-species tallow forests.",
    better: "Hack-and-squirt cambium treatment. Replace with Southern Magnolia, Bald Cypress, or Loblolly Pine."
  },
  privet: {
    name: "Chinese Privet",
    summary:
      "A dense, evergreen shrub introduced as a hedging plant. It grows in thick, impenetrable hedges in forest understories and along waterways, completely blocking light from reaching the soil floor.",
    spread: "Fibrous lateral root runners and heavy black berry crops eaten by birds.",
    risk: "Severe. Completely stops all natural regeneration of native hardwood forests (oaks, sweetgums).",
    better: "Cut-stump paint or manual hand-pulling for seedlings. Swap with evergreen Wax Myrtle or Yaupon Holly."
  },
  camphor: {
    name: "Camphor Tree",
    summary:
      "An evergreen tree from Asia with strongly aromatic crushed leaves. It seeds heavily and invades understories of sandy and acidic oak-pine woodlands, altering soil microbe networks.",
    spread: "Seeds carried by birds and mammals; root shoots.",
    risk: "High. Excludes native shrubs and halts forest canopy replacement cycles.",
    better: "Cut-stump concentrated treatment. Replace with native Red Buckeye, Cherry Laurel, or Sweetbay Magnolia."
  },
  koelreuteria: {
    name: "Golden Rain Tree",
    summary:
      "A fast-growing ornamental tree with pinkish, lantern-like seed capsules. It escapes suburban gardens, colonizing drainage channels, field edges, and bayou forest borders.",
    spread: "Wind-blown papery seed lanterns and water transport.",
    risk: "Moderate to High. Rapid seed colonization in disturbed soils.",
    better: "Prevent seed head development, cut-stump treatment. Swap with native Redbud or American Smoke Tree."
  }
};

// DATABASE: Nursery Paradox Explorer Tabs
const paradoxData = {
  ligustrum: {
    title: "The Privet Hype",
    normal: "Planting fast-growing 'Ligustrum' (Chinese or Japanese Privet) as a quick hedge for suburban privacy along fence lines.",
    consequences: "Privet escapes your property borders instantly. Its root system forms a dense, lateral underground wood mat that absorbs all soil moisture, while its evergreen canopy blocks 98% of light. This prevents native oak acorns and loblolly pine seeds from growing, leaving your yard's woodline barren of new native saplings. When mature oaks die, there are no replacement saplings to succeed them.",
    cure: "Plant native Wax Myrtle or Yaupon Holly. They form dense evergreen privacy screens, support local songbirds, and hold soil stability without chemical warfare."
  },
  tallow_ornament: {
    title: "The Popcorn Tree Hype",
    normal: "Keeping Chinese Tallow trees in the yard because of their heart-shaped leaves and bright white 'popcorn' winter seeds.",
    consequences: "Tallow leaves rot extremely fast, dropping all their weight in a short window. This leaf drop releases massive amounts of nitrogen and toxic tannins into the soil. This alters the soil microbiome and lowers soil pH. The chemical shifts actively suppress native trees while promoting weed species, turning your yard into a weed-patch requiring heavy herbicides.",
    cure: "Replace with native Sweetgum or Red Maple. Both offer beautiful, vibrant autumn colors and leaf drop that builds a rich, natural organic soil sponge."
  },
  migration: {
    title: "The Bird Feed Trap",
    normal: "Leaving privet and tallow trees standing because 'local birds eat the berries and seeds' in winter.",
    consequences: "While birds do eat the abundant berries, research shows that Ligustrum and Tallow berries are high in sugars but extremely low in lipids (essential fats). Migrating birds require high-fat fuels (like native beautyberry or dogwood berries) to survive their grueling flights across the Gulf of Mexico. Feeding on privet is like eating fast food before a marathon, leaving them undernourished and prone to exhaustion.",
    cure: "Plant American Beautyberry and Rusty Blackhaw. They produce beautiful fat-rich berries designed specifically by nature for migratory flight prep."
  }
};

// DOM ELEMENTS
const profileElement = document.querySelector("#treeProfile");
const treeButtons = document.querySelectorAll(".grass-card");
const slider = document.querySelector("#invasionSlider");
const simStatus = document.querySelector("#simStatus");
const sunbeams = document.querySelector("#sunbeams");
const nativeSide = document.querySelector("#nativeSide");
const invasiveSide = document.querySelector("#invasiveSide");
const nativeSapling = document.querySelector("#nativeSapling");
const saplingStatus = document.querySelector("#saplingStatus");
const nativeRoots = document.querySelector("#nativeRoots");
const invasiveRoots = document.querySelector("#invasiveRoots");
const forestAlert = document.querySelector("#forestAlert");

// Render Selected tree Profile
function renderTreeProfile(key) {
  const tree = treeData[key];
  if (!tree) return;

  profileElement.innerHTML = `
    <div class="profile-details">
      <h3>${tree.name}</h3>
      <p class="summary">${tree.summary}</p>
      <div class="profile-specs">
        <p><strong>How it spreads:</strong> ${tree.spread}</p>
        <p><strong>Southeast Texas Risk Factor:</strong> ${tree.risk}</p>
        <p><strong>Native Solution:</strong> ${tree.better}</p>
      </div>
    </div>
  `;
}

// Update Understory Chokehold Simulator
function updateSimulator() {
  if (!slider) return;
  const val = Number(slider.value);
  
  // Set opacity of invasive visual
  invasiveSide.style.opacity = val / 100;
  invasiveRoots.style.opacity = val / 100;
  invasiveRoots.style.transform = `scaleY(${0.4 + (val / 100) * 0.6})`;

  // Sunbeams fade out as invasives grow
  const beams = sunbeams.querySelectorAll("i");
  beams.forEach((beam, idx) => {
    beam.style.opacity = Math.max(0.05, 0.85 - (val / 100) * 0.8);
  });

  // Native roots and sapling state changes
  const visual = document.querySelector("#chokeholdVisual");
  if (val < 25) {
    if (visual) {
      visual.classList.remove("state-moderate", "state-severe");
      visual.classList.add("state-healthy");
    }
    simStatus.textContent = "Healthy Native Forest";
    simStatus.style.color = "var(--green)";
    nativeSapling.classList.remove("withered");
    saplingStatus.textContent = "Thriving";
    saplingStatus.style.color = "var(--green)";
    forestAlert.style.opacity = "0";
    forestAlert.style.transform = "translateX(-50%) translateY(-10px)";
  } else if (val < 70) {
    if (visual) {
      visual.classList.remove("state-healthy", "state-severe");
      visual.classList.add("state-moderate");
    }
    simStatus.textContent = "Moderate Invasion";
    simStatus.style.color = "var(--gold)";
    nativeSapling.classList.remove("withered");
    saplingStatus.textContent = "Struggling (Low Light)";
    saplingStatus.style.color = "var(--gold)";
    forestAlert.style.opacity = "0";
    forestAlert.style.transform = "translateX(-50%) translateY(-10px)";
  } else {
    if (visual) {
      visual.classList.remove("state-healthy", "state-moderate");
      visual.classList.add("state-severe");
    }
    simStatus.textContent = "Privet Chokehold Monoculture";
    simStatus.style.color = "var(--rose)";
    nativeSapling.classList.add("withered");
    saplingStatus.textContent = "Decaying (No Light)";
    saplingStatus.style.color = "var(--rose)";
    forestAlert.style.opacity = "1";
    forestAlert.style.transform = "translateX(-50%) translateY(0)";
  }
}

// Nursery Paradox Explorer Tabs
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

  // Tree card selectors
  treeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      treeButtons.forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderTreeProfile(btn.dataset.tree);
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

  // Slider event listener
  if (slider) {
    slider.addEventListener("input", updateSimulator);
  }

// Initial renders
  renderTreeProfile("tallow");
  renderParadoxTab("ligustrum");
  updateSimulator();
});
