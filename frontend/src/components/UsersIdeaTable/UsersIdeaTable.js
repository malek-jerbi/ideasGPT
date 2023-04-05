import { TableCell, TableContainer, TableHead, TableRow , Table, TableBody, Paper} from "@mui/material";
import React from "react";


const UsersIdeaTable = ({likedIdeas}) => {
    console.log(likedIdeas);


    return (

        <TableContainer overflow-y="scrollS" component={Paper} sx={{maxHeight: '200px'}}>
        <Table options={{maxBodyHeight:100}}>
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Claim</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {likedIdeas.map((ideas) => (
                
                <TableRow key={ideas._id}>
                    <TableCell>{ideas.description}</TableCell>
                </TableRow>

            ))}
            </TableBody>
            <TableBody>

            </TableBody>

        </Table>
    </TableContainer>
    )

    



}

export default UsersIdeaTable;