import AccountTreeIcon from '@mui/icons-material/AccountTree';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import './NewProduct.css';

import { useNavigate } from 'react-router-dom';
import { clearErrors, newProduct } from '../../actions/productActions';
import { NEW_PRODUCT_RESET } from '../../constants/productConstant';
import DashboardLayout from "./DashboardLayout/DashboardLayout"
const categories = [
  "Select Category",
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attries",
  "Camera",
  "SmartPhones"
]

const NewProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.authToken)
  const { loading, error, success } = useSelector(state => state.newProduct)

  const [Name, setName] = useState('')
  const [Price, setPrice] = useState(0)
  const [Description, setDescription] = useState('')
  const [Category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])



  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", Name)
    myForm.set("price", Price)
    myForm.set("description", Description)
    myForm.set("category", Category)
    myForm.set("stock", Stock)
    myForm.set("token", token)

    images.forEach(image => {
      myForm.append("images", image)
    })

    dispatch(newProduct(myForm))


  }

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)
    setImages([]);
    setImagesPreview([]);

    files.forEach(file => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {

          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])

        }
      }
      reader.readAsDataURL(file)


    })
  }



  useEffect(() => {

    if (error) {

      dispatch(clearErrors())
    }
    if (success) {
      navigate('/admin/dashboard')
      dispatch({ type: NEW_PRODUCT_RESET })

    }
  }, [dispatch, error, navigate, success])

  return (
    <>
      <MetaData title={'Add Product'} />
      <DashboardLayout title='Add New Product'>
        <div className="dashboard">
          <div className="addProductContainer">

            <form
              className='addProductForm'
              encType='multipart/form-data'
              onSubmit={createProductSubmitHandler}
            >
              <div>
                <span className='extra-info'>To start selling,all you need is name, price, category and a photo</span></div>
              <div>
                <div>
                  <label htmlFor="p-name">Name</label>
                </div>
                <div className='form-input'>
                  <SpellcheckIcon />
                  <input
                    type="text"
                    id='p-name'
                    placeholder='Product Name'
                    required
                    onChange={e => setName(e.target.value)} />
                </div>
                <div>
                  <span className='extra-info'>Give your product a short and clear name</span>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor="p-price">Price</label>
                </div>
                <div className='form-input'>
                  <AttachMoneyIcon />
                  <input
                    type="number"
                    placeholder='Price'
                    id='p-price'
                    required
                    onChange={e => setPrice(e.target.value)} />
                </div>
                <div>
                  <span className='extra-info'>Allow customers to pay what they want?</span>
                </div>
              </div>


              <div>
                <div>
                  <label htmlFor="p-desc">Description</label>
                </div>
                <div className='form-input'>
                  <DescriptionIcon />
                  <textarea
                    id='p-desc'
                    placeholder='Product Description'
                    required
                    onChange={e => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  />
                </div>
                <div>
                  <span className='extra-info'>Give your product a short and clear description</span>
                </div>
              </div>


              <div>
                <div>
                  <label >Category</label>
                </div>
                <div className='form-input'>
                  <AccountTreeIcon />
                  <select
                    onChange={e => setCategory(e.target.value)}
                  >
                    {
                      categories.map(cate => (<option key={cate} value={cate}>{cate}</option>))
                    }

                  </select>
                </div>
                <div>
                  <span className='extra-info'>Tag a category which suites most to your product</span>
                </div>
              </div>

              <div>
                <div>
                  <label htmlFor='p-stock'>Stock</label>
                </div>
                <div className='form-input'>
                  <StorageIcon />
                  <input
                    type="Number"
                    placeholder='Stock'
                    required
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
                <div>
                  <span className='extra-info'>Allot expected stock you have</span>
                </div>
              </div>

              <div >
                <span className='extra-info'>Add upto 5 clear images of your product</span>
                <div className='media'>
                  <div id='registerImage'>

                    <input type="file"
                      id='p-media'
                      name='avatar'
                      accept='image/*'
                      multiple
                      style={{ display: 'none' }}
                      onChange={createProductImagesChange} />

                  </div>

                  <div id="addProductFormImage">
                    {
                      imagesPreview.map((image, idx) =>
                        <img key={idx} src={image} alt="Avatar Preview" />
                      )

                    }
                  </div>
                  <div className='addMediaFiles' title='Add media files'>
                    <label htmlFor='p-media'><AddPhotoAlternateIcon /></label>
                  </div>
                </div>

              </div>

              <button
                className='createProductBtn'
                type='submit'
                disabled={loading ? true : false}
              >
                Create
              </button>



            </form>
          </div>
        </div>
      </DashboardLayout>
    </>
  )
}

export default NewProduct
