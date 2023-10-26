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
    const bookId = req.params.id; // Assuming you pass the book ID as a parameter in the URL
    
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
  const bookId = req.params.id; // Assuming the route parameter is named 'id'

  // Check if 'bookId' is a valid ObjectId
  if (!ObjectId.isValid(bookId)) {
    return res.status(400).json({
      message: 'Invalid book Id format or wrong book Id.',
    });
  }

  const bookObjectId = new ObjectId(bookId); // Convert 'bookId' to ObjectId

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
    console.error('Error deleting book:', error); // Log the error
    res.status(500).json({
      message: 'Failed to delete book: An error occurred',
    });
  }
};


  



  // const deleteBookById = async (req, res) => {
  //   const bookId = req.params.id; // Assuming the route parameter is named 'id'
  //   const bookObjectId = new ObjectId(bookId); // Convert 'bookId' to ObjectId
  
  //   try {
  //     const deletedBook = await req.db.collection('books').findOneAndDelete({ _id: bookObjectId });
  
  //     if (deletedBook) {
  //       res.status(200).json({
  //         message: 'Book successfully deleted',
  //         data: deletedBook
  //       });
  //     } else {
  //       res.status(404).json({
  //         message: 'Book not found'
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error deleting book:', error); // Log the error
  //     res.status(500).json({
  //       message: 'Failed to delete book: An error occurred'
  //     });
  //   }
  // };

  const updateBookById = async (req, res) => {
    const bookId = req.params.id; // Assuming the route parameter is named 'id'
  
    // Check if 'bookId' is a valid ObjectId
    if (!ObjectId.isValid(bookId)) {
      return res.status(400).json({
        message: 'Invalid bookId format.',
      });
    }
  
    const bookObjectId = new ObjectId(bookId); // Convert 'bookId' to ObjectId
  
    const { title, author, status } = req.body;
  
    // Create an update object based on provided fields
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
        { returnOriginal: false } // To return the updated document
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
      console.error('Error updating book:', error); // Log the error
      res.status(500).json({
        message: 'Failed to update book: An error occurred',
      });
    }
  };


  // const updateBookById = async (req, res) => {
  //   const bookId = req.params.id; // Assuming the route parameter is named 'id'
  //   const bookObjectId = new ObjectId(bookId); // Convert 'bookId' to ObjectId
  
  //   // Extract the properties to update from the request body
  //   const { title, author, status } = req.body;
  
  //   try {
  //     const updatedBook = await req.db.collection('books').findOneAndUpdate(
  //       { _id: bookObjectId },
  //       {
  //         $set: {
  //           title, // Update the title if provided
  //           author, // Update the author if provided
  //           status, // Update the status if provided
  //         },
  //       },
  //       { returnOriginal: false } // Return the updated document
  //     );
  
  //     if (updatedBook) {
  //       res.status(200).json({
  //         message: 'Book successfully updated',
  //         data: updatedBook.value,
  //       });
  //     } else {
  //       res.status(404).json({
  //         message: 'Book not found',
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error updating book:', error); // Log the error
  //     res.status(500).json({
  //       message: 'Failed to update book: An error occurred',
  //     });
  //   }
  // };


  
  
  
  
  
  module.exports = {
    getAllBooks,
    createBooks,
    deleteBookById,
    updateBookById,
    getBookById
  }