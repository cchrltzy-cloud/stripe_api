const STRIPE_BASE_URL = 'https://api.stripe.com/v1';

function showLoading() {
    const loadingEl = document.getElementById('stripe-loading');
    const errorEl = document.getElementById('stripe-error');
    const resultsEl = document.getElementById('stripe-results');
    if (loadingEl) loadingEl.style.display = 'block';
    if (errorEl) errorEl.style.display = 'none';
    if (resultsEl) resultsEl.innerHTML = '';
}

function hideLoading() {
    const loadingEl = document.getElementById('stripe-loading');
    if (loadingEl) loadingEl.style.display = 'none';
}

function showError(message) {
    const errorEl = document.getElementById('stripe-error');
    const errorMsgEl = document.getElementById('stripe-error-message');
    if (errorEl) errorEl.style.display = 'flex';
    if (errorMsgEl) errorMsgEl.textContent = message;
    hideLoading();
}

function hideError() {
    const errorEl = document.getElementById('stripe-error');
    if (errorEl) errorEl.style.display = 'none';
}

function disableButtons() {
    const buttons = document.querySelectorAll('.stripe-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
    });
}

function enableButtons() {
    const buttons = document.querySelectorAll('.stripe-btn');
    buttons.forEach(btn => {
        btn.disabled = false;
    });
}

// Check kung may laman yung input
function validateInput(input) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    const trimmed = input.trim();
    return trimmed.length > 0;
}

// dito yung pag fefetch actual sa stripe na api
function fetchStripeAPI(endpoint, method = 'GET') {
    if (!STRIPE_API_KEY || STRIPE_API_KEY === 'YOUR_STRIPE_SECRET_KEY_HERE') {
        return Promise.reject(new Error('configure api key'));
    }
    
    const url = STRIPE_BASE_URL + endpoint;
    
    return fetch(url, {
        method: method,
        headers: {
            'Authorization': 'Bearer ' + STRIPE_API_KEY
        }
    })
        .then(response => {
            return response.json().then(data => {
                if (!response.ok) {
                    throw new Error(data.error ? data.error.message : 'http error');
                }
                return data;
            });
        });
}

function getStripeCustomers() {
    return fetchStripeAPI('/customers?limit=10');
}

function getStripeProducts() {
    return fetchStripeAPI('/products?limit=10');
}

function getStripeCustomer(customerId) {
    return fetchStripeAPI('/customers/' + customerId);
}

function getStripeProduct(productId) {
    return fetchStripeAPI('/products/' + productId);
}

// displaying ng results dto
function displayResults(data, type = 'customers') {
    const resultsEl = document.getElementById('stripe-results');
    if (!resultsEl) return;
    
    resultsEl.innerHTML = '';
    
    if (type === 'customers' && data.data) {
        if (data.data.length === 0) {
            resultsEl.innerHTML = '<div class="stripe-empty">' +
                '<i class="bi bi-inbox"></i>' +
                '<p>No customers found</p>' +
                '</div>';
            return;
        }
        
        data.data.forEach(customer => {
            const card = createCustomerCard(customer);
            resultsEl.appendChild(card);
        });
    } else if (type === 'products' && data.data) {
        if (data.data.length === 0) {
            resultsEl.innerHTML = '<div class="stripe-empty">' +
                '<i class="bi bi-inbox"></i>' +
                '<p>No products found</p>' +
                '</div>';
            return;
        }
        
        data.data.forEach(product => {
            const card = createProductCard(product);
            resultsEl.appendChild(card);
        });
    } else if (type === 'customer' && data) {
        const card = createCustomerCard(data);
        resultsEl.appendChild(card);
    } else if (type === 'product' && data) {
        const card = createProductCard(data);
        resultsEl.appendChild(card);
    }
}

