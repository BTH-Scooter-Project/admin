import React from "react";
import { render, fireEvent, cleanup, screen, waitFor, getByTestId } from "@testing-library/react";
import { act, Simulate } from "react-dom/test-utils"
import SignIn from "./login";

const email = "test@test.se";
const password = "test123";

afterEach(cleanup);

describe("Sign in", () => {
    let emailIn, passwordIn, errorMsg;
    it('Test a correct email/password combo', async () => {
        act(() => {
           render(<SignIn test={true}/>);
        });

        act(() => {
            emailIn = screen.getByLabelText("Email Address *");
            passwordIn = screen.getByLabelText("Password *");
            errorMsg = screen.getByTestId("error");
        })

        act(() => {
            fireEvent.change(emailIn, {target: { value: email}});
            fireEvent.change(passwordIn, {target: {value: password}});
        })
          
        Promise.resolve(fireEvent.click(screen.getByTestId('submit')));
        expect(errorMsg).toBeEmptyDOMElement();
    })
    it('Test a wrong email/password combo', () => {
        act(() => {
            render(<SignIn test={true}/>);
         });
    })
})
