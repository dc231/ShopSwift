import axios from 'axios'
export const AxiosClient = axios.create({
    withCredentials: true,
    baseURL:
        process.env.NODE_ENV === 'production'
            ? 'https://tiny-plum-coyote-vest.cyclic.app'
            : 'http://localhost:4000',
})

export const filtersLabels = [
    'Category',
    'Sort By',
    'Rating',
    'Price',
    'More Filters',
]

export const sortByItems = [
    'Popularity',
    'Rating: High to Low',
    'Cost: High to Low',
    'Cost: Low to High',
]

export const categoryItems = [
    { label: 'All', value: '' },
    { label: 'Laptop', value: 'Laptop' },
    { label: 'Footwear', value: 'Footwear' },
    { label: 'Bottom', value: 'Bottom' },
    { label: 'Tops', value: 'Tops' },
    { label: 'Attire', value: 'Attire' },
    { label: 'SmartPhones', value: 'SmartPhones' },
]
const fakeProductArray = [
    {
        name: 'Asus Tuf Gaming F15',
        description:
            'A powerful gaming laptop designed for immersive gaming experiences.',
        price: 1999.99,
        ratings: 4.25,
        images: [
            {
                public_id: 'asus_tuf_gaming_f15_image_1',
                url: 'https://example.com/asus_tuf_gaming_f15_image_1.jpg',
            },
            {
                public_id: 'asus_tuf_gaming_f15_image_2',
                url: 'https://example.com/asus_tuf_gaming_f15_image_2.jpg',
            },
            {
                public_id: 'asus_tuf_gaming_f15_image_3',
                url: 'https://example.com/asus_tuf_gaming_f15_image_3.jpg',
            },
        ],
        category: 'Gaming Laptop',
        stock: 20,
        numOfReviews: 5,
        reviews: [
            {
                user: '658142fc0a340c2640b73791',
                name: 'Reviewer 1',
                rating: 4.0,
                comment: 'Impressive performance and cool design!',
            },
            {
                user: '658142fc0a340c2640b73792',
                name: 'Reviewer 2',
                rating: 4.5,
                comment: 'Great value for the price.',
            },
        ],
        user: '658142fc0a340c2640b73793',
    },
    {
        name: 'Samsung Galaxy S21',
        description:
            'The latest smartphone with a stunning display and powerful camera.',
        price: 999.99,
        ratings: 4.75,
        images: [
            {
                public_id: 'samsung_galaxy_s21_image_1',
                url: 'https://example.com/samsung_galaxy_s21_image_1.jpg',
            },
            {
                public_id: 'samsung_galaxy_s21_image_2',
                url: 'https://example.com/samsung_galaxy_s21_image_2.jpg',
            },
            {
                public_id: 'samsung_galaxy_s21_image_3',
                url: 'https://example.com/samsung_galaxy_s21_image_3.jpg',
            },
        ],
        category: 'Smartphone',
        stock: 15,
        numOfReviews: 8,
        reviews: [
            {
                user: '658142fc0a340c2640b73794',
                name: 'Reviewer 3',
                rating: 4.25,
                comment: 'Amazing camera quality!',
            },
            {
                user: '658142fc0a340c2640b73795',
                name: 'Reviewer 4',
                rating: 4.5,
                comment: 'Sleek design and powerful features.',
            },
        ],
        user: '658142fc0a340c2640b73796',
    },
    {
        name: 'Dell Inspiron 15',
        description:
            'A reliable laptop for everyday use, featuring a responsive touchpad and long-lasting battery.',
        price: 799.99,
        ratings: 4.0,
        images: [
            {
                public_id: 'dell_inspiron_15_image_1',
                url: 'https://example.com/dell_inspiron_15_image_1.jpg',
            },
            {
                public_id: 'dell_inspiron_15_image_2',
                url: 'https://example.com/dell_inspiron_15_image_2.jpg',
            },
            {
                public_id: 'dell_inspiron_15_image_3',
                url: 'https://example.com/dell_inspiron_15_image_3.jpg',
            },
        ],
        category: 'Laptop',
        stock: 25,
        numOfReviews: 6,
        reviews: [
            {
                user: '658142fc0a340c2640b73797',
                name: 'Reviewer 5',
                rating: 3.75,
                comment: 'Great value for everyday tasks.',
            },
            {
                user: '658142fc0a340c2640b73798',
                name: 'Reviewer 6',
                rating: 4.0,
                comment: 'Solid build quality.',
            },
        ],
        user: '658142fc0a340c2640b73799',
    },
    {
        name: 'Sony PlayStation 5',
        description:
            'The latest gaming console with cutting-edge graphics and a vast library of games.',
        price: 499.99,
        ratings: 4.5,
        images: [
            {
                public_id: 'sony_playstation_5_image_1',
                url: 'https://example.com/sony_playstation_5_image_1.jpg',
            },
            {
                public_id: 'sony_playstation_5_image_2',
                url: 'https://example.com/sony_playstation_5_image_2.jpg',
            },
            {
                public_id: 'sony_playstation_5_image_3',
                url: 'https://example.com/sony_playstation_5_image_3.jpg',
            },
        ],
        category: 'Gaming Console',
        stock: 10,
        numOfReviews: 7,
        reviews: [
            {
                user: '658142fc0a340c2640b7379a',
                name: 'Reviewer 7',
                rating: 4.5,
                comment: 'Amazing graphics and performance!',
            },
            {
                user: '658142fc0a340c2640b7379b',
                name: 'Reviewer 8',
                rating: 4.0,
                comment: 'Great addition to my gaming setup.',
            },
        ],
        user: '658142fc0a340c2640b7379c',
    },
    {
        name: 'Canon EOS R5',
        description:
            'A professional-grade mirrorless camera with outstanding image quality and 8K video recording.',
        price: 3499.99,
        ratings: 4.75,
        images: [
            {
                public_id: 'canon_eos_r5_image_1',
                url: 'https://example.com/canon_eos_r5_image_1.jpg',
            },
            {
                public_id: 'canon_eos_r5_image_2',
                url: 'https://example.com/canon_eos_r5_image_2.jpg',
            },
            {
                public_id: 'canon_eos_r5_image_3',
                url: 'https://example.com/canon_eos_r5_image_3.jpg',
            },
        ],
        category: 'Camera',
        stock: 12,
        numOfReviews: 9,
        reviews: [
            {
                user: '658142fc0a340c2640b7379d',
                name: 'Reviewer 9',
                rating: 4.25,
                comment: 'Impressive image quality and features!',
            },
            {
                user: '658142fc0a340c2640b7379e',
                name: 'Reviewer 10',
                rating: 4.5,
                comment: 'Perfect for professional photography.',
            },
        ],
        user: '658142fc0a340c2640b7379f',
    },
    {
        name: 'LG OLED C1 Series',
        description:
            'A stunning 4K OLED TV with vibrant colors, perfect for a cinematic viewing experience.',
        price: 1499.99,
        ratings: 4.5,
        images: [
            {
                public_id: 'lg_oled_c1_series_image_1',
                url: 'https://example.com/lg_oled_c1_series_image_1.jpg',
            },
            {
                public_id: 'lg_oled_c1_series_image_2',
                url: 'https://example.com/lg_oled_c1_series_image_2.jpg',
            },
            {
                public_id: 'lg_oled_c1_series_image_3',
                url: 'https://example.com/lg_oled_c1_series_image_3.jpg',
            },
        ],
        category: 'TV',
        stock: 18,
        numOfReviews: 8,
        reviews: [
            {
                user: '658142fc0a340c2640b737a0',
                name: 'Reviewer 11',
                rating: 4.0,
                comment: 'Incredible picture quality!',
            },
            {
                user: '658142fc0a340c2640b737a1',
                name: 'Reviewer 12',
                rating: 4.5,
                comment: 'A home theater essential.',
            },
        ],
        user: '658142fc0a340c2640b737a2',
    },
    {
        name: 'Nike Air Zoom Pegasus 38',
        description:
            'High-performance running shoes with responsive cushioning and a breathable design.',
        price: 129.99,
        ratings: 4.25,
        images: [
            {
                public_id: 'nike_air_zoom_pegasus_38_image_1',
                url: 'https://example.com/nike_air_zoom_pegasus_38_image_1.jpg',
            },
            {
                public_id: 'nike_air_zoom_pegasus_38_image_2',
                url: 'https://example.com/nike_air_zoom_pegasus_38_image_2.jpg',
            },
            {
                public_id: 'nike_air_zoom_pegasus_38_image_3',
                url: 'https://example.com/nike_air_zoom_pegasus_38_image_3.jpg',
            },
        ],
        category: 'Footwear',
        stock: 30,
        numOfReviews: 6,
        reviews: [
            {
                user: '658142fc0a340c2640b737a3',
                name: 'Reviewer 13',
                rating: 4.0,
                comment: 'Comfortable and great for running!',
            },
            {
                user: '658142fc0a340c2640b737a4',
                name: 'Reviewer 14',
                rating: 4.5,
                comment: 'Stylish and supportive.',
            },
        ],
        user: '658142fc0a340c2640b737a5',
    },
    {
        name: 'Apple iPad Air',
        description:
            'A lightweight and powerful tablet with a stunning Retina display.',
        price: 649.99,
        ratings: 4.5,
        images: [
            {
                public_id: 'apple_ipad_air_image_1',
                url: 'https://example.com/apple_ipad_air_image_1.jpg',
            },
            {
                public_id: 'apple_ipad_air_image_2',
                url: 'https://example.com/apple_ipad_air_image_2.jpg',
            },
            {
                public_id: 'apple_ipad_air_image_3',
                url: 'https://example.com/apple_ipad_air_image_3.jpg',
            },
        ],
        category: 'Tablet',
        stock: 22,
        numOfReviews: 7,
        reviews: [
            {
                user: '658142fc0a340c2640b737a6',
                name: 'Reviewer 15',
                rating: 4.25,
                comment: 'Sleek design and excellent performance!',
            },
            {
                user: '658142fc0a340c2640b737a7',
                name: 'Reviewer 16',
                rating: 4.5,
                comment: 'Perfect for productivity and entertainment.',
            },
        ],
        user: '658142fc0a340c2640b737a8',
    },
]

export const data = [
    {
        _id: '648d3b2837ce90a805a45b66',
        name: 'Apple iPhone 12',
        description:
            'Our most advanced dual‐camera system ever. An even brighter Oled display. A lightning‐fast chip that leaves the competition behind. A huge leap in battery life. SIM-free\r\nScreen Size: 6.1 inches\r\nRelease Date: September 2021\r\nBattery Capacity: 3,240 mAh\r\nBody Material: Aluminium, Glass',
        price: 597,
        ratings: 0,
        images: [
            {
                _id: '65c58ddd7c794556d04e6c71',
                public_id: 'products/s62fbsutp8mkoq6ply1g',
                url: 'https://www.pngmart.com/files/15/Apple-iPhone-11-PNG-Clipart.png',
            },
            {
                _id: '65c58ddd7c794556d04e6c72',
                public_id: 'products/s61fbsutp8mkoq6ply1g',
                url: 'https://www.pngmart.com/files/4/Asus-Laptop-Transparent-Background.png',
            },
        ],
        category: 'SmartPhones',
        stock: 9,
        numOfReviews: 1,
        user: '64720b70eaa340bd12f10e9c',
        createdAt: '2023-06-17T04:48:31.391Z',
        reviews: [],
        __v: 0,
    },
    {
        _id: '648d3b2837ce90a805a45b66',
        name: 'Apple iPhone 12',
        description:
            'Our most advanced dual‐camera system ever. An even brighter Oled display. A lightning‐fast chip that leaves the competition behind. A huge leap in battery life. SIM-free\r\nScreen Size: 6.1 inches\r\nRelease Date: September 2021\r\nBattery Capacity: 3,240 mAh\r\nBody Material: Aluminium, Glass',
        price: 597,
        ratings: 0,
        images: [
            {
                _id: '65c58ddd7c794556d04e6c71',
                public_id: 'products/s62fbsutp8mkoq6ply1g',
                url: 'https://www.pngmart.com/files/15/Apple-iPhone-11-PNG-Clipart.png',
            },
            {
                _id: '65c58ddd7c794556d04e6c72',
                public_id: 'products/s61fbsutp8mkoq6ply1g',
                url: 'https://www.pngmart.com/files/4/Asus-Laptop-Transparent-Background.png',
            },
        ],
        category: 'SmartPhones',
        stock: 9,
        numOfReviews: 1,
        user: '64720b70eaa340bd12f10e9c',
        createdAt: '2023-06-17T04:48:31.391Z',
        reviews: [],
        __v: 0,
    },
]

// Wrapper function for retrying an async thunk
export const retryThunk =
    (apiRequest, retries = 3, delay = 1000) =>
    async () => {
        let retryCount = 0
        let lastError = null

        while (retryCount < retries) {
            try {
                const response = await apiRequest()
                return response
            } catch (error) {
                lastError = error
                retryCount++
                await new Promise((resolve) => setTimeout(resolve, delay))
            }
        }

        throw lastError // If all retries fail, throw the last error
    }
