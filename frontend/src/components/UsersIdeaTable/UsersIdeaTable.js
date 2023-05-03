import {
  TableCell,
  TableContainer,
  TableRow,
  Table,
  TableBody,
  Paper,
} from '@mui/material'
import React from 'react'

const UsersIdeaTable = ({ swipedIdeas = [] }) => {
  return (
    <>
      <br></br>
      <br></br>
      <h1 id='liked-title'>Liked Ideas</h1>
      <TableContainer component={Paper} id='userProfTable'>
        <Table options={{ maxBodyHeight: 100 }}>
          <TableBody>
            {swipedIdeas.map((idea) => (
              <TableRow key={idea.idea._id}>
                <TableCell>{idea.idea.text}</TableCell>
                <TableCell>{idea.idea.likes} Likes</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default UsersIdeaTable
