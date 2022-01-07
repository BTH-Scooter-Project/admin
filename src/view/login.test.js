import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import { act, Simulate } from "react-dom/test-utils"
import SignIn from "./login";

const email = "test@test.se";
const password = "test123";

afterEach(cleanup);

describe("Sign in", () => {

    it('Test a correct email/password combo', async () => {
        const {getByTestId, getByLabelText} = render(<SignIn />);
        await act(async () => {
            fireEvent.change(getByLabelText("Email Address *"), {target: {value: email}});
            fireEvent.change(getByLabelText("Password *"), {target: {value: password}});
        })

        await act(async () => {
            expect(getByLabelText("Email Address *")).toHaveValue(email);
            expect(getByLabelText("Password *")).toHaveValue(password);
            Simulate.submit(getByTestId('submit'));
            expect(screen.getByTestId('error')).toHaveTextContent("");
        })
    })
})