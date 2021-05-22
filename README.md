# Lab8_Starter
Author: Derek Hwang and Michael Shao

## Test Results
- [SumTest Result](sumtest.png)
- [RouterTest Result](routertest.png)
- [Lab8Test Result](lab8test.png)


## Check your understanding q's (FILL OUT)
1. In your own words: Where would you fit your automated tests in your Bujo project development pipeline? (just write the letter)

A: Within a Github action that runs whenever code is pushed 

2. Would you use a unit test to test the “message” feature of a messaging application? Why or why not? For this question, assume the “message” feature allows a user to write and send a message to another user.

No, writing a "message" requires multiple pieces to work together. It would be testing the writing (text input), media input, the actual sending of the message, whether or not the servers / whatever backend actually recieved the message, whether or not the message is valid, whether or not the message was received, and other. It is too complicated for unit testing.

3. Would you use a unit test to test the “max message length” feature of a messaging application? Why or why not? For this question, assume the “max message length” feature prevents the user from typing more than 80 characters

Yes, this would simply involve a check on a text field (since it is a message length). There are no additional moving parts that need to have assumptions on whether or not they work.

4. What do you expect to happen if we run our puppeteer tests with the field “headless” set to true?

We'd expect our puppeteer tests to run without a browser UI, i.e. there will be no browser.

1. What would your beforeAll callback look like if you wanted to start from the settings page before every test case?

> beforeAll(async () => { \
&nbsp;&nbsp;&nbsp;&nbsp;await page.goto('http://127.0.0.1:5500'); \
&nbsp;&nbsp;&nbsp;&nbsp;await page.click("img"); \
&nbsp;&nbsp;&nbsp;&nbsp;await page.waitForTimeout(500); \
  });
