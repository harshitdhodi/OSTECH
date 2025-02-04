import React from 'react';

function Banner({ backgroundImage, title = "Default Banner Title", imgTitle }) {
    return (
        <div className='relative w-full bg-gray-50'>
            {/* SVG Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 50m-40 0a40,40 0 1,0 80,0a40,40 0 1,0 -80,0' fill='none' stroke='%23333' stroke-width='1'/%3E%3C/svg%3E")`,
                    backgroundSize: '100px 100px',
                }}
            ></div>

            {/* Dynamic Banner Image */}
            <div
                className='banner-background'
                title={imgTitle || "Dynamic Banner"}
                aria-label="Dynamic Banner"
                role="img"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div className='flex justify-center items-center h-[50vh] sm:h-[40vh] mb-10 relative'>
                    <h1 className='font-bold text-white md:text-3xl text-3xl lg:text-5xl mt-16 sm:mt-0 z-10'>{title}</h1>
                    <div className='absolute inset-0 bg-black opacity-60 z-1'></div>
                </div>
            </div>
        </div>
    );
}

export default Banner;
