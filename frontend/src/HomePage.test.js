import React from "react";
import { render, fireEvent } from "@testing-library/react";
import HomePage from "./HomePage";
import UserContext from './auth/UserContext';
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
    const currentUser = { firstName: "Test" };
    render(
        <BrowserRouter>
            <UserContext.Provider value={currentUser}>
                <HomePage />
            </UserContext.Provider>
        </BrowserRouter>
    );
});

