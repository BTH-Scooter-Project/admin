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

const cityData = {
    "data": [
        {
            "cityid": -1,
            "name": "Okï¿½nd",
            "gps_left_lat": null,
            "gps_left_lon": null,
            "gps_right_lat": null,
            "gps_right_lon": null
        },
        {
            "cityid": 1,
            "name": "Sundsvall",
            "gps_left_lat": 62.381299,
            "gps_left_lon": 17.278061,
            "gps_right_lat": 62.395301,
            "gps_right_lon": 17.328186
        },
        {
            "cityid": 2,
            "name": "Stockholm",
            "gps_left_lat": 59.351495,
            "gps_left_lon": 18.023087,
            "gps_right_lat": 59.305341,
            "gps_right_lon": 18.168215
        },
        {
            "cityid": 3,
            "name": "Karlskrona",
            "gps_left_lat": 56.160608,
            "gps_left_lon": 15.564709,
            "gps_right_lat": 56.186171,
            "gps_right_lon": 15.631485
        }
    ]
}

const stationData = {
    "data": [
        {
            "stationid": -1,
            "type": "ingen station",
            "address": "ingen station",
            "gps_lat": null,
            "gps_lon": null,
            "bikes": []
        },
        {
            "stationid": 2,
            "type": "charge",
            "address": "GatuhÃ¶rn",
            "gps_lat": 500.5,
            "gps_lon": 600.6,
            "bikes": [
                {
                    "bikeid": 4,
                    "name": "cykel4",
                    "image": "blueBike.jpg",
                    "description": "En blï¿½ cykel utmï¿½rkt fï¿½r terrï¿½ng",
                    "max_speed": 15,
                    "battery_capacity": 8000,
                    "status": "vacant",
                    "battery_level": 7500,
                    "gps_lat": 56.180894,
                    "gps_lon": 15.591938,
                    "dest_lat": null,
                    "dest_lon": null,
                    "stationid": 2,
                    "cityid": 3
                },
                {
                    "bikeid": 6,
                    "name": "cykel6",
                    "image": "pinkBike.jpg",
                    "description": "En rosa cykel",
                    "max_speed": 11,
                    "battery_capacity": 9500,
                    "status": "vacant",
                    "battery_level": 2000,
                    "gps_lat": 56.163192,
                    "gps_lon": 15.58519,
                    "dest_lat": null,
                    "dest_lon": null,
                    "stationid": 2,
                    "cityid": 3
                },
                {
                    "bikeid": 7,
                    "name": "cykel7",
                    "image": "cykel7.jpg",
                    "description": "En rosa cykel",
                    "max_speed": 40,
                    "battery_capacity": 9500,
                    "status": "vacant",
                    "battery_level": 5000,
                    "gps_lat": 56.161173,
                    "gps_lon": 15.587636,
                    "dest_lat": 59.324783,
                    "dest_lon": 18.07307,
                    "stationid": 2,
                    "cityid": 3
                }
            ]
        },
        {
            "stationid": 3,
            "type": "charge",
            "address": "Centrum",
            "gps_lat": 100.1,
            "gps_lon": 100.1,
            "bikes": []
        }
    ]
}

const scooterData = {
    "data": [
        {
            "bikeid": 4,
            "name": "cykel4",
            "image": "blueBike.jpg",
            "description": "En blï¿½ cykel utmï¿½rkt fï¿½r terrï¿½ng",
            "max_speed": 15,
            "battery_capacity": 8000,
            "status": "vacant",
            "battery_level": 7500,
            "gps_lat": 56.180894,
            "gps_lon": 15.591938,
            "dest_lat": null,
            "dest_lon": null,
            "stationid": 2,
            "cityid": 3
        },
        {
            "bikeid": 6,
            "name": "cykel6",
            "image": "pinkBike.jpg",
            "description": "En rosa cykel",
            "max_speed": 11,
            "battery_capacity": 9500,
            "status": "vacant",
            "battery_level": 2000,
            "gps_lat": 56.163192,
            "gps_lon": 15.58519,
            "dest_lat": null,
            "dest_lon": null,
            "stationid": 2,
            "cityid": 3
        },
        {
            "bikeid": 7,
            "name": "cykel7",
            "image": "cykel7.jpg",
            "description": "En rosa cykel",
            "max_speed": 40,
            "battery_capacity": 9500,
            "status": "vacant",
            "battery_level": 5000,
            "gps_lat": 56.161173,
            "gps_lon": 15.587636,
            "dest_lat": 59.324783,
            "dest_lon": 18.07307,
            "stationid": 2,
            "cityid": 3
        }
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
        } 
        return {
            errors: {
                status: 401,
                source: "/v1/auth/staff/login",
                title: "Wrong password",
                detail: "Password is incorrect."
            }
        }
    }
    return {
        errors: {
            status: 401,
            source: "/v1/auth/staff/login",
            title: "User not found",
            detail: "User with provided email not found."
        }
    }
}

export const customer = (token) => {
    if (token) {
        return customerData;
    } 
    return null;
}

export const removeCustomer = (id) => {
    return customerData.data.filter(function(e){return e.userid !== id})
}

export const customerDetail = (id) => {
    return customerData.data.filter(function(e){return e.userid === id})
}

export const city = () => {
    return cityData;
}

export const station = () => {
    return stationData;
}

export const scooter = () => {
    return scooterData;
}