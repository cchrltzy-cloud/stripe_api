STRIPE API EXPLORER README

PROJECT DESCRIPTION

The Stripe API Explorer is a web application designed to interact with the Stripe payment platform API to retrieve and display customer and product information. The application provides a comprehensive interface for exploring Stripe data, allowing users to fetch all customers or products, as well as search for specific items by their unique identifiers. Built using HTML, CSS, and JavaScript, the application communicates directly with Stripe's REST API to retrieve real-time data from a Stripe account. The application displays customer information including names, email addresses, account balances, and creation dates, as well as product details such as names, descriptions, pricing information, and active status.

API DETAILS USED

The application utilizes the Stripe REST API version 1 to interact with Stripe services. The base URL for all API requests is https://api.stripe.com/v1. The application uses several Stripe API endpoints including GET /customers to retrieve a list of customers with a limit of 10 items, GET /products to retrieve a list of products with a limit of 10 items, GET /customers/{id} to retrieve a specific customer by ID, and GET /products/{id} to retrieve a specific product by ID. All API requests require authentication using a Bearer token in the Authorization header, which uses the Stripe secret API key. The application handles API responses including successful data retrieval, authentication errors, and resource not found errors. The API key is configured in the config.js file and must be a valid Stripe secret key with appropriate permissions.

INSTRUCTIONS TO RUN THE PROJECT

To run the Stripe API Explorer project, navigate to the stripe directory within your project folder. Open the config.js file and replace the placeholder STRIPE_API_KEY value with your actual Stripe secret API key. You can obtain your Stripe API key from the Stripe Dashboard at https://dashboard.stripe.com/apikeys. Make sure to use a test key for development purposes, which typically starts with sk_test_. Open the index.html file directly in your web browser by double-clicking on it or right-clicking and selecting Open with your preferred browser. The application will load in your browser. Once the page loads, you can click the Get Customers button to retrieve all customers from your Stripe account, or click the Get Products button to retrieve all products. To search for a specific customer or product, enter the ID in the search input field and click either the Get Customer or Get Product button accordingly. The application will display the results in card format below the controls. Use the loading indicators and error messages to understand the status of your API requests.

SCREENSHOTS INCLUDED

Screenshot 1: Main Interface
The main interface displays the Stripe API Explorer header with two main sections: Get All Items section containing buttons to get all customers or products, and Get Specific Item by ID section with a search input field and buttons to get a specific customer or product by ID.

Screenshot 2: Customers Display
After clicking the Get Customers button, the application displays customer cards showing each customer's name, email address, account balance in dollars, creation date, and unique customer ID in a clean card-based layout.

Screenshot 3: Products Display
After clicking the Get Products button, the application displays product cards showing each product's name, description, pricing information, active status, creation date, and unique product ID.

Screenshot 4: Error Handling
When an invalid API key is used, a customer or product ID is not found, or an API error occurs, the application displays an appropriate error message explaining the issue to help users understand what went wrong.

Screenshot 5: Loading State
While fetching data from the Stripe API, the application shows a loading spinner with the message Loading to indicate that the request is in progress.

MEMBERS LISTED AND ROLES



-Edrich Charls Cresencia: API & Authentication Handler

-Abigail Gaspar: JavaScript Logic / Data Processing

-Francheska Zyrill Cuaton: UI & CSS Designer 

-Karylle De Guzman: GitHub & Documentation Manager
