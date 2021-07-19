import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from '../../components/Posts';
import { Field, Form, Formik, FormikProps } from 'formik';

const BlogList = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    async function fetchPosts() {
      let url = '/api/posts/';
      const result = await axios.get(url);
      setPosts(result.data);
    }

    fetchPosts();

  },[])

  return(
    <>
    <div className="pl-4 h-14 flex flex-row items-center border-b"> 
      <div className="text-xl font-semibold">
        Home
      </div>
    </div>
    <div className="border-b">
      <div className="flex flex-row px-3 pt-1">
        <div className="mr-4">
          <div className="pt-2 w-12 h-12 rounded-full bg-green-100">

          </div>
        </div>
        <Formik
          initialValues={{ tweet: ''}}
          onSubmit={(values, actions) => {
            console.log(values)
          }}
          >
          {() => (
            <Form className="flex flex-col w-full">
              <Field className="w-full py-3 text-xl outline-none border-b " name="tweet" placeholder="What's hapenning?" as="textarea" />
              <div className="self-end mt-3 mb-2">
                <button className="text-white font-bold text-sm py-2 px-3 rounded-full bg-green-400" type="submit">Tweet</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
    <div className="h-3 bg-gray-50 border-b">
    </div>
    <Posts posts={posts} />
    </>
  );
}

export default BlogList