import { Book } from "../models/book.model.js"

export const getBooks = async (req, res) => {
  try {
    const allBooks = await Book.find({})

    if (allBooks.length === 0) {
      return res.status(400).json({ success: false, message: "Empty books query" })
    }

    return res.status(200).json({ success: true, message: "Successfully retrieved books", books: allBooks })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}


export const getBook = async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findById(id)

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" })
    }

    return res.status(200).json({ success: true, message: "Found book", book })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}


export const createBook = async (req, res) => {
  try {

    const { title, author, genre, yearOfPublication } = req.body

    if (!author || !title || !yearOfPublication) {
      throw new Error("All fields are required")
    }

    const bookAlreadyExist = await Book.findOne({ title })

    if (bookAlreadyExist) {
      return res.status(400).json({ success: false, message: "Book already exist" })
    }

    const newBook = await Book.create({ title, author, genre, yearOfPublication })

    return res.status(201).json({ success: true, message: "Successfully created book", book: newBook._doc })

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}

export const updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { title, genre, yearOfPublication, author } = req.body

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, genre, yearOfPublication, author },
      { new: true, runValidators: true }
    )

    if (!updatedBook) {
      return res.status(404).json({ success: false, message: "Book not found" })
    }

    return res.status(200).json({ success: true, message: "Successfully updated book", book: updatedBook })
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}


export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params

    const book = await Book.findOneAndDelete({ _id: id })

    if (!book) {
      return res.status(404).json({ success: false, message: "Book not found" });
    }

    return res.status(200).json({ success: true, message: "Deleted book", book });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server error", error: error.message })
  }
}