//dito namn is yung pag generate t ng customer card tapos dinidisplay sa website 
function createCustomerCard(customer) {
    const card = document.createElement('div');
    card.className = 'stripe-card';
    
    const name = customer.name || customer.email || 'Unknown';
    const email = customer.email || 'No email';
    const balance = customer.balance ? (customer.balance / 100).toFixed(2) : '0.00';
    const created = customer.created ? new Date(customer.created * 1000).toLocaleDateString() : 'N/A';
    
    card.innerHTML = '<div class="stripe-card-header">' +
        '<i class="bi bi-person-circle stripe-card-icon"></i>' +
        '<h3 class="stripe-card-title">' + name + '</h3>' +
        '</div>' +
        '<div class="stripe-card-body">' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Email</div>' +
        '<div class="stripe-card-field-value">' + email + '</div>' +
        '</div>' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Balance</div>' +
        '<div class="stripe-card-field-value">$' + balance + '</div>' +
        '</div>' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Created</div>' +
        '<div class="stripe-card-field-value">' + created + '</div>' +
        '</div>' +
        '<div class="stripe-card-id">' +
        '<strong>ID:</strong> ' + customer.id + '</div>' +
        '</div>';
    
    return card;
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'stripe-card';
    
    const name = product.name || 'Unnamed Product';
    const description = product.description || 'No description';
    const price = product.default_price ? 'See pricing' : 'No price set';
    const active = product.active ? 'Yes' : 'No';
    const created = product.created ? new Date(product.created * 1000).toLocaleDateString() : 'N/A';
    
    card.innerHTML = '<div class="stripe-card-header">' +
        '<i class="bi bi-box stripe-card-icon"></i>' +
        '<h3 class="stripe-card-title">' + name + '</h3>' +
        '</div>' +
        '<div class="stripe-card-body">' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Description</div>' +
        '<div class="stripe-card-field-value">' + description + '</div>' +
        '</div>' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Price</div>' +
        '<div class="stripe-card-field-value">' + price + '</div>' +
        '</div>' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Active</div>' +
        '<div class="stripe-card-field-value">' + active + '</div>' +
        '</div>' +
        '<div class="stripe-card-field">' +
        '<div class="stripe-card-field-label">Created</div>' +
        '<div class="stripe-card-field-value">' + created + '</div>' +
        '</div>' +
        '<div class="stripe-card-id">' +
        '<strong>ID:</strong> ' + product.id + '</div>' +
        '</div>';
    
    return card;
}

// finefetch yung customers gamit tong function nato

function handleGetCustomers() {
    showLoading();
    hideError();
    disableButtons();
    
    getStripeCustomers()
        .then(data => {
            displayResults(data, 'customers');
            hideLoading();
            enableButtons();
        })
        .catch(error => {
            showError(error.message || 'failed to fetch customers');
            enableButtons();
        });
}

function handleGetProducts() {
    showLoading();
    hideError();
    disableButtons();
    
    getStripeProducts()
        .then(data => {
            displayResults(data, 'products');
            hideLoading();
            enableButtons();
        })
        .catch(error => {
            showError(error.message || 'failed to fetch products');
            enableButtons();
        });
}

function handleGetCustomer() {
    const input = document.getElementById('stripe-search-input');
    if (!input) return;
    
    const customerId = input.value.trim();
    
    if (!validateInput(customerId)) {
        showError('enter customer id');
        return;
    }
    
    showLoading();
    hideError();
    disableButtons();
    
    getStripeCustomer(customerId)
        .then(data => {
            displayResults(data, 'customer');
            hideLoading();
            enableButtons();
        })
        .catch(error => {
            if (error.message.includes('No such customer')) {
                showError('customer not found');
            } else {
                showError(error.message || 'failed to get customer');
            }
            enableButtons();
        });
}

function handleGetProduct() {
    const input = document.getElementById('stripe-search-input');
    if (!input) return;
    
    const productId = input.value.trim();
    
    if (!validateInput(productId)) {
        showError('enter product id');
        return;
    }
    
    showLoading();
    hideError();
    disableButtons();
    
    getStripeProduct(productId)
        .then(data => {
            displayResults(data, 'product');
            hideLoading();
            enableButtons();
        })
        .catch(error => {
            if (error.message.includes('No such product')) {
                showError('product not found');
            } else {
                showError(error.message || 'failed to get product');
            }
            enableButtons();
        });
}

const customersBtn = document.getElementById('stripe-customers-btn');
if (customersBtn) {
    customersBtn.addEventListener('click', handleGetCustomers);
}

const productsBtn = document.getElementById('stripe-products-btn');
if (productsBtn) {
    productsBtn.addEventListener('click', handleGetProducts);
}

const getCustomerBtn = document.getElementById('stripe-get-customer-btn');
if (getCustomerBtn) {
    getCustomerBtn.addEventListener('click', handleGetCustomer);
}

const getProductBtn = document.getElementById('stripe-get-product-btn');
if (getProductBtn) {
    getProductBtn.addEventListener('click', handleGetProduct);
}

