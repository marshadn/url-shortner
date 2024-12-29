# URL Shortener Project(trimmr)

A simple and efficient URL shortener application built using **React.js**. This project enables users to convert long URLs into shorter, more manageable links. It also provides a user-friendly interface for managing and tracking shortened URLs.

## Features

- **URL Shortening**: Instantly generate short URLs from long links.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Link Management**: View and manage all shortened URLs.
- **Custom Aliases**: Option to customize the alias for shortened links.
- **Analytics**: Track the number of clicks on each shortened URL.
- **User Authentication**: Personalized link management for authenticated users.
- **Persistent Storage**: Integration with a database for saving URLs and analytics.
- **Enhanced UI/UX**: Improved user experience with an intuitive interface.

## Technologies Used

- **Frontend**: React.js
- **Styling**: Tailwind CSS (Shadcn ui)
- **Routing**: React Router DOM 
- **Backend**: API integration for URL shortening service (custom hooks also)
- **State Management**: State management library  used,  Context API.

## Installation

Follow these steps to run the project locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/marshadn/url-shortener.git
   cd url-shortener
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Folder Structure

```plaintext
url-shortener/
├── public/            # Public assets
├── src/               # Source code
│   ├── components/    # Reusable React components
│   ├── pages/         # Application pages
│   ├── utils/         # Utility functions (if any)
│   ├── App.jsx        # Main application component
│   ├── main.jsx       # Entry point
├── package.json       # Project metadata and dependencies
├── tailwind.config.js # Tailwind CSS configuration
└── README.md          # Project documentation
```

## Usage

1. Enter the long URL you want to shorten into the input field.
2. (Optional) Provide a custom alias for the shortened link.
3. Click on the "Shorten URL" button.
4. Copy and share your shortened link!

## Screenshots

![URL Shortener Screenshot](screenshot.png)
*(Include a screenshot of your application interface)*


