import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../../icons/Logo blue.svg';
import StyledLink from '../../components/StyledLink';

const Landing = () => {
  const [login, setLogin] = useState('signUp');
  // display image and then buttons in large screens
  // display buttons on top of image in smaller screens
  return(
    <div className="flex flex-col md:flex-row h-screen"> {/* flex row on medium and above screens column on smaller screens */}
      <div className="md:flex w-full flex-grow bg-gray-200 md:h-screen order-last md:order-first"> {/* Displayed first in md and above screen sizes. Displayed last on smaller screens */}
        Image 
      </div>
      <div className="flex flex-grow md:w-5/12 justify-center items-center ">
        <div className="max-w-xs md:max-w-none md:w-full flex flex-grow flex-col p-5 align-center">
          <div className="text-4xl md:text-5xl mb-10 font-semibold">
            <Logo className="h-8 mb-8"/>  {/* svg */}
          </div>
          <div className="text-5xl md:text-6xl mb-10 font-semibold">
            Happening now
          </div>
          { login === 'signUp'
            ?
            <>
            <div className="text-2xl mb-4 font-semibold">
              Join twitter today.
            </div>
            <div className="flex flex-col max-w-xs">
              <div className="flex my-6">
                <StyledLink to="/signup">Sign up with email</StyledLink>
              </div>
              <div>
                Already have an account?
                <span className="text-primary ml-1 cursor-pointer" onClick={ () => {setLogin('login')} }> 
                  Sign in
                </span>
              </div>
            </div>
            </>
            :
            <>
            <div className="text-2xl mb-4 font-semibold">
              Sign in to twitter
            </div>
            <div className="flex flex-col max-w-xs">
              <div className="flex my-6">
                <StyledLink to="/login">Sign in with email</StyledLink>
              </div>
              <div>
                Don't have an account?
                <span className="text-primary ml-1 cursor-pointer" onClick={ () => {setLogin('signUp')} }> 
                  Sign up
                </span>
              </div>
            </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Landing;