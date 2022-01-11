import React from "react";
import { render, fireEvent, cleanup, screen, waitFor, getByTestId } from "@testing-library/react";
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils"
import SignIn from "../view/login";
import { UserContent } from "../view/admin/pages/user";

const email = "test@test.se";
const password = "test123";

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
    it('Test a wrong email/password or empty combo', () => {
        act(() => {
            render(<SignIn test={true}/>);
        });

        act(() => {
            emailIn = screen.getByLabelText("Email Address *");
            passwordIn = screen.getByLabelText("Password *");
            errorMsg = screen.getByTestId("error");
        })

        act(() => {
            fireEvent.change(emailIn, {target: { value: "test"}});
            fireEvent.change(passwordIn, {target: {value: "wrong"}});
           
        })
       
        Promise.resolve(fireEvent.click(screen.getByTestId('submit')));
        expect(screen.getByTestId("error").innerHTML).toMatch("Wrong Email/Password combination!");
    })
})
 
describe("Display customers", () => {
    it('Check if customer table renders with data', async () => {
        act(() => {
            render(<UserContent test={true} noData={false} />);
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
        expect(screen.getByText("Konrad")).toBeInTheDocument();
        expect(screen.getAllByTestId('DeleteIcon'));
        expect(screen.getAllByTestId('VisibilityIcon'));
    })

    it('Check if table renders without data', async() => {
        act(() => {
            render(<UserContent test={true} noData={true} />);
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(8);
        expect(screen.getByText("No rows")).toBeInTheDocument();
    })
    it('Delete a user from the registry', async() => {
        act(() => {
            render(<UserContent test={true} noData={false} />);
        })
        
        expect(screen.getAllByTestId('DeleteIcon'));
        fireEvent.click(screen.getAllByTestId('DeleteIcon')[0]);
        expect(screen.getByText("Removed user")).toBeInTheDocument(); 
    })
    it('Move on to the details page', async () => {
        history.push = jest.fn();
        act(() => {
            render(<UserContent test={true} noData={false} />);
        })

        expect(screen.getAllByTestId('VisibilityIcon'));
        fireEvent.click(screen.getAllByTestId('VisibilityIcon')[0]);
        expect(screen.getByText("Details of user")).toBeInTheDocument();
    })
})
