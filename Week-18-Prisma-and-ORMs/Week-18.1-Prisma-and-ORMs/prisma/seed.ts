import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// Seed the database with initial data
async function seedDatabase() {
    // Create a new user with their username and password
    let user = await client.user.create({
        data: {
            username: "Mera Naam",
            age : 21,
            password: "password123",
            city : "New Delhi",
            todos: {
                create:
                {
                    title: "Buy groceries",
                    description: "Go to the grocery store and buy essentials",
                    time: "2021-09-01T00:00:00.000Z",
                    completed: false,
                },
                
            },
        },
    });
}
seedDatabase(); // Call the function to seed the database