import { useState } from 'react';
import { ReactComponent as Logo } from '../../icons/LogoBlue.svg';
import StyledLink from '../../components/StyledLink';
import { ReactComponent as LogoWhite } from '../../icons/LogoWhite.svg';

const Landing = () => {
  const [login, setLogin] = useState('signUp');
  // display image and then buttons in large screens
  // display buttons on top of image in smaller screens
  return(
    <div className="flex flex-col h-screen relative">
      <div className="flex flex-col flex-shrink flex-grow md:flex-row "> {/* flex row on medium and above screens column on smaller screens */}
        <div className="md:flex flex-grow bg-gray-200 md:h-full order-last md:order-first bg-landing-left bg-center"> {/* Displayed first in md and above screen sizes. Displayed last on smaller screens */}
          <div className="grid place-items-center h-full w-full">
            <LogoWhite className="fill-current text-white h-4/5 md:h-1/3"/>
          </div>
        </div>
        <div className="flex  md:w-5/12 mt-4 md:my-auto h-full justify-center items-center ">
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
      <div class="fixed inset-x-0 bottom-0 h-11 z-10 bg-white text-center leading-10 text-gray-500 text-sm">
        <a href="https://github.com/prajotsurey/fullstack-twitter-clone" target="_blank" rel="noreferrer">GitHub</a>
      </div>
    </div>
  )
}

export default Landing;