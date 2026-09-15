export const invalidLoginData = [
    {
        scenario: "Invalid Username",
        username: "invalid_user",
        password: "secret_sauce",
        expectedError: "Epic sadface: Username and password do not match any user in this service"
    },
    {
        scenario: "Invalid Password",
        username: "standard_user",
        password: "wrong_password",
        expectedError: "Epic sadface: Username and password do not match any user in this service"
    },
    {
        scenario: "Empty Username",
        username: "",
        password: "secret_sauce",
        expectedError: "Epic sadface: Username is required"
    },
    {
        scenario: "Empty Password",
        username: "standard_user",
        password: "",
        expectedError: "Epic sadface: Password is required"
    },
    {
        scenario: "Locked User",
        username: "locked_out_user",
        password: "secret_sauce",
        expectedError: "Epic sadface: Sorry, this user has been locked out."
    }
];