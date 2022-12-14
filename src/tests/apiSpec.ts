import supertest from "supertest";
import app from "../app";


describe("Test endpoint responses", () => {
    describe("Test endpoint app", () => {
       it("gets the api endpoint", async () => {
           const response = await supertest(app).get("/");
           expect(response.status).toBe(200);
       });
    });

    describe("Test endpoint orders", () => {
      it("gets the api endpoint /orders", async () => {
        const response = await supertest(app).get("/orders");
        expect(response.status).toBe(200);
      });
    
       it("gets the api endpoint /orders/:id", async () => {
         const response = await supertest(app).get("/orders/:id");
         expect(response.status).toBe(401);
       });
       it("posts the api endpoint /orders", async () => {
         const response = await supertest(app).post("/orders");
         expect(response.status).toBe(401);
       });
       it("deletes the api endpoint /orders", async () => {
        const response = await supertest(app).delete("/orders");
        expect(response.status).toBe(401);
      });
     
    });
    describe("Test endpoint product", () => {
        it("gets the api endpoint /product", async () => {
          const response = await supertest(app).get("/product");
          expect(response.status).toBe(200);
        });
      
         it("gets the api endpoint /product/:id", async () => {
           const response = await supertest(app).get("/product/:id");
           expect(response.status).toBe(200);
         });
         it("posts the api endpoint /product", async () => {
           const response = await supertest(app).post("/product");
           expect(response.status).toBe(401);
         });
         it("deletes the api endpoint /product", async () => {
          const response = await supertest(app).delete("/product");
          expect(response.status).toBe(401);
        });
       
      }) ;  
      describe("Test endpoint users", () => {
        it("gets the api endpoint /users", async () => {
          const response = await supertest(app).get("/users");
          expect(response.status).toBe(401);
        });
      
         it("gets the api endpoint /users/:id", async () => {
           const response = await supertest(app).get("/users/:id");
           expect(response.status).toBe(401);
         });
         it("posts the api endpoint /users", async () => {
           const response = await supertest(app).post("/users");
           expect(response.status).toBe(400);
         });
         it("deletes the api endpoint /users", async () => {
          const response = await supertest(app).delete("/users");
          expect(response.status).toBe(401);
          
        });
        it("posts the api endpoint /users/authen", async () => {
            const response = await supertest(app).post("/users/authen");
            expect(response.status).toBe(401);
          });
       
      }) ;        
  });