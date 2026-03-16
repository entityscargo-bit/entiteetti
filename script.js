// ── ALL PHOTOS IN YOUR FOLDER ──
// When you add photos, add the filename here
const photos = [
  "photos/photo1.jpg",
  "photos/photo2.jpg",
  "photos/photo3.jpg",
];

// ── LOAD RANDOM TEXT & PHOTO ──
async function loadRandom() {
  try {
    // Fetch texts from JSON
    const response = await fetch('texts.json');
    const data = await response.json();

    // Combine all texts into one pool
    const allTexts = [
      ...data.essays,
      ...data.critiques,
      ...data.thoughts
    ];

    // Pick a random text
    const randomText = allTexts[Math.floor(Math.random() * allTexts.length)];

    // Pick a random photo
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

    // Update the page
    document.getElementById('random-type').textContent = randomText.type;
    document.getElementById('random-title').textContent = randomText.title;
    document.getElementById('random-body').textContent = randomText.body;
    document.getElementById('random-date').textContent = randomText.date;
    document.getElementById('random-photo').src = randomPhoto;

  } catch (error) {
    console.error('Error loading text:', error);
  }
}

// ── LIBRARY PAGE LOGIC ──
async function loadLibrary(filter = 'all') {
  const grid = document.getElementById('library-grid');
  if (!grid) return;

  try {
    const response = await fetch('texts.json');
    const data = await response.json();

    // Combine all texts
    let allTexts = [
      ...data.essays,
      ...data.critiques,
      ...data.thoughts
    ];

    // Apply filter if needed
    if (filter !== 'all') {
      allTexts = allTexts.filter(t => t.type === filter);
    }

    // Clear grid
    grid.innerHTML = '';

    // Render each item
    allTexts.forEach(text => {
      const item = document.createElement('div');
      item.className = 'library-item';
      item.innerHTML = `
        <p class="text-type">${text.type}</p>
        <h2 class="text-title">${text.title}</h2>
        <p class="text-body">${text.body.substring(0, 150)}...</p>
        <p class="text-date">${text.date}</p>
      `;
      grid.appendChild(item);
    });

  } catch (error) {
    console.error('Error loading library:', error);
  }
}

// ── FILTER BUTTONS ──
function setFilter(filter) {
  // Update active button
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  // Reload<span class="ml-2" /><span class="inline-block w-3 h-3 rounded-full bg-neutral-a12 align-middle mb-[0.1rem]" />