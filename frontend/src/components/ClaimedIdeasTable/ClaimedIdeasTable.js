import { TableCell, TableContainer, TableHead, TableRow , Table, TableBody, Paper, Button } from "@mui/material";
import React from "react";

const ClaimedIdeasTable = ({ ClaimedIdeas = [] }) => {
    return (
        <>
          <h1>Claimed Ideas</h1>
          <TableContainer overflow-y="scrollS" component={Paper} id="userProfTable">
              <Table options={{maxBodyHeight:100}}>
                  <TableHead>
                      <TableRow>
                          <TableCell>Description</TableCell>
                      </TableRow>
                  </TableHead>
                  <TableBody>
                      {ClaimedIdeas.map((idea) => (
                          <TableRow key={idea.idea}>
                              <TableCell>{idea.ideaText}</TableCell>
                          </TableRow>
                      ))}
                  </TableBody>
              </Table>
          </TableContainer>
        </>
    )
}

export default ClaimedIdeasTable;
