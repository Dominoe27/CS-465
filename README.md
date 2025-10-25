# Travlr Getaways Full Stack Project  
**Author:** Dominoe LaMattina  
**Course:** CS-465 – Full Stack Development I  
**Date:** October 2025  

---

## Architecture  

This project gave me the chance to work with both traditional frontend development and a modern single-page application. On the customer side, the Express app handled static pages and server-side rendering. For the admin side, I built an Angular SPA that offered a smoother and more interactive experience. The SPA stood out right away because it could update content instantly without having to reload entire pages, which made everything feel faster and cleaner.  

On the backend, we used MongoDB, a NoSQL database that stores data in flexible, JSON-like documents. It worked perfectly with JavaScript and the rest of the MEAN stack. Since MongoDB doesn’t require a strict schema, it was easy to adjust data models as the project grew. AltexSoft (2023) points out that one of the main advantages of the MEAN stack is how JavaScript connects every part of the application, which keeps development consistent from the frontend to the database.  

---

## Functionality  

Even though JSON looks like JavaScript, it serves a different purpose. JSON is just for storing and transferring data, while JavaScript handles logic and functionality. In this project, JSON was what tied everything together. When an admin added or edited a trip, Angular sent that data as a JSON object to the Express API, which then updated MongoDB and returned the refreshed information back in JSON format.  

I made several changes during development to clean up and streamline the code. On the backend, I turned repeated route logic into reusable functions, which reduced clutter and made debugging easier. On the Angular side, I built shared components like the trip list and trip form. Reusing these pieces kept the interface consistent and saved time when I needed to make updates later.  

---

## Testing  

Testing played a big part in making sure the system actually worked the way I wanted it to. I used Postman to test my API endpoints by sending GET, POST, and PUT requests and checking that data was being returned or updated correctly. Once I added JWT authentication, testing became a little trickier because I had to include a valid token with each request. Learning how to simulate secure requests with authorization headers helped me understand how authentication, middleware, and HTTP methods all fit together to protect the application.  

---

## Reflection  

This course really pulled everything together for me. Building a full MEAN application from start to finish helped me see how all the pieces of web development connect. I learned how APIs communicate with the frontend, how authentication protects data, and how to organize code that can scale over time.  

Professionally, this course gave me skills that will help me move forward in my career. I’m now much more confident working with JavaScript, Node.js, and Angular. I also understand how to secure and test my applications instead of just making them function. These are skills that make me more competitive and capable of taking on real-world full stack projects in the future.  

---

## Reference  

AltexSoft. (2023). *MEAN and MERN: Full-stack development with JavaScript explained.*  
https://www.altexsoft.com/blog/mean-mern-javascript-full-stack/
