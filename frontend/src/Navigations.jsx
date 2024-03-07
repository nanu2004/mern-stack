// this is temporory data inside here/tempo design

function Navigations() {
    return (
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <span className="font-bold text-lg">Your Logo</span>
            </div>
            <div className="hidden md:flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                Home
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Shop
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                About Us
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                Contact
              </a>
            </div>
            <div className="md:hidden">
              {/* Add your mobile menu icon here */}
              <button className="text-white">
                {/* Example: Hamburger icon */}
                &#9776;
              </button>
            </div>
          </div>
        </div>
      </nav>
    );
  }
  
  export default Navigations;