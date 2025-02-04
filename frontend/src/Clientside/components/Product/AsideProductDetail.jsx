import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible'; // Assuming collapsible components
import { IoIosContact } from "react-icons/io";
import { productCategories } from './ProductList'; // Assuming productCategories is imported

const Aside = ({ productId }) => {
  return (
    <aside className="w-full md:w-[20%] bg-[#1290ca]/20 md:pr-8 lg:px-7 mb-8">
      <div className="md:sticky h-[100vh] md:top-24">
        <h2 className="text-2xl text-[#052852] font-bold mb-4 p-4">Related Products</h2>
        {productCategories.map((category) => (
          <Collapsible key={category.name}>
            <CollapsibleTrigger className="flex my-3 items-center justify-between w-full font-medium text-left text-gray-700 bg-white text-[16px] hover:bg-gray-100 rounded-md">
              {category.name}
              <ChevronDown className="h-4 w-4" />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2 space-y-2">
              {category.products.map((product) => (
                <Button
                  key={product.id}
                  variant="ghost"
                  className={`w-full justify-start text-[13px] hover:bg-white m-1 pl-4 ${product.id === parseInt(productId) ? 'bg-gray-100' : 'bg-white '}`}
                  asChild
                >
                  <Link to={`/products/${product.id}`}>{product.name}</Link>
                </Button>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
        <div className='w-[30vh] rounded mt-10 h-[30vh] border bg-[#052852]'>
          <div className='flex justify-center items-center mt-7'>
            <IoIosContact className='text-[6rem] text-white' />
          </div>
          <div className='flex flex-col mt-3 justify-center items-center'>
            <p className='text-xl font-bold text-white'>+91 99783 88388</p>
            <p className='text-xl font-bold text-white'>rajneesh@ostech.in</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
