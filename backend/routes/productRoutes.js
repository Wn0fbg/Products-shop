import { Router, json } from "express";
import pool from "../db.js";

const router = Router();

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await pool.query("SELECT * FROM products");
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
      `INSERT INTO products (product_name, price, image) 
      VALUES ($1, $2, $3) 
      RETURNING *
      `,
      [product_name, price, image || false],
    );
    console.log("new product added: ", newProduct);
    res.json(newProduct.rows[0]);
  } catch (err) {
    console.log("Error in create product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Get a product
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await pool.query(
      `SELECT * FROM products WHERE product_id=${id}`,
    );
    res.status(200).json({
      success: true,
      data: product.rows[0],
    });
  } catch (err) {
    console.log("Error in get a product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { product_name, price, image } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products
       SET product_name = $1,
           price = $2,
           image = $3
       WHERE product_id = $4
       RETURNING *`,
      [product_name, price, image, id],
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (err) {
    console.log("Error in updated product", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
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
