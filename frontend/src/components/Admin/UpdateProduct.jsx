import React, { useEffect, useState } from 'react'
import MetaData from '../layout/MetaData'
import './UpdateProduct.css'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-hot-toast'
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DescriptionIcon from '@mui/icons-material/Description';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import StorageIcon from '@mui/icons-material/Storage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



import { useNavigate, useParams } from 'react-router-dom'
import { clearErrors, updateProduct, getProductsDetails } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstant'

import Loader from '../layout/Loader/Loader'
import Sidebar from './Sidebar';
import DashboardLayout from './DashboardLayout/DashboardLayout'


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

const UpdateProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token } = useSelector(state => state.authToken)
    const { error, product } = useSelector(state => state.productDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.product)


    const toastId = React.useRef(null);
    const notify = (msg) => toastId.current = toast.loading(msg);
    const success = (msg) => toastId.current = toast.success(msg, { id: toastId.current })


    const [Name, setName] = useState('')
    const [Price, setPrice] = useState(0)
    const [Description, setDescription] = useState('')
    const [Category, setCategory] = useState('')
    const [Stock, setStock] = useState(0)
    const [images, setImages] = useState([])
    const [OldImages, setOldImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])


    const UpdateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = {
            name: Name,
            price: Price,
            description: Description,
            category: Category,
            stock: Stock,
            token: token,
            images: []
        }

        images?.forEach(image => {
            myForm.images.push(image)
        })
        notify('Updating Details...')
        dispatch(updateProduct(params.id, myForm))


    }

    const UpdateProductImagesChange = (e) => {
        const files = Array.from(e.target.files)
        setImages([]);
        setImagesPreview([]);
        setOldImages([])

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


    let productId = params.id;
    useEffect(() => {

        if (!product || product._id !== productId) {

            dispatch(getProductsDetails(productId))


        }
        else {


            setName(product.name)
            setDescription(product.description)
            setPrice(product.price)
            setCategory(product.category)
            setStock(product.stock)
            let imagesArray = [];
            product.images.map(img => imagesArray.push(img.url));
            setImagesPreview(imagesArray)
            setOldImages(imagesArray)

        }
        if (error) {
            toast.error(error, { id: toastId.current })

            dispatch(clearErrors())
        }
        if (updateError) {
            toast.error(updateError)
            dispatch(clearErrors())
        }
        if (isUpdated) {
            success('Product Updated Successfully.')
            dispatch({ type: UPDATE_PRODUCT_RESET })
            navigate('/admin/products')

        }


    }, [dispatch, error, navigate, isUpdated, product, productId, updateError])

    return (
        <> {
            loading ? <Loader /> :
                <>
                    <MetaData title={'Create Product'} />
                    <DashboardLayout title='Update Product Details'>
                        <div className="dashboard">

                            <div className="addProductContainer">

                                <form
                                    className='addProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={UpdateProductSubmitHandler}
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
                                                value={Name}
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
                                                value={Price}
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
                                                value={Description}
                                                required
                                                onChange={e => setDescription(e.target.value)}

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
                                                value={Category}
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
                                                value={Stock}
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
                                                    onChange={UpdateProductImagesChange} />

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
        }
        </>
    )
}

export default UpdateProduct
