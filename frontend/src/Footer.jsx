function Footer() {
    return (
      <footer className="bg-gray-800 text-white p-4 mt-auto  ">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold">Makup Company</span> &copy;{" "}
              {new Date().getFullYear()}
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-300">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-gray-300">
                Terms of Service
              </a>
              <a href="#" className="hover:text-gray-300">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  export { Footer };