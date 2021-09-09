import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import userService from '../../services/userService';
import Post from '../../components/Post';
import SwitchButton from '../../components/SwitchButton';
import CenterHeader from '../../components/CenterHeader';
import SlideUpModal from '../../components/SlideUpModal';

const Profile = () => {
  const [postsToShow, setPostsToShow] = useState([]);
  const [currentSwitch, setCurrentSwitch] = useState('1');

  const [user, setUser] = useState(null);
  const { id } = useParams();

  const [checked, setChecked] = React.useState(false);
  const [slideText, setSlideText] = React.useState('')

  const checker = (text) => {
    setChecked(true)
    setSlideText(text)
    setTimeout(() => {
      setChecked(false)
    },500)
  }

  const changePostsToShow = (selctor) => {
    if(selctor === "likes") {
      setPostsToShow(user.likedPosts)
    } else if(selctor === "tweets") {
      setPostsToShow(user.posts)
    }
  }


  useEffect(() => {
    const fetchUser = async () => {
      const user = await userService.getUser()
      setUser(user);
      setPostsToShow(user.posts)
    }

    fetchUser();
  },[id])

  
  if(user){
    return(
      <div className="flex flex-col">
        <CenterHeader>
        <div className="pl-4">
        </div>
        <Link to="/">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          </Link>
          <div className="flex flex-col ml-7">
            <div className="text-xl font-semibold">
              {user.username}
            </div>
            <div className="text-xs text-gray-500">
              {user.posts.length} tweets
            </div>
          </div>
        </CenterHeader>
        <div className="">
          <div className="w-full h-coverPhotoHeight bg-gray-100">
          </div>
          <div className="p-3 w-full flex flex-col">
            <div className="flex flex-row justify-between items-end">
              <div className="h-profilePicHeight w-profilePicWidth border-4 border-white -mt-20 rounded-full bg-green-200">
              </div>
              <div className="mb-6">
                <Link to="/" className="p-3 bg-white text-center rounded-full border mb-4 text-green-400 border-2 text-sm border-green-200 font-bold ">
                  Edit profile
                </Link>
              </div>
            </div>
            <div className="text-2xl font-semibold">
              {user.username}
            </div>
            <div className="text-sm text-gray-500">
              @something
            </div>
            <div className="text-sm my-2">
              bio
            </div>
            <div className="text-sm mb-2 text-gray-500">
              joined date
            </div>
            <div className="text-sm text-gray-500">
              <span className="text-black font-bold">32</span> following
              <span className="ml-4 text-black font-bold">23</span> followers
            </div>
          </div>

        </div>
        <div className="flex flex-row h-14 border-b">
          <SwitchButton name={'1'} currentSwitch={currentSwitch} onClick={ () => {changePostsToShow('tweets'); setCurrentSwitch('1')} }>
            Tweets
          </SwitchButton>
          <SwitchButton name={'2'} currentSwitch={currentSwitch} onClick={ () => {changePostsToShow('replies'); setCurrentSwitch('2')} }>
            Tweets and Replies
          </SwitchButton>
          <SwitchButton name={'3'} currentSwitch={currentSwitch} onClick={ () => {changePostsToShow('tweets'); setCurrentSwitch('3')} }>
            Media
          </SwitchButton>
          <SwitchButton name={'4'} currentSwitch={currentSwitch} onClick={ () => {changePostsToShow('likes'); setCurrentSwitch('4')} }>
            Likes
          </SwitchButton>
        </div>
        <div className="flex flex-col">
          {
            postsToShow.map(post => <Post key={post.id} post={post} user={user} activateModal={checker}/>)
          }
          <SlideUpModal checked={checked} text={slideText}/>

      </div>
      </div>
    )
  }

  return(
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
      <Link to="/">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
      </Link>
    </div>
  )
}

export default Profile;