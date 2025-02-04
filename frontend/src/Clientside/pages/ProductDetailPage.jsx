import React, { useEffect, useCallback, memo, Suspense } from 'react'
import ProductGrid from '../../Clientside/components/Product/ProductGrid'
import banner from "../../assets/about1.jpg"
import Banner from '../../Clientside/components/Banner'
import ProductDetail from '../../Clientside/components/Product/ProductDetail'
import Footer from '../../Clientside/components/home/Footer'
import SkeletonLoader from '../components/Product/SkeletonLoader'

const MemoizedBanner = memo(Banner)
const MemoizedProductDetail = memo(ProductDetail)
const MemoizedFooter = memo(Footer)

const ProductDetailPage = () => {
  useEffect(() => {
    const scrollPosition = window.scrollY;
  
    return () => {
      window.scrollTo(0, scrollPosition); // Restore the scroll position
    };
  }, []);

  const handleProductUpdate = useCallback(() => {
    console.log("Product updated");
    // Add any product update logic here
  }, []);
  console.log("jsdf")

  return ( 
    <div className='pt-[5%]'>
      <MemoizedBanner backgroundImage={banner} title="Products" />
      <div className='max-w-[95rem] mx-auto'>
        {/* <MemoizedProductDetail onUpdate={handleProductUpdate} />  */}
        <Suspense fallback={<SkeletonLoader />}>
        <MemoizedProductDetail onUpdate={handleProductUpdate} /> 
        </Suspense>
      </div>
      <MemoizedFooter />
    </div>
  )
}

export default memo(ProductDetailPage)

