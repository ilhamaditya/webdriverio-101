Feature: Login Feature

    @login
    Scenario: Login to OrangeHRM
        When I Visit the OrangeHRM login page
        And I enter username and password
        Then I verify dashboard URL
