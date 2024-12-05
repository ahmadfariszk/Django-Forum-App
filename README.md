# Django Forum App
## To access the deployed site, follow these steps:
These steps are mandatory to get a full experience of the web app -- otherwise API calls would be blocked.

1. Open your favourite browser (preferably desktop, I did not optimise it for mobile)

2. Go to the backend site `https://13.211.124.176/`. You might see a "Your connection is not private/secure" or something along those lines, depending on your browser. This is caused by the SSL certificate being self-signed.

3. Click `Advanced` and proceed to the website anyway, to bypass the warning. For example in Chrome: click on `ADVANCED` then `Proceed to view site`

    You should see a "Not Found" if it works. This allows the browser to make API calls to the backend without being blocked


4. Go to the frontend site `https://ahmadfariszk.github.io/Django-Forum-App/`


### Explanation

This workaround have to be used because the frontend is deployed on github-pages, which is using https by default, as such the backend its accessing must also be an https end point.

However, free SSL certificates are not given to bare IP adresses, as such, I have to sign the SSL certificate myself which causes the warning in step no. 2 to appear.

## Tech Stack
Notable libraries/technologies used:
#### Backend:
- Python3
- Django
- Django Ninja (Django's REST API endpoint library)
- JWT Authentication
- Amazon EC2 running Ubuntu (for hosting the backend)
- Nginx (on EC2's enviroment)
- Python Virtual Enviroment
#### Frontend:
- ReactJS
- Remix (for frontend, a ReactJS meta-framework)
- TailwindCSS
- shadcn/ui (component library)
- Github pages with CI (for hosting the frontend)


## Dev Enviroment
These steps are to set up dev environment on your local.
### Backend:

1. From the root of the directory, `cd` into the `/forum-project/` directory.
2. Create a python virtual enviroment. Example: `python -m venv venv`
3. Activate the virtual enviroment

    Windows: `venv\Scripts\activate`

    Linux: `source venv/bin/activate`

4. Install dependecies `pip install -r requirements.txt`
5. Run server `python manage.py runserver`

### Frontend:
1. From the root of the directory, `cd` into `/frontend/`

2. Install dependecies `npm install`

3. Run development server `npm run dev`

## Issues and disabled features
Other than the SSL certificate issue mentioned above, there are some TODO or issues to be looked into:
- Remix enviroment variables are broken, as such unfortunately the api endpoint is hardcoded.

    TODO: Find out what's wrong with the enviroment variables. Might have to use older Remix version

- Pagination is implemented for the `GET` endpoint responses, but commented out as the frontend is not equipped to handle it yet. This should be fine (hopefully lol) as the db is still really small and barely populated.

    TODO: Add handling for pagination in frontend.

- TODO: Remove hashed password from the response


