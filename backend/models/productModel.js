import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please Enter Product Name']
  },
  description: {
    type: String,
    required: [true, 'Please Enter Desctiption Name']
  },
  price: {
    type: Number,
    required: [true, 'Please Enter Amount'],
    maxLength: [8, 'Price Cannont be more than 8 digit']
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      public_id: {
        type: String,
        required: true
      },
      url: {
        type: String,
        required: true
      }
    }
  ],
  category: {
    type: String,
    required: [true, 'Please Enter Product Category']
  },
  stock: {
    type: Number,
    required: [true, 'Please Enter Valid Stock Number'],
    default: 1
  },
  numOfReviews: {
    type: Number,
    required: [true, 'Please Enter Valid Stock Number'],
    default: 1
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true

      },
      name: {
        type: String,
        required: true
      },
      rating: {
        type: String,
        required: true
      },
      comment: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true

  },
  createdAt: {
    type: Date,
    default: Date.now()
  }

})

const Product = mongoose.model('Product', productSchema)
export default Product
