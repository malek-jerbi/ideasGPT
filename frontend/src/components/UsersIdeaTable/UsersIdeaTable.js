import { TableCell, TableContainer, TableHead, TableRow, Table, TableBody, Paper, Button } from '@mui/material';
import React from 'react';
import ClaimButton from '../ClaimButton';

const UsersIdeaTable = ({ swipedIdeas = [] }) => {
  return (
    <>
      <h1>Liked Ideas</h1>
      <TableContainer overflow-y='scrollS' component={Paper} id='userProfTable'>
        <Table options={{ maxBodyHeight: 100 }}>
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Claim</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {swipedIdeas.map((idea) => (
              <TableRow key={idea.idea}>
                <TableCell>{idea.ideaText}</TableCell>
                {!idea.claimed && (<TableCell>
                  <ClaimButton ideaId={idea.idea} fetchIdea={false} />
                </TableCell>
                )
               }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );

};

export default UsersIdeaTable;
