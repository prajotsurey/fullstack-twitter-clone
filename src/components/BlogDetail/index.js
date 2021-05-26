import React from 'react'
import { useHistory } from 'react-router';

const BlogDetail = ({user}) => {
  const history = useHistory()

  if(!user) {
    history.push('/login')
  }
  return(
    <div>
      blog detail
    </div>
  )
}

export default BlogDetail