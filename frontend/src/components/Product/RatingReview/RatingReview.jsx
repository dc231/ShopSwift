import { LinearProgress, Rating } from '@mui/material'

import './RatingReview.css'
const RatingReview = () => {

    return (
        <div className="rating-reviews">
            <div className="overall">
                <div className="left">
                    <span className='text'>Overall Rating</span>
                    <h2>4.0</h2>

                    <Rating value={3} readOnly={true} size='large' />

                    <p>based on all 23 reviews from customers</p>
                </div>

                <div className="right">
                    <div>
                        <label>Excellent</label>
                        <LinearProgress
                            sx={{ width: '25vw', padding: '.125rem' }} variant="determinate" value={80} />
                    </div>
                    <div>
                        <label>Good</label>
                        <LinearProgress
                            sx={{ width: '25vw', padding: '.125rem', }} variant="determinate" value={50} />
                    </div>
                    <div>
                        <label>Average</label>
                        <LinearProgress
                            sx={{ width: '25vw', padding: '.125rem', }} variant="determinate" value={30} />
                    </div>
                    <div>
                        <label>Below Average</label>
                        <LinearProgress
                            sx={{ width: '25vw', padding: '.125rem' }}
                            variant="determinate" value={30} />
                    </div>
                    <div>
                        <label>Poor</label>
                        <LinearProgress
                            sx={{ width: '25vw', padding: '.125rem', }} variant="determinate" value={10} />
                    </div>

                </div>
            </div>
            <div className="reviews">

                <div className='review'>
                    <div><img src="#" alt="Img" /></div>
                    <div>
                        <h4>John Doe</h4>
                        <Rating value={3} size='small' />
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, esse eius maiores reprehenderit dolorum facilis?</p>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default RatingReview