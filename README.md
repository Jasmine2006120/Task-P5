# DEV@Deakin — SIT313 P5

## About the Project

DEV@Deakin is a web development project built using React. It provides a personal portfolio-style website where users can explore projects, browse featured tutorials, view a gallery, and subscribe to updates.

The project is developed as part of SIT313 at Deakin University.

## Features

- **Home Page:** A hero section with a hover effect.
- **About Section:** A short introduction to the developer.
- **Featured Tutorials:** Tutorial cards with descriptions and ratings.
- **My Work:** A collection of project cards.
- **Gallery:** A responsive image gallery.
- **Newsletter Subscription:** An email form with input validation and API integration.
- **Responsive Design:** Layouts that adapt to different screen sizes.
- **Authentication:** Login and registration functionality, if enabled in the current application.

## Technologies Used

- React
- JavaScript
- Vite
- Tailwind CSS
- HTML
- Firebase Authentication and Cloud Firestore, if configured
- Node.js and Express, if used by the subscription backend
- Git and GitHub

## Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Jasmine2006120/SIT313-P5.git
   ```

2. Open the project directory:

   ```bash
   cd SIT313-P5
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Configure the environment variables required by your application, if applicable.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal, usually `http://localhost:5173`.

## Environment Configuration

If your application uses Firebase, create a local `.env` file in the project root and configure the Firebase environment variables expected by your Firebase configuration.

If your subscription form uses a separate backend, configure `VITE_API_URL` with the backend's base URL. For local development, the current frontend code defaults to `http://localhost:3000`.

**Important:** Never commit your `.env` file, passwords, private keys, or other secrets to GitHub. Keep sensitive environment files in `.gitignore`.

## Running the Backend

If `server.js` provides the subscription API, check the `scripts` section of `package.json` for the correct backend start command. The backend may need to run in a separate terminal from the Vite frontend.

## Project Structure

```text
SIT313-P5/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   └── ...
├── index.html
├── package.json
├── package-lock.json
├── server.js
├── vite.config.js
├── .gitignore
└── README.md
```

The exact folders and filenames may differ depending on the current project structure.

## Development

To create a production build:

```bash
npm run build
```

To preview the production build locally, if the project uses the default Vite scripts:

```bash
npm run preview
```

## Author

**Jasmine**

SIT313 — Deakin University

## Repository

[View the project on GitHub](https://github.com/Jasmine2006120/SIT313-P5)

## License

This project was created for educational purposes as part of university coursework.
