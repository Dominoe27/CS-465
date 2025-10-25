# Travlr Getaways Full Stack Project  
**Author:** Dominoe LaMattina  
**Course:** CS-465 – Full Stack Development I  
**Date:** October 2025  

---

## Architecture  

Throughout this project, I worked with both traditional frontend development and modern single-page application design. The Express portion handled the static pages and server-side rendering for the customer view, while the Angular application served as the admin interface. Working with Angular gave me a clear understanding of how a single-page application (SPA) can create a more dynamic and responsive user experience. Unlike traditional Express rendering that reloads the page with every request, the SPA updates content instantly, which feels smoother and more efficient overall.  

For the backend, we used MongoDB as our NoSQL database. This choice made sense because MongoDB stores data in flexible, JSON-like documents, which fit naturally with the JavaScript environment used across the project. It eliminated the need for a strict schema and allowed trip data to be stored and retrieved easily. According to AltexSoft (2023), one of the biggest advantages of the MEAN stack is that JavaScript can be used on both the client and server sides, which simplifies the development process and helps maintain consistency across the application.  

---

## Functionality  

JSON, or JavaScript Object Notation, is different from JavaScript even though they look similar. JSON is purely for data storage and transfer, while JavaScript is used for logic and functionality. JSON acts as the connector between the frontend and backend by formatting data in a way that both sides can understand. For example, when the admin adds or edits a trip, Angular sends a JSON payload to the Express API, which then updates MongoDB and returns the new trip data in JSON format for display.  

I refactored parts of the code several times throughout development to make it more efficient. One improvement was consolidating repeated logic in the API routes by turning it into reusable functions. On the Angular side, I created reusable components such as the trip form and trip list, which saved time and made the project easier to maintain. Reusable UI components also helped keep the design consistent and reduced the amount of redundant code that could lead to errors.  

---

## Testing  

Testing was a major part of making sure the application worked as intended. I used Postman to send GET, POST, and PUT requests to confirm that the API endpoints were responding correctly and that the database was updating as expected. When security was added through JWT authentication, testing became more complex because endpoints required a valid token. I learned how to simulate secure requests by including authorization headers in Postman and verifying that unauthorized users were blocked. This helped me understand how different HTTP methods, middleware, and authentication layers work together to protect data and control access within a full stack environment.  

---

## Reflection  

This course brought together everything I’ve learned about full stack development. Building a working MEAN application from start to finish gave me real-world experience with connecting the frontend, backend, and database into one system. I gained a deeper understanding of how APIs communicate with the client side, how authentication works, and how to organize code that can grow and scale.  

Professionally, this course helped me feel more prepared to take on roles in software or web development. I’ve improved my skills in JavaScript, Node.js, and Angular, and I now feel confident setting up and securing a full stack project. These experiences make me a stronger and more marketable candidate because I can manage both client-facing and administrative systems, while keeping performance and security in mind.  

---

## Reference  

AltexSoft. (2023). *MEAN and MERN: Full-stack development with JavaScript explained.*  
https://www.altexsoft.com/blog/mean-mern-javascript-full-stack/
