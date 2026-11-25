const welcomeScreen = document.getElementById('welcomeScreen');
const menuScreen = document.getElementById('menuScreen');
const categoryNav = document.getElementById('categoryNav');
const productGrid = document.getElementById('productGrid');
const categoryTitle = document.getElementById('categoryTitle');
const categoryCount = document.getElementById('categoryCount');
const menuEyebrow = document.getElementById('menuEyebrow');
const backButton = document.getElementById('backButton');

let currentMenu = 'cafe';
let currentCategory = 0;

function showWelcome() {
  welcomeScreen.classList.add('active');
  menuScreen.classList.remove('active');
  backButton.hidden = true;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function openMenu(menuKey) {
  currentMenu = menuKey;
  currentCategory = 0;
  welcomeScreen.classList.remove('active');
  menuScreen.classList.add('active');
  backButton.hidden = false;
  renderMenu();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderMenu() {
  const groups = MENU_DATA[currentMenu];
  categoryNav.innerHTML = '';
  groups.forEach((group, index) => {
    const button = document.createElement('button');
    button.className = 'category-button' + (index === currentCategory ? ' active' : '');
    button.type = 'button';
    button.innerHTML = `<span class="category-icon">${group.icon}</span><span class="category-name">${group.name}</span>`;
    button.addEventListener('click', () => {
      currentCategory = index;
      renderMenu();
    });
    categoryNav.appendChild(button);
  });

  const group = groups[currentCategory];
  categoryTitle.textContent = group.name;
  menuEyebrow.textContent = currentMenu === 'cafe' ? 'BARREL CAFE MENU' : 'BARREL RESTAURANT MENU';
  categoryCount.textContent = `${group.items.length} آیتم`;
  productGrid.innerHTML = '';

  group.items.forEach((item) => {
    const card = document.createElement('article');
    card.className = 'product-card';

    const imageArea = document.createElement('div');
    imageArea.className = 'product-image';
    if (item.image && item.image.trim()) {
      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.loading = 'lazy';
      imageArea.appendChild(img);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'placeholder-icon';
      placeholder.textContent = group.icon;
      imageArea.appendChild(placeholder);
    }

    const content = document.createElement('div');
    content.className = 'product-content';
    const name = document.createElement('h2');
    name.className = 'product-name';
    name.textContent = item.name;

    const description = document.createElement('p');
    description.className = 'product-description';
    description.textContent = item.description || '';

    const bottom = document.createElement('div');
    bottom.className = 'product-bottom';
    const price = document.createElement('span');
    price.className = 'product-price' + (item.price ? '' : ' price-empty');
    price.textContent = item.price ? `${item.price} تومان` : 'قیمت: —';

    bottom.appendChild(price);
    content.append(name, description, bottom);
    card.append(imageArea, content);
    productGrid.appendChild(card);
  });
}

document.querySelectorAll('.choice-card').forEach(button => {
  button.addEventListener('click', () => openMenu(button.dataset.menu));
});
document.getElementById('changeMenu').addEventListener('click', showWelcome);
document.getElementById('mobileChange').addEventListener('click', showWelcome);
backButton.addEventListener('click', showWelcome);
document.getElementById('brandHome').addEventListener('click', (event) => {
  event.preventDefault();
  showWelcome();
});
