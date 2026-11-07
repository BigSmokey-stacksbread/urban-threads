// Urban Threads Clothing Store

// 1. Store product information in an array of objects
const products = [
  {
      id: 1,
      name: "Classic White T-Shirt",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
  },
  {
      id: 2,
      name: "Casual Denim Jacket",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=600"
  },
  {
      id: 3,
      name: "Everyday Hoodie",
      price: 44.99,
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
  },
  {
      id: 4,
      name: "Modern Black Outfit",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600"
  },
  {
      id: 5,
      name: "Casual Streetwear",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600"
  },
  {
      id: 6,
      name: "Classic Fashion Jacket",
      price: 69.99,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600"
  }
];

// 2. Load saved favorites from browser storage
function loadFavorites() {
  try {
      const saved = JSON.parse(
          localStorage.getItem("urbanThreadsFavorites")
      );

      if (!Array.isArray(saved)) {
          return [];
      }

      return saved.filter(id =>
          products.some(product => product.id === id)
      );
  } catch (error) {
      return [];
  }
}

let favorites = loadFavorites();

// 3. Save favorites in localStorage
function saveFavorites() {
  localStorage.setItem(
      "urbanThreadsFavorites",
      JSON.stringify(favorites)
  );
}

// 4. Display all clothing products
function displayProducts() {
  const productList = document.getElementById("product-list");

  productList.innerHTML = products.map(product => {
      const isFavorite = favorites.includes(product.id);

      return `
          <div class="product-card">
              <img src="${product.image}"
                   alt="${product.name}"
                   loading="lazy">

              <h3>${product.name}</h3>

              <p class="price">$${product.price.toFixed(2)}</p>

              <button
                  data-action="toggle"
                  data-id="${product.id}">
                  ${isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
          </div>
      `;
  }).join("");
}

// 5. Display the customer's wishlist
function displayWishlist() {
  const wishlistItems = document.getElementById("wishlist-items");
  const wishlistCount = document.getElementById("wishlist-count");

  const favoriteProducts = products.filter(product =>
      favorites.includes(product.id)
  );

  wishlistCount.textContent =
      `You have ${favoriteProducts.length} favorite items.`;

  if (favoriteProducts.length === 0) {
      wishlistItems.innerHTML =
          "<p>Your wishlist is empty. Explore our collection!</p>";
      return;
  }

  wishlistItems.innerHTML = favoriteProducts.map(product => `
      <div class="product-card">
          <img src="${product.image}" alt="${product.name}">

          <h3>${product.name}</h3>

          <p class="price">$${product.price.toFixed(2)}</p>

          <button data-action="remove" data-id="${product.id}">
              Remove from Wishlist
          </button>
      </div>
  `).join("");
}

// 6. Add or remove a product from the wishlist
function toggleFavorite(productId) {
  if (favorites.includes(productId)) {
      favorites = favorites.filter(id => id !== productId);
  } else {
      favorites.push(productId);
  }

  saveFavorites();
  displayProducts();
  displayWishlist();
}

// 7. Handle wishlist button clicks
document.getElementById("product-list").addEventListener("click", function(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const productId = Number(button.dataset.id);

  if (Number.isInteger(productId)) {
      toggleFavorite(productId);
  }
});

// 8. Handle remove buttons in the wishlist
document.getElementById("wishlist-items").addEventListener("click", function(event) {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const productId = Number(button.dataset.id);

  if (Number.isInteger(productId)) {
      toggleFavorite(productId);
  }
});

// 9. Load products and saved favorites when the page opens
displayProducts();
displayWishlist();
// 10. Contact form validation

const contactForm = document.getElementById("contact-form");

// Function to display an error message
function showError(fieldId, message) {
    document.getElementById(fieldId + "-error").textContent = message;
}

// Function to clear error messages
function clearErrors() {
    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("message-error").textContent = "";
    document.getElementById("form-success").textContent = "";
}

// Validate the contact form
function validateForm(name, email, message) {
    let isValid = true;

    clearErrors();

    // Check name
    if (name.trim() === "") {
        showError("name", "Please enter your name.");
        isValid = false;
    } else if (name.trim().length < 2) {
        showError("name", "Name must contain at least 2 characters.");
        isValid = false;
    }

    // Check email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
        showError("email", "Please enter your email address.");
        isValid = false;
    } else if (!emailPattern.test(email.trim())) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }

    // Check message
    if (message.trim() === "") {
        showError("message", "Please enter a message.");
        isValid = false;
    } else if (message.trim().length < 10) {
        showError("message", "Message must contain at least 10 characters.");
        isValid = false;
    }

    return isValid;
}

// Handle form submission
contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (validateForm(name, email, message)) {
        document.getElementById("form-success").textContent =
            "Thank you, " + name.trim() +
            "! Your message has been successfully validated.";

        contactForm.reset();
    }
});