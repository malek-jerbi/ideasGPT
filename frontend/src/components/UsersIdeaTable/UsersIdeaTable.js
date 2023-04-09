import { TableCell, TableContainer, TableHead, TableRow , Table, TableBody, Paper, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from 'axios';

const UsersIdeaTable = ({swipedIdeas}) => {
    const [ideasData, setIdeasData] = useState([]);

    useEffect(() => {
        
    }, []);

    const ideasArr=[{
        _id: "1",
        text: "Study group finder: Develop an app that helps students find and join study groups based on their courses, interests, and location."
    },
    {
        _id: "2",
        text: "Parking spot finder: Build an app that allows users to find, reserve, and pay for parking spots in crowded urban areas, leveraging data from various parking facilities."
    },
    {
        _id: "3",
        text: "Virtual reality travel experiences: Create immersive virtual reality experiences that allow users to explore popular travel destinations from the comfort of their homes."
    },
    {
        _id: "4",
        text: " A platform for online coding competitions, where developers can compete against each other to solve programming challenges and win rewards."

    }]; // this is an array of idea objects



    return (
        <><h1>Users's favorite</h1>
        <TableContainer overflow-y="scrollS" component={Paper} id="userProfTable">
            <Table options={{maxBodyHeight:100}}>
                <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Claim</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ideasArr.map((idea) => (
                        <TableRow key={idea._id}>
                            <TableCell>{idea.text}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="primary">
                                    Claim
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </>
    )
}

export default UsersIdeaTable;
