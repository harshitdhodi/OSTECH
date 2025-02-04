import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { Button } from './Button'; // Assuming this is your custom Button component
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from './Collapsible'; // Assuming you have these components
import Conveyor1  from "../../../assets/product01.jpg"
import Conveyor3 from "../../../assets/product3.jpg"


// Sample productCategories array
export const productCategories = [
    {
      name: 'Conveyors',
      products: [
        { id: 1, name: 'Belt Conveyor', description: 'The Belt Conveyor efficiently transports materials across various distances. Its durable design ensures smooth operation, reducing manual handling. Ideal for industries like manufacturing, logistics, and mining, it enhances productivity and safety. Customizable for different applications, it offers reliable performance, easy maintenance, and cost-effective material handling solutions.', images: [Conveyor1 , Conveyor3] },
        { id: 2, name: 'Roller Conveyor', description: 'Smooth transportation of goods ', images: [Conveyor3] },
        { id: 3, name: 'Modular Conveyor', description: 'Flexible and customizable conveyor system', images: [Conveyor1 , Conveyor3] },
      ]
    },
    {
      name: 'Customized Equipment Solution',
      products: [
        { id: 4, name: 'Custom Robotic Cell', description: 'Tailored automation system', images: [Conveyor1 , Conveyor3] },
        { id: 5, name: 'Automated Guided Vehicle', description: 'Intelligent material transport', images: [Conveyor1 , Conveyor3] },
      ]
    },
    {
      name: 'End of Line Solution',
      products: [
        { id: 6, name: 'Palletizer', description: 'Efficient palletizing system', images: [Conveyor1 , Conveyor3] },
        { id: 7, name: 'Case Packer', description: 'Automated packaging solution', images: [Conveyor1 , Conveyor3] },
      ]
    },
    {
      name: 'Robotics Arms for Pick and Place',
      products: [
        { id: 8, name: 'Pick and Place Robot', description: 'Precise and fast automation', images: [Conveyor1 , Conveyor3] },
        { id: 9, name: 'Collaborative Robot', description: 'Safe human-robot interaction', images: [Conveyor1 , Conveyor3] },
      ]
    },
    {
      name: 'Sparklite',
      products: [
        { id: 10, name: 'LED Work Light', description: 'Bright and energy-efficient lighting', images: [Conveyor1 , Conveyor3] },
        { id: 11, name: 'Portable Floodlight', description: 'High-intensity mobile lighting', images: [Conveyor1 , Conveyor3] },
      ]
    },
    {
      name: 'Special Purpose Machine',
      products: [
        { id: 12, name: 'Custom Inspection Machine', description: 'Specialized quality control equipment', images: [Conveyor1 , Conveyor3] },
        { id: 13, name: 'Automated Assembly Machine', description: 'High-speed product assembly', images: [Conveyor1 , Conveyor3] },
      ]
    },
  ]

const ProductList = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Product Categories</h1>

      {productCategories.map((category) => (
        <Collapsible key={category.name} className="mb-4">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md">
            {category.name}
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>

          <CollapsibleContent className="mt-2 space-y-2">
            {category.products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 bg-white shadow-sm rounded-md hover:bg-gray-50"
              >
                <div>
                  <h2 className="text-xl font-semibold">{product.name}</h2>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                <Button variant="ghost" asChild>
                  <Link to={`/products/${product.id}`}>View Details</Link>
                </Button>
              </div>
            ))}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default ProductList;
