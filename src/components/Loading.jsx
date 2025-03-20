import { Box } from '@mui/material'
import React from 'react'

const Loading = () => {
  return (
    [0, 1, 2, 3].map((_, i) => (
        <Box className="pulse" key={i} sx={{
            height:350,
            width:275
        }}>
        </Box>
    ))
  )
}

export default Loading