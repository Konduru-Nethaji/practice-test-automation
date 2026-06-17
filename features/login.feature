Feature: user login

    Scenario: Successful login
        Given the user is on the login page
        When the user enters valid credentials "student", "Password123"
        And the user clicks on the Login button
        Then the user should see a welcome message

    Scenario: Failed Login
        Given the user is on the login page
        When the user enters invalid username "Student", "Password123"
        And the user clicks on the Login button
        Then the user should see an error message containing "Your username is invalid!"
    
    Scenario: Failed Login
        Given the user is on the login page
        When the user enters invalid password "student", "password123"
        And the user clicks on the Login button
        Then the user should see an error message containing "Your password is invalid!"