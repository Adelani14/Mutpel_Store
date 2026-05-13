import express from "express";
const app = express();
const PORT = process.env.PORT;
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import cors from "cors";

import "./connection.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
// import orderRoutes from "./routes/orderRoutes.js";
// import cartRoutes from "./routes/cartRoutes.js";


// MIDDLEWARErs
// GLOBAL MIDDLEWARE
app.use(cors({
    origin: [
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],

    credentials: true
}));

app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use("/api/users", userRoutes);

// app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use("/api/categories", categoryRoutes);

// app.use("/api/orders", orderRoutes);

// app.use("/api/cart", cartRoutes);




// SERVER
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});