import React from 'react'
import {Helmet} from "react-helmet-async"

const Title = ({title="realtime",description="chat app texter"}) => {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description}/>
    </Helmet>
  )
}

export default Title