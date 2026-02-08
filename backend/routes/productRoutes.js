import { Router, json } from "express";
import pool from "../db.js";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await pool.query(
      `SELECT * FROM products ORDER BY created_at DESC`,
    );
    console.log("fetched products", products);
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    console.log("Error in get products", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Create a new product
router.post("/", async (req, res) => {
  const { product_name, price, image } = req.body;
  if (!product_name || !price || !image) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const newProduct = await pool.query(
      `
      INSERT INTO products (product_name, price, image) 
      VALUES (${product_name}, ${price}, ${image}) 
      RETURNING *
      `,
    );
    console.log("new product added: ", newProduct);
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (err) {
    console.log("Error in create product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get a product
router.get("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const product = await pool.query(
      `SELECT * FROM products WHERE product_id=${product_id}`,
    );
    res.status(200).json({ success: true, data: product[0] });
  } catch (err) {
    console.log("Error in get a product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update a product
router.put("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  const { product_name, price, image } = req.body;

  try {
    const updateProduct = await pool.query(
      `SET 
         product_name=${product_name}, 
         price=${price}, 
         image=${image} 
      WHERE product_id=${product_id}
      RETURNING *`,
    );
    if (updateProduct.length === 0) {
      res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (err) {
    console.log("Error in updated product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete a product
router.delete("/:product_id", async (req, res) => {
  const { product_id } = req.params;
  try {
    const deletedProduct = await pool.query(
      `DELETE FROM products WHERE product_id=${product_id} RETURNING *`,
    );

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (err) {
    console.log("Error in deleted product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export default router;
