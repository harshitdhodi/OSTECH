import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductGrid from '../../Clientside/components/Product/ProductGrid';
import Banner from '../../Clientside/components/Banner';
import Footer from '../../Clientside/components/home/Footer';

const ProductPage = () => {
  const [bannerData, setBannerData] = useState({ backgroundImage: '', title: '', imgTitle: '' });
  const [filterParams, setFilterParams] = useState(null);

  useEffect(() => {
    // Fetch banner data from the API
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('/api/banner/getBannersBySection?section=Products');
        const banners = response.data.banners;

        if (banners && banners.length > 0) {
          const banner = banners[0]; // Assume the first banner in the array is the relevant one
          setBannerData({
            backgroundImage: `/api/image/download/${banner.photo[0]}`, // Update path as per your setup
              title: banner.title,
            imgTitle: banner.imgTitle,
          });
        }
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  return (
    <div className="pt-[4%]">
      <Banner backgroundImage={bannerData.backgroundImage} title={bannerData.title} imgTitle={bannerData.imgTitle} />
      <ProductGrid filterParams={filterParams} setFilterParams={setFilterParams} />
      <Footer />
    </div>
  );
};

export default ProductPage;
