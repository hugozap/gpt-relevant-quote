# Relevant Quotes (GPT)
A sample app that returns relevant quotes for the input text.

Demo: https://relevant-quotes.netlify.app/

This project can be used as a starter template to quickly test and deploy GPT based apps.

# Build and deploy

This repository uses Netlify functions, they get automatically deployed whenever you push changes to your GitHub repository.

Steps to deploy

1. Fork this repository
2. Signup with Netlify and create a new Website that points to your repository
3. set the `OPENAI_API_KEY` environment variable
4. Deploy.

# Note about Lambda timeouts in Netlify

Sometimes OpenAI response takes more than 10 seconds which is the default timeout limit for Netlify.
Those requests will fail and an error will be displayed in the UI

If you are a Netlify PRO user you can send them an email to get your timeout value increased to 26 seconds.
