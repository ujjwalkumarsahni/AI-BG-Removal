import { assets } from '../assets/assets'

const Header = () => {
    return (
        <div className='flex flex-col-reverse sm:flex-row justify-between items-center gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>

            {/* left side */}
            <div>
                <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>Remove the <br /> <span className='bg-gradient-to-r from-violet-600 to-fuchsia-500 bg-clip-text text-transparent'>background</span> from<br />images for free.</h1>
                <p className='my-6 text-[15px] text-gray-500'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.<br /> Lorem Ipsum has been the industry's standard dummy text ever.</p>
                <div>
                    <input type='file' id='upload1' hidden/>
                    <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-500 m-auto hover:scale-105 transition-all duration-700' htmlFor="upload1">
                        <img width={20} src={assets.upload_btn_icon} alt="" />
                        <p className='text-white text-sm'>Upload your image</p>
                    </label>
                </div>
            </div>

            {/* right side */}
            <div className='w-full max-w-md'>
                <img src={assets.header_img} alt="" />
            </div>
        </div>
    )
}

export default Header
