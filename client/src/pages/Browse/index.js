import React, { useEffect, useState } from 'react';
import { Field, Form, Formik} from 'formik';
import useAuthStorage from '../../hooks/useAuthStorage';
import userService from '../../services/userService';
import blogService from '../../services/postService';
import Post from '../../components/Post';
import postService from '../../services/postService';
import CenterHeader from '../../components/CenterHeader';
import SlideUpModal from '../../components/SlideUpModal';

const BlogList = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [posts, setPosts] = useState([])
  
  const [checked, setChecked] = React.useState(false);
  const [slideText, setSlideText] = React.useState('')

  const checker = (text) => {
    setChecked(true)
    setSlideText(text)
    setTimeout(() => {
      setChecked(false)
    },500)
  }

  const auth = useAuthStorage();
  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await blogService.getPosts();
      setPosts(posts)
    }

    fetchPosts();

  },[])

  useEffect(() => {
    const fetchUser = async () => {
      const user = JSON.parse(auth.getToken());
      if(user.id){
        const returnedUser = await userService.getUser(user.id);
        setCurrentUser(returnedUser);
      }
    }

    fetchUser();
  },[auth])

  return(
    <div className="flex flex-col">
      <CenterHeader>
        <div className="pl-4 text-xl font-semibold ">
          Home
        </div>
      </CenterHeader>
      <button onClick={() => {checker()}}> click</button>
      <div className="border-b">
        <div className="flex flex-row px-3 pt-1">
          <div className="mr-4">
            <div className="pt-2 w-12 h-12 rounded-full bg-green-100">

            </div>
          </div>
          <Formik
            initialValues={{ content: ''}}
            onSubmit={ async (values, actions) => {
              const response = await postService.createPost(values)
              setPosts([response,...posts])
            }}
            >
            {() => (
              <Form className="flex flex-col w-full">
                <Field className="w-full py-3 text-xl outline-none border-b " name="content" placeholder="What's hapenning?" as="textarea" />
                <div className="self-end mt-3 mb-2">
                  <button className="text-white font-bold text-sm py-2 px-3 rounded-full bg-green-400" type="submit">Tweet</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      {posts.map(post => <Post key={post.id} post={post} activateModal={checker}/>)}
      <SlideUpModal checked={checked} text={slideText}/>
    </div>
  );
}

export default BlogList;