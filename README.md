#PROJECT ALBENTA#

#INTRODUCTION

This project, owned and maintained by Ruslan Hrinov, is a full-stack application leveraging modern technologies to deliver a seamless user experience. It combines React.js for the frontend and Express.js for the backend.

It is solely a personal project (!), not affiliated with my professional work or intended for financial gain, but rather to showcase my skills and expertise.

This application serves as a unique banking platform where each new user receives an initial deposit of 1000 "imaginary" dollars upon registration. Users have the opportunity to invest these funds and generate profits. Unlike traditional banking systems, this platform operates on an hourly basis, providing returns on deposits every hour.

Users can open deposits for various durations, each associated with different interest rates. For instance, opening a deposit for 5 hours might incur a 10% interest rate per hour. Therefore, after 5 hours, users can expect to receive a 50% (5 \* 10) profit on their initial deposit.

Also, users of this application have access to a range of features enabling them to effectively manage their deposits, track their activity, and update their profile information.

#GETTING STARTED

To run the application locally, follow these steps:

    Clone this repository to your local machine.
    Navigate to the project directory.
    Run npm install to install dependencies.
    Execute npm run dev command to start the application.

#KEY TECHNOLOGIES

- FRONTEND

  React.js: A powerful JavaScript library for building interactive user interfaces.
  Ant Design: A comprehensive React UI library offering a wide range of components for rapid development.
  Redux Toolkit: A toolset for efficient state management in React applications.
  Sass: A popular CSS extension language providing advanced features like variables, nesting, and mixins for better styling.

- BACKEND

  Express.js: A minimalist web framework for Node.js, providing robust features for building web applications and APIs.
  Knex.js: A SQL query builder for PostgreSQL, simplifying database interactions and migrations.
  WebSockets: Utilized for real-time rendering, particularly for displaying timers on open deposits.
  Firebase: Used as a database for storing images, providing scalable and reliable cloud storage.
  JWT: tokens encryption is implemented for enhanced security

- OTHER TOOLS

  Chart.js: A JavaScript library for creating HTML-based charts to visualize data effectively.
  React Spring: An animation library for React applications, enhancing user experience with fluid motion.
  nodemon: A utility for automatically restarting the server during development for seamless workflow.
  Vite.js: A fast, opinionated frontend build tool that provides an optimized development experience.
  Docker: Leveraged for containerization, facilitating consistent deployment environments.
  Vercel: Frontend deployment platform providing seamless integration and scalability.
  Fly.io: Server deployment platform hosting Docker containers, ensuring reliable and scalable backend infrastructure.

- DEPLOYMENT

Deployment is automated using YAML configuration files, ensuring consistency and efficiency in the deployment process.

#CONCLUSION

This project showcases the power of modern technologies in building robust and scalable web applications. By leveraging React.js and Express.js along with a range of complementary tools and libraries, it delivers a seamless user experience while maintaining best practices in development and deployment.
