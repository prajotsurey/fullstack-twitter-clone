import { Link, useHistory } from 'react-router-dom';
const Landing = ({blogs, user, setUser}) => {
  const history = useHistory();
  console.log('landing')
  if(user){
    history.push('/blogs')
  }
  return(
    <div className="flex ">
      <div className="hidden md:flex w-full h-screen">
        landing content
      </div>
      <div className="w-full md:w-4/12 h-screen flex flex-col p-5 bg-gray-200 align-center">
        <div className="text-5xl mb-10 font-semibold">
          Happening now
        </div>
        <div className="text-2xl mb-4 font-semibold">
          Join Blogger today.
        </div>
        <Link className="h-12 p-3 bg-white text-center rounded-md mb-4" to="/login">Login</Link>
        <Link className="h-12 p-3 bg-white text-center rounded-md" to="/signup">Sign Up</Link>
      </div>
    </div>
  )
}

export default Landing;