# Pup Chart

Welcome to Pup Chart, your go-to for storing everything to know about your pet!

<img src="client/public/images/logo.png" alt="Banner Image" width="300">

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Summary](#summary)
- [Installation](#installation-and-usage)
- [Implementation](#implementation)
- [Unit Test Implementation](#unit-test-implementation)
- [Pages](#pages)
- [Credits](#credits)

## Project Overview

Pup Chart is a comprehensive platform designed to help pet owners manage and store all important information about their pets. From basic pet details to daycare plans, Pup Chart ensures you have everything you need in one place.

## Features

- User authentication and profile management.
- Add and manage multiple pets.
- View and plan daycare services.
- Integration with external APIs for additional functionalities.
- Generate PDFs for pet information.

## Summary

Pup Chart provides an efficient way to manage your pet's information, offering a user-friendly interface and robust backend support.

## Installation and Usage

To install and use Pup Chart, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/andrewmuhn/Pup_Chart.git
   ```
2. Navigate to the project directory:
   ```
   cd Pup_Chart
   ```
3. Install the necessary dependencies:
   ```
   npm install
   ```
4. Seed the data if desired:

```
npm run seed
```

5. Start the server:
   ```
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000` to the frontend to begin using Pup Chart.

## Implementation

### Frontend

The frontend of Pup Chart is built with React, providing a dynamic and responsive user interface. Key libraries and frameworks used include:

- **axios** for making API calls.
- **react-bootstrap** for UI components.
- **jspdf** for generating PDFs.

### Backend

The backend is built with Express, providing a robust and scalable API. Key functionalities include:

- User authentication and session management.
- Integration with external APIs, such as:
  - [Dog CEO's Dog API](https://dog.ceo/dog-api/) for fetching dog breed images.
  - [Overpass API](https://overpass-api.de/api/) for finding nearby veterinary services.
- Database interactions using PostgreSQL.

## Unit Test Implementation

To ensure the reliability and correctness of Pup Chart, we use Jest and Supertest for unit testing. Our test setup and some example tests are outlined below:

### Jest Configuration

We configure Jest to look for tests in both the client and server directories, use the Node test environment, clear mocks between tests, and provide verbose output for each test run. The Jest configuration is specified in `jest.config.js`:

#### Supertest

We use Supertest to test our API endpoints for pets, daycare plans and users.

## Pages

### Home Page Logged Out View

![Home Page](client/public/images/readme/homepage.png)

### Home Page Logged In View

![Home Page](client/public/images/readme/homepagelogged.png)

### Mobile View

![Mobile View](client/public/images/readme/mobile.png)

### Sign up Page

![Sign up Page](client/public/images/readme/signup.png)

### Sign in Page

![Sign in Page](client/public/images/readme/signin.png)

### Add Pet Modal

![Services](client/public/images/readme/addpet.png)

### View Daycare Plan Modal

![Check Out](client/public/images/readme/viewdaycare.png)

### Edit Daycare Plan Modal

![Check Out](client/public/images/readme/editdaycare.png)

## Credits

This project was coded by the collaborative efforts of Jared Harvick, Joanna McPherson, and Andrew Muhn using front-end and back-end technologies to create an efficient and user-friendly platform for pet owners. Special thanks to all contributors for their dedication and hard work in making Pup Chart a success.
