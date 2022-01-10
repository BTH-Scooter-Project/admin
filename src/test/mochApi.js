export const staffLogin = (data) => {
    const staff = {
        data: [
            {staffid: 1, firstname: "Emilio", lastname: "Löfgren", password: "test123", role: "admin", email: "test@test.se"},
            {staffid: 2, firstname: "test", lastname: "testsson", password: "test456", role: "admin", email: "test2@test.se"}
        ]
    }

    if (!data.email) {
        return "Wrong email"
    }

    if (!data.password) {
        return "Wrong password"
    }

    if (data.email === staff.data[0].email) {
        if (data.password === staff.data[0].password) {
            return {
                data: {
                    type: "success",
                    message: "Admin logged in",
                    user: "test@test.se",
                    id: 1,
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5zZSIsImlkIjoxLCJpYXQiOjE2NDE4MTE1NzgsImV4cCI6MTY0MTgxNTE3OH0.WuHDcYFy_mX6-KcRFpfKIJ5GqbpZr_nHo37ROTY5OGo"
                }
            }
        } else {
            return {
                errors: {
                    status: 401,
                    source: "/v1/auth/staff/login",
                    title: "Wrong password",
                    detail: "Password is incorrect."
                }
            }

        }
    } else {
        return {
            errors: {
                status: 401,
                source: "/v1/auth/staff/login",
                title: "User not found",
                detail: "User with provided email not found."
            }
        }
    }
}