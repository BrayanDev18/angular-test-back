import { Router } from "express";
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = Router()

router.get("/books", getBooks)
router.get("/book/:id", getBook)
router.post("/create-book", createBook)
router.put("/update-book/:id", updateBook)
router.delete("/delete-book/:id", deleteBook)

export default router