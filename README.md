# Cosma Beauty: Skin Care Consultation Platform

Welcome to **Cosma Beauty**, a modern web application designed to help users find personalized skin and hair treatment options. Users can search for concerns, explore suitable treatments and packages offered by clinics, and submit enquiries for consultations. The admin panel allows clinic staff to manage and respond to customer enquiries efficiently.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [Testing the APIs](#testing-the-apis)
- [Database Schema](#database-schema)
- [Deliverables](#deliverables)
- [Future Enhancements](#future-enhancements)
- [Troubleshooting](#troubleshooting)
- [License](#license)

---

## Project Overview

Cosma Beauty connects users seeking solutions for skin and hair concerns with clinics offering tailored treatment packages. The platform has two main components:

- **Frontend:** React-based SPA featuring search, treatments display, enquiry submission, and an admin dashboard.
- **Backend:** Node.js with Express server and SQLite database to handle API requests and data storage.

---

## Features

- **Dynamic Search:** Users can search for specific concerns and get matched treatments and packages in real-time with debounce (2-second delay).
- **Treatment & Package Display:** Clear visualization of treatments with icons and detailed packages with pricing.
- **Enquiry Submission:** Users can submit enquiries with their details and messages related to specific packages.
- **Admin Panel:** Clinic staff can view, manage, and track all enquiries, facilitating better customer service.
- **Responsive & Modern UI:** A clean and vibrant interface built with accessibility and usability in mind.
- **Real-time Validation:** Form validation for enquiry submissions with proper error handling.

---

## Tech Stack

- **Frontend:** React, JavaScript, CSS
- **Backend:** Node.js, Express.js, SQLite3
- **Database:** SQLite (file-based database)
- **API Testing:** Postman / Thunder Client
- **Version Control:** Git & GitHub

---

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- Git

---

### Backend Setup

1. **Clone the repository and navigate to the backend directory:**

   ```bash
   git clone <REPO_URL>
   cd cosma-beauty-demo/backend
   ```

2. **Install backend dependencies:**

   ```bash
   npm install
   ```

   Required packages:
   - express
   - sqlite3
   - cors
   - helmet

3. **Initialize the database and seed data:**

   The backend uses SQLite3. Running the server for the first time will automatically create the database file (`cosma_beauty.db`), create necessary tables, and seed initial data.

   ```bash
   node server.js
   ```

4. **Start the backend server:**

   By default, the Express server will run on port 5000.

   ```bash
   node server.js
   ```

5. **Verify the backend is running:**

   Open a browser or API client and visit the health check endpoint:

   ```
   http://localhost:5000/health
   ```

   Expected JSON response:

   ```json
   {
     "status": "OK",
     "timestamp": "2025-08-20T12:00:00.000Z"
   }
   ```

### Backend Folder Structure

```
backend/
 ├── database/
 │    ├── cosma_beauty.db           # SQLite database file (created automatically)
 │    └── db.js                     # Database connection, schema, and seed logic
 ├── routes/
 │    ├── admin.js                  # Admin enquiries route
 │    ├── enquiries.js              # Enquiry submission route
 │    └── search.js                 # Search concerns route
 ├── node_modules/                  # Installed dependencies
 ├── package.json                  # Backend package config
 ├── package-lock.json             # Dependency lock file
 └── server.js                     # Express server and route registration
```

### Backend API Endpoints Overview

| Endpoint                | Method | Description                                        |
|-------------------------|--------|--------------------------------------------------|
| `/health`               | GET    | Returns server health status                       |
| `/search?concern=text`  | GET    | Search for concerns, returns matched treatments and packages |
| `/enquiries`            | POST   | Submit a user enquiry for a package                |
| `/admin/enquiries`      | GET    | Admin-only endpoint to get all enquiries           |

### Important Backend Notes

- The SQLite database file is created in the `database/` folder as `cosma_beauty.db`.
- The backend initializes tables and seeds data automatically on server start.
- The backend uses CORS middleware to allow requests from the frontend domain (`localhost:3000` by default).
- Make sure to keep the backend running before testing or using the frontend app.

---

### Frontend Setup

1. **Navigate to frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies:**

   ```bash
   npm install
   ```

   The React app uses standard dependencies:
   - react
   - react-dom
   - react-scripts

3. **Start the React development server:**

   ```bash
   npm start
   ```

4. **Open your browser and visit:**

   ```
   http://localhost:3000
   ```

### Frontend Folder Structure

```
frontend/
 ├── src/
 │    ├── components/
 │    │    ├── SearchBar.js         # Search input with debounce
 │    │    ├── TreatmentCard.js     # Individual treatment display
 │    │    ├── PackageCard.js       # Package card with enquiry button
 │    │    ├── EnquiryForm.js       # Modal form for submissions
 │    │    └── LoadingSpinner.js    # Loading indicator
 │    ├── pages/
 │    │    └── AdminPanel.js        # Admin enquiries view
 │    ├── services/
 │    │    └── api.js               # API service functions
 │    ├── styles/
 │    │    └── App.css              # Main stylesheet
 │    ├── App.js                    # Main app component
 │    └── index.js                  # React app entry point
 ├── public/                        # Static assets
 ├── package.json                  # Frontend package config
 └── package-lock.json             # Dependency lock file
```

---

## Running the Application

### Development Mode

1. **Start the backend server:**

   ```bash
   cd backend
   node server.js
   ```

2. **Start the frontend development server (in a new terminal):**

   ```bash
   cd frontend
   npm start
   ```

3. **Access the application:**

   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

### Using the Application

With both backend and frontend running locally, you can:

- **Search:** Type skin/hair concerns (e.g., "acne scars", "dark circles") in the search bar
- **Browse:** View matched treatments with icons and packages with pricing
- **Enquire:** Click "Enquire Now" on any package to submit your details
- **Admin View:** Click "Admin Panel" to view all customer enquiries

---

## API Documentation

### 1. **GET /search?concern=&lt;text&gt;**

Fetch treatments and packages matching the user's concern.

- **Parameters:**
  - `concern` (string, required): Text query to search concerns

- **Example Request:**
  ```
  GET http://localhost:5000/search?concern=acne%20scars
  ```

- **Response:**

  ```json
  {
    "concern": { "id": 1, "name": "acne scars" },
    "treatments": [
      { "id": 1, "name": "Microneedling" },
      { "id": 2, "name": "Chemical Peel" },
      { "id": 3, "name": "Laser Resurfacing" }
    ],
    "packages": [
      {
        "id": 1,
        "clinic_name": "Glow Clinic",
        "package_name": "Acne Scar Treatment Package",
        "price": 299,
        "treatment_id": 1
      },
      {
        "id": 2,
        "clinic_name": "Beauty Plus",
        "package_name": "Chemical Peel Special",
        "price": 199,
        "treatment_id": 2
      }
    ]
  }
  ```

### 2. **POST /enquiries**

Submit an enquiry for a treatment package.

- **Request Body:**

  ```json
  {
    "package_id": 1,
    "user_name": "Jane Doe",
    "user_email": "jane@example.com",
    "message": "I would like to know more about the treatments and pricing."
  }
  ```

- **Response:**

  ```json
  {
    "success": true,
    "enquiry_id": 101
  }
  ```

- **Error Response (400):**

  ```json
  {
    "error": "package_id, user_name and user_email are required"
  }
  ```

### 3. **GET /admin/enquiries**

Admin-only access to fetch all customer enquiries.

- **Example Request:**
  ```
  GET http://localhost:5000/admin/enquiries
  ```

- **Response:**

  ```json
  {
    "enquiries": [
      {
        "id": 101,
        "user_name": "Jane Doe",
        "user_email": "jane@example.com",
        "message": "Interested in details about the treatment.",
        "created_at": "2025-08-20T10:00:00Z",
        "clinic_name": "Glow Clinic",
        "package_name": "Acne Scar Treatment Package",
        "price": 299,
        "treatment_name": "Microneedling"
      },
      {
        "id": 102,
        "user_name": "John Smith",
        "user_email": "john@example.com",
        "message": "Please contact me for consultation.",
        "created_at": "2025-08-20T11:30:00Z",
        "clinic_name": "Eye Care Clinic",
        "package_name": "Dark Circle Solution",
        "price": 449,
        "treatment_name": "Under-eye Filler"
      }
    ]
  }
  ```

### 4. **GET /health**

Health check endpoint to verify server status.

- **Response:**

  ```json
  {
    "status": "OK",
    "timestamp": "2025-08-20T12:00:00.000Z"
  }
  ```

---

## Admin Panel

- **Access:** Click the "Admin Panel" button on the main page
- **Features:**
  - View all customer enquiries in chronological order
  - See customer contact information and messages
  - View package and treatment details for each enquiry
  - Timestamps for tracking enquiry submission times
- **Navigation:** Use the "← Back to Search" button to return to the main interface

---

## Testing the APIs

### Using cURL

1. **Test health endpoint:**
   ```bash
   curl http://localhost:5000/health
   ```

2. **Test search endpoint:**
   ```bash
   curl "http://localhost:5000/search?concern=acne%20scars"
   ```

3. **Test enquiry submission:**
   ```bash
   curl -X POST http://localhost:5000/enquiries \
     -H "Content-Type: application/json" \
     -d '{
       "package_id": 1,
       "user_name": "Test User",
       "user_email": "test@example.com",
       "message": "Test enquiry"
     }'
   ```

4. **Test admin enquiries:**
   ```bash
   curl http://localhost:5000/admin/enquiries
   ```

### Using Postman

1. Import the following requests into Postman:
   - GET `http://localhost:5000/health`
   - GET `http://localhost:5000/search?concern=dark circles`
   - POST `http://localhost:5000/enquiries` (with JSON body)
   - GET `http://localhost:5000/admin/enquiries`

2. Set `Content-Type: application/json` header for POST requests

---


### Sample Data

The database is seeded with:
- **Concerns:** acne scars, dark circles, double chin, wrinkles
- **Treatments:** Microneedling, Chemical Peel, Laser Resurfacing, Under-eye Filler, PRP Under-eye, HIFU, Kybella
- **Packages:** Various treatment packages with pricing ranging from ₹199 to ₹699
- **Concern-Treatment Mappings:** Logical associations between concerns and appropriate treatments

---

## Deliverables

### 1. GitHub Repository

This repository contains:
- Complete source code for both frontend and backend
- Structured project organization with clear separation of concerns
- Comprehensive documentation and setup instructions
- Database schema and seed data
- API documentation with examples

### 2. Screen Recording Demonstration

A 2-3 minute demo video showcasing:
- User searching for a skin concern (e.g., "acne scars")
- Display of matched treatments with visual icons
- Browsing available packages with pricing
- Submitting an enquiry form with validation
- Accessing the Admin Panel to view enquiries
- Complete user flow from search to enquiry submission

---

## Future Enhancements

### Phase 1 Improvements
- User authentication and profile management
- Email notifications to clinics on new enquiries
- Advanced search with filters (price range, location, rating)
- Image uploads for better treatment visualization

### Phase 2 Features
- Real-time chat between users and clinic staff
- Appointment booking system integration
- Payment gateway integration for package bookings
- Review and rating system for treatments

### Phase 3 Scaling
- Multi-tenant architecture for multiple clinic chains
- Mobile app development (React Native)
- AI-powered treatment recommendations
- Analytics dashboard for business insights

### Technical Improvements
- Database migration to PostgreSQL/MySQL for production
- Redis caching for improved performance
- Comprehensive test suite (Jest, React Testing Library)
- Docker containerization for easy deployment
- CI/CD pipeline setup

---

## Troubleshooting

### Common Issues

1. **Backend not starting:**
   - Ensure Node.js is installed (v14+)
   - Check if port 5000 is available
   - Verify all dependencies are installed (`npm install`)

2. **Frontend compilation errors:**
   - Ensure all component files exist in correct directories
   - Check for missing imports or typos in file names
   - Verify React dependencies are installed

3. **API calls failing:**
   - Confirm backend server is running on port 5000
   - Check browser console for CORS errors
   - Verify API endpoints are correctly implemented

4. **Database issues:**
   - Delete `cosma_beauty.db` file and restart server to reset
   - Check file permissions in the database directory
   - Ensure SQLite3 is properly installed

5. **Search not working:**
   - Verify the debounce mechanism (2-second delay)
   - Check network requests in browser DevTools
   - Ensure proper error handling in components

### Debugging Tips

- Use browser DevTools Network tab to monitor API requests
- Check both frontend and backend console logs for errors
- Verify database content using SQLite browser tools
- Test API endpoints independently using cURL or Postman

---

## License

This project is open source under the MIT License.

```
MIT License

Copyright (c) 2025 Cosma Beauty

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Contact & Support

For questions, issues, or contributions, please:
- Open an issue in the GitHub repository
- Submit a pull request for improvements
- Contact the development team via email

**Thank you for using Cosma Beauty!**


---

*Last updated: August 20, 2025*