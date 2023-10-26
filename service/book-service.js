const { ObjectId } = require('mongodb');

const getAllBooks = async (req, res) => {
    try {
      const books = await req.db.collection('books').find().toArray()
      
      res.status(200).json({
        message: 'Books successfully retrieved',
        data: books
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }

  const getBookById = async (req, res) => {
    const bookId = req.params.id; 
    
    try {
      const book = await req.db.collection('books').findOne({ _id: new ObjectId(bookId) });
  
      if (!book) {
        res.status(404).json({
          message: 'Book not found',
        });
      } else {
        res.status(200).json({
          message: 'Book successfully retrieved',
          data: book,
        });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  
  
  const createBooks = async (req, res) => {
    const { title, author, status } = req.body
    
    console.log(title, author);
    
    try {
      const newBook = await req.db.collection('books').insertOne({ title, author, status })
      
      res.status(200).json({
        message: 'Book successfully created',
        data: newBook
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  }


const deleteBookById = async (req, res) => {
  const bookId = req.params.id; 

  // Check if 'bookId' is a valid ObjectId
  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({
      message: 'Invalid book Id format or wrong book Id.',
    });
  }

  const bookObjectId = new ObjectId(bookId); 

  try {
    const deletedBook = await req.db.collection('books').findOneAndDelete({ _id: bookObjectId });

    if (deletedBook) {
      res.status(200).json({
        message: 'Book successfully deleted',
        data: deletedBook,
      });
    } else {
      res.status(404).json({
        message: 'Book not found',
      });
    }
  } catch (error) {
    console.error('Error deleting book:', error); 
    res.status(500).json({
      message: 'Failed to delete book: An error occurred',
    });
  }
};



  const updateBookById = async (req, res) => {
    const bookId = req.params.id; 
  
   
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid bookId format.',
      });
    }
  
    const bookObjectId = new ObjectId(bookId); 
  
    const { title, author, status } = req.body;
  
   
    const updateFields = {};
    if (title) {
      updateFields.title = title;
    }
    if (author) {
      updateFields.author = author;
    }
    if (status) {
      updateFields.status = status;
    }
  
    try {
      const updatedBook = await req.db.collection('books').findOneAndUpdate(
        { _id: bookObjectId },
        { $set: updateFields },
        { returnOriginal: false } 
      );
  
      if (updatedBook) {
        res.status(200).json({
          message: 'Book successfully updated',
          data: updatedBook.value,
        });
      } else {
        res.status(404).json({
          message: 'Book not found',
        });
      }
    } catch (error) {
      console.error('Error updating book:', error); 
      res.status(500).json({
        message: 'Failed to update book: An error occurred',
      });
    }
  };




  
  
  
  
  
  module.exports = {
    getAllBooks,
    createBooks,
    deleteBookById,
    updateBookById,
    getBookById
  }
