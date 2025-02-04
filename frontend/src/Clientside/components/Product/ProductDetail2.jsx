import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Aside from './AsideProductDetail';  // Importing Aside component
import MainSection from './MainProductDetail';  // Importing MainSection component
import InquiryForm from './InquiryForm';

const ProductDetail = () => {
  const { productId } = useParams();
  const [showInquiryForm, setShowInquiryForm] = useState(false);

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Aside productId={productId} />
        <MainSection />
      </div>

      {showInquiryForm && <InquiryForm />}
    </div>
  );
};

export default ProductDetail;
