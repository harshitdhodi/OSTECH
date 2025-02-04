import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../../assets/Ostech.svg";
import logo2 from "../../assets/halfLogo.png";
import { Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const location = useLocation();

  // Fetch menu items from API
  useEffect(() => {
    axios.get('/api/menulisting/getAllMenulisting')
      .then((response) => {
        setMenuItems(response.data.menuListings);
      })
      .catch((error) => {
        console.error('Error fetching menu items:', error);
      });

    const handleScroll = () => {
      const scrollPercent = (window.scrollY / window.innerHeight) * 100;
      setIsFixed(scrollPercent >= 20); // Fixed after 20% scroll
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/' || location.pathname === '/home';

  const navClasses = `w-full transition-all duration-300 ${isFixed ? 'fixed top-0 shadow-lg bg-white' : isHome ? 'absolute bg-transparent' : 'absolute bg-white'} z-50`;

  const linkClasses = `transition-colors duration-300 font-medium ${isFixed || !isHome ? 'text-black hover:text-gray-600' : 'sm:text-white hover:text-gray-200'}`;

  const activeLinkClasses = 'text-blue-400'; // Add blue color for active link

  const buttonClasses = `transition-colors duration-300 px-6 py-2 rounded-md ${isFixed || !isHome ? 'bg-[#1290ca] text-white hover:bg-[#0b2b59]' : 'bg-white text-black hover:bg-gray-100'}`;

  // Function to close the menu when a link is clicked
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-8xl md:ml-4 mx-auto md:p-1 px-2 py-1 sm:p-5">
          <div className="flex justify-between items-center lg:gap-28 xl:justify-between md:justify-center w-full h-16 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/home" className="flex items-center">
              {isHome && isFixed ? (
                <img 
                  src={logo} 
                  alt="Logo" 
                  width="auto"
                  height="auto"
                  className="h-12 sm:h-14 lg:h-16 md:hidden block xl:block transition-all" 
                  style={{ position: 'relative', zIndex: 10 }} 
                />
              ) : isHome ? ( 
                <img 
                  src={logo2} 
                  alt="Logo2" 
                  className="h-12 sm:h-14 lg:h-16 sm:mb-0 ml-5 md:hidden block xl:block transition-all" 
                  style={{ position: 'relative', zIndex: 10 }} 
                />
              ) : (
                <img 
                  src={logo} 
                  alt="Logo" 
                  className="h-12 sm:h-14 lg:h-16 md:hidden xl:block transition-all" 
                  style={{ position: 'relative', zIndex: 10 }} 
                />
              )}
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center mr-5 space-x-6">
              {menuItems.map((item) => {
                const isActive = location.pathname === `/${item.pagename.toLowerCase().replace(/\s+/g, '-')}`;
                return (
                  <Link
                    key={item._id}
                    to={`/${item.pagename.toLowerCase().replace(/\s+/g, '-')}`}
                    className={`${linkClasses} ${isActive ? activeLinkClasses : ''} lg:text-[15px] md:text-[13px]  xl:text-lg`}
                  >
                    {item.pagename}
                  </Link>
                );
              })}
              <Link to="/contact-us" className={buttonClasses}>Inquiry</Link>
              {/* <button
                className={buttonClasses}
                onClick={() => window.open('/api/image/view/ostech.pdf', '_blank')}
              >
                Catalogue
              </button> */}
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`focus:outline-none ${isFixed ? 'text-black' : 'text-black'}`}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className={`h-6 w-6 ${isFixed ? 'text-black' : isHome ? 'text-white' : 'text-black'}`} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-white flex flex-col justify-center z-40">
              {/* Close Icon at the top right corner */}
              <button
                onClick={() => setIsMenuOpen(false)}
                className="absolute top-4 right-4 text-black focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>

              <div className="w-full h-full flex flex-col items-center mt-20 space-y-4">
                {menuItems.map((item) => {
                  const isActive = location.pathname === `/${item.pagename.toLowerCase().replace(/\s+/g, '-')}`;
                  return (
                    <Link
                      key={item._id}
                      to={`/${item.pagename.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`${linkClasses} ${isActive ? activeLinkClasses : ''} `}
                      onClick={closeMenu} // Close menu on link click
                    >
                      {item.pagename}
                    </Link>
                  );
                })}
                <Link to="/contact-us" className={buttonClasses} onClick={closeMenu}>
                  <p className='font-medium'>Inquiry</p>
                </Link>
                <button
                  className={buttonClasses}
                  onClick={() => {
                    window.open('/api/image/view/ostech.pdf', '_blank');
                    closeMenu();
                  }}
                >
                  <p className='font-medium'>Catalogue</p>
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
