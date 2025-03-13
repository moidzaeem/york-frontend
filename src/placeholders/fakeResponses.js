export const managedAccountsResponse = {
    data: [
        {
            id: 1,
            account_name: "Ayyan Khan",
            role: "Guardian",
            host: "Pantheon",
            status: "active",
            date: "23 aug 2022"
        },
        {
            id: 2,
            account_name: "Zohaib Khan",
            role: "Guardian",
            host: "Pantheon",
            status: "active",
            date: "23 aug 2022"
        },
        {
            id: 3,
            account_name: "Jawad Khan",
            role: "Student",
            host: "University of Swat",
            status: "active",
            date: "01 mar 2024"
        },
        {
            id: 4,
            account_name: "Zeshan Ahmad",
            role: "Student",
            host: "University of Swat",
            status: "active",
            date: "01 dec 2023"
        }
    ],
    links: {
        first: "",
        last: "",
        prev: "",
        next: ""
    },
    meta: {
        current_page: 1,
        last_page: 4,
        path: "http://127.0.0.1:8000/api/managed-accounts",
        per_page: 10,
        from: 1,
        to: 4,
        total: 12
    }
};