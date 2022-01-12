const customerData = {
    data: [
        {
            "userid": 1,
            "firstname": "Test",
            "lastname": "User",
            "password": "$2a$10$A3nR1z9LsJnbvKhwuuuThe5S4dt6fDzM/VTv2FddEAKYl2cDMBRtS",
            "email": "test1@test.com",
            "cityid": 2,
            "payment": "card",
            "balance": 500,
            "unique_id": "1234567890"
        },
        {
            "userid": 2,
            "firstname": "Konrad",
            "lastname": "Magnusson",
            "password": "$2a$10$VtbmFuD6v5m3KHujohQZ8.xazF2JziA5uUSinttbKp53JH2EdKPzu",
            "email": "test2@test.se",
            "cityid": 1,
            "payment": "card",
            "balance": 100.5,
            "unique_id": null
        },
        {
            "userid": 3,
            "firstname": "Harald",
            "lastname": "Andersson",
            "password": "$2a$10$VtbmFuD6v5m3KHujohQZ8.xazF2JziA5uUSinttbKp53JH2EdKPzu",
            "email": "test@gmail.com",
            "cityid": 3,
            "payment": "prepaid",
            "balance": 99,
            "unique_id": null
        },
    ]
}

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

export const customer = (token) => {
    if (token) {
        return customerData;
    } else {
        return null;
    }
}

export const removeCustomer = (id) => {
    return customerData.data.filter(function(e){return e.userid !== id})
}

export const customerDetail = (id) => {
    return customerData.data.filter(function(e){return e.userid === id})
}