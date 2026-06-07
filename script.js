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

// DATABASE: Common Yard Practices & Unintended Consequences
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
    title: "Broad-Spectrum Sprays",
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

// DOM ELEMENTS
const profileElement = document.querySelector("#grassProfile");
const grassButtons = document.querySelectorAll(".grass-card");

// Render Selected Grass Profile
function renderGrassProfile(key) {
  const grass = grassData[key];
  if (!grass || !profileElement) return;

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

// Yard Practices Explorer Tabs
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
          <h4>The Common Practice</h4>
          <p>${data.normal}</p>
        </div>
        <div class="paradox-side backfire">
          <h4>Why It Backfires</h4>
          <p class="warning-text">${data.consequences}</p>
        </div>
        <div class="paradox-side cure">
          <h4>The Better Approach</h4>
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
  // Attach scroll-reveal observers
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

  // Grass card selectors
  grassButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      grassButtons.forEach(item => item.classList.remove("active"));
      btn.classList.add("active");
      renderGrassProfile(btn.dataset.grass);
    });
  });

  // Yard practices explorer tabs
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

  // Initial renders
  renderGrassProfile("bermuda");
  renderParadoxTab("predators");
});
