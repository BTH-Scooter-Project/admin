import React from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { render, fireEvent, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils"
import SignIn from "../view/login";
import { UserContent } from "../view/admin/pages/user";
import { UserDetailContent } from "../view/admin/pages/userDetail";
import { CityContent } from "../view/admin/pages/city";
import { StationContent } from "../view/admin/pages/station";
import { ScooterContent } from "../view/admin/pages/scooter";

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
        act(() => {
            render(<UserContent test={true} noData={false} />);
        })

        expect(screen.getAllByTestId('VisibilityIcon'));
        fireEvent.click(screen.getAllByTestId('VisibilityIcon')[0]);
        expect(screen.getByText("Details of user")).toBeInTheDocument();
    })
})

describe("Customer details", () => {
    let textbox;
    it("Check if page is rendered correctly", async () => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <UserDetailContent test={true} testid={1} />
                    </Route>
                </Router>
            )
        })
        expect(screen.getByText("1"));
        expect(screen.getByText("Test"));
        expect(screen.getByText("User"));
        expect(screen.getAllByText("2"));
        expect(screen.getByText("card"));
        expect(screen.getByText("500"));
        expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
    })

    it("Test submit changes to user's data", async () => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <UserDetailContent test={true} testid={1} />
                    </Route>
                </Router>
            )
        })
        
        Promise.resolve(fireEvent.click(screen.getByTestId("EditIcon")))

        act(() => {
            textbox = screen.getAllByRole('textbox');
        })
        
        expect(textbox).toHaveLength(5);

        act(() => {
            fireEvent.change(textbox[0], {target: { value: "Test"}});
            fireEvent.change(textbox[1], {target: {value: "Testsson"}});
            fireEvent.change(textbox[2], {target: {value: "1"}});
            fireEvent.change(textbox[3], {target: {value: "prepaid"}});
            fireEvent.change(textbox[4], {target: {value: "420"}});
        })

        await Promise.resolve(fireEvent.click(screen.getByText("Submit")));
        expect(screen.getByText("Data submited")).toBeInTheDocument();
    })
})

describe("Get scooters", () => {
    it("Loading cities", async () => {
        act(() => {
            render(<CityContent test={true} />);
        })

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByTestId("thead").children).toHaveLength(3);
        expect(screen.getByText("Sundsvall")).toBeInTheDocument();
        expect(screen.getAllByTestId("VisibilityIcon")[0]);

        await Promise.resolve(fireEvent.click(screen.getAllByTestId("VisibilityIcon")[0]));
        expect(screen.getByText("Redirecting...")).toBeInTheDocument();
    })

    it("Loading stations", async () => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <StationContent test={true} />
                    </Route>
                </Router>
            )
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(5);
        expect(screen.getByText("Centrum")).toBeInTheDocument();
        expect(screen.getAllByTestId('VisibilityIcon'));
    })

    it('Check if table renders without data', async() => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <StationContent test={true} noData={true} />
                    </Route>
                </Router>
            )
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(5);
        expect(screen.getByText("No rows")).toBeInTheDocument();
    })

    it("Loading scooters", async () => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <ScooterContent test={true} />
                    </Route>
                </Router>
            )
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(7);
        expect(screen.getAllByText("En rosa cykel"));
    })

    it('Check if table renders without data', async() => {
        act(() => {
            render(
                <Router>
                    <Route>
                        <ScooterContent test={true} noData={true} />
                    </Route>
                </Router>
            )
        })

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getAllByRole('columnheader')).toHaveLength(7);
        expect(screen.getByText("No rows")).toBeInTheDocument();
    })
})