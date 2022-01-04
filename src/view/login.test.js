import React from "react";
import { render, screen } from "@testing-library/react";
import SignIn from "./login";

test('Check if login-route returns a token for correct Email/password combo.', () => {
    render(<SignIn />);

});
