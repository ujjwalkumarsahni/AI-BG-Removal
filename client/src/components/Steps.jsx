import React from 'react'
import { assets } from '../assets/assets'

const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
      <h1>Steps to remove background<br /> image in seconds</h1>
      <div>
        <div>
            <img src={assets.upload_icon} alt="" />
            <div>
                <p>Upload image</p>
                <p>This is a demo text, will replace it later.<br /> This is a demo..</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Steps
