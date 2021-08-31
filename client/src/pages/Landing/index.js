import { Link } from 'react-router-dom';

const Landing = () => {
  console.log('here');
  return(
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:flex w-full flex-grow bg-gray-200 md:h-screen order-last md:order-first">
        Image 
      </div>
      <div className="flex flex-grow md:w-5/12 justify-center items-center ">
        <div className="max-w-xs md:max-w-none md:w-full flex flex-grow flex-col p-5 align-center">
          <div className="text-4xl md:text-5xl mb-10 font-semibold">
            Logo
          </div>
          <div className="text-5xl md:text-6xl mb-10 font-semibold">
            Happening now
          </div>
          <div className="text-2xl mb-4 font-semibold">
            Join Blogger today.
          </div>
          <div className="flex flex-col max-w-xs">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing;