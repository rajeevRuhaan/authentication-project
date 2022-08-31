# Authentication learning

## Outcome from this project.
I started this project to implement login, signup, authentication, private route and custom hook. 

The project was cloned from https://github.com/shaunwa/react-auth-starter 

The frontend is in React and backend is in Node and Express.

what I have learned?
1. Create private route component which only allowed login user to view private page. this page check the user is true then direct to authorised page. Non authorised user is redirected to login page.
2. I also lerned how useUser() and useToken() custome hook to implement set token to localstorage and encode token to get user information from token.
3. JWT TOKEN: it is digital signed token. it is useful for authorization. The application use access token to access a protected resources.

*signed token contain information and is exposed to suer or other parties. The information are unable to change it. This means we should not put secret information within the Token*

4. Verify emails, reset passwords
5. How to incorporate OAuth
6. How to use third party authentication providers (AWS Cognito)
