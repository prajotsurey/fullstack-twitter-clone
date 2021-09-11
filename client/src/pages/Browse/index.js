import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import CenterHeader from '../../components/CenterHeader';
import Post from '../../components/Post';
import SlideUpModal from '../../components/SlideUpModal';
import { default as blogService, default as postService } from '../../services/postService';
import { ReactComponent as ProfileIcon } from '../../icons/ProfileIcon.svg';

const BlogList = () => {
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

  useEffect(() => {
    const fetchPosts = async () => {
      
      const posts = await blogService.getPosts();
      setPosts(posts)
    }

    fetchPosts();

  },[])

  return(
    <div className="flex flex-col">
      <CenterHeader>
        <div className="pl-4 text-xl font-semibold ">
          Home
        </div>
      </CenterHeader>
      <div className="border-b">
        <div className="flex flex-row px-3 pt-1">
          <div className="mr-4">
          <div className="flex flex-row items-center justify-center h-12 w-12 rounded-full bg-gray-300 text-gray-400 mt-2">
            <div className="h-9 w-9">
            <ProfileIcon />
            </div>
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
                  <button className="text-white font-bold text-sm py-2 px-3 rounded-full bg-primary" type="submit">Tweet</button>
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