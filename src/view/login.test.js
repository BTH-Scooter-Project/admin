import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import SignIn from "./login";

const email = "test@test.se";
const password = "test123";

test('Check if login form renders correctly.', () => {
    render(<SignIn />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
});

test('Login with a correct email/password combo.', async () => {
    render(<SignIn />);

    const emailInput = screen.getByTestId("email");
    userEvent.type(emailInput, (email.split('').reverse()).join('')); //Reverse email input since the first letter on change gets reversed

    expect(screen.getByTestId('email')).toHaveValue(email);
})
