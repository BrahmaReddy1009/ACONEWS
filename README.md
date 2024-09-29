Getting Started with Create React App
This project was bootstrapped with Create React App.

Available Scripts
In the project directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in your browser. The page will reload when you make changes, and you may also see any lint errors in the console.activate

make sure backend python server is running in command promt

.\venv\Scripts\activate to run create virtual enviroment in backend folder
python app.py to run server in another termianl

npm test
Launches the test runner in interactive watch mode.
For more information, see the section about running tests.

npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified, and the filenames include hashes. Your app is ready to be deployed!

See the section about deployment for more details.

npm run eject
Note: This is a one-way operation. Once you eject, you can't go back!

If you aren't satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project and copy all the configuration files and transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project for full control.

You don’t have to use eject. The curated feature set is suitable for small to medium deployments, and you shouldn't feel obligated to use this feature unless you need to customize your setup.

Learn More
You can learn more in the Create React App documentation.

To learn React, check out the React documentation.

Code Splitting
This section has moved to Code Splitting.

Analyzing the Bundle Size
This section has moved to Analyzing the Bundle Size.

Making a Progressive Web App
This section has moved to Making a Progressive Web App.

Advanced Configuration
This section has moved to Advanced Configuration.

Deployment
This section has moved to Deployment.

Troubleshooting
For help with troubleshooting, see this section.
Hosting Your Frontend on Firebase
Overview
This project includes a frontend built with React and styled using Tailwind CSS. The frontend is hosted on Firebase, while the backend can be hosted separately (e.g., on Heroku or another cloud service).

Hosting the Frontend on Firebase
Step 1: Install Firebase CLI
First, make sure you have the Firebase CLI installed. If you haven't installed it yet, run:

bash
Copy code
npm install -g firebase-tools
Step 2: Login to Firebase
Log in to your Firebase account:

bash
Copy code
firebase login
Step 3: Initialize Firebase in Your Project
Navigate to your project directory and run:

bash
Copy code
firebase init
Select the following options:

Hosting
Choose your existing Firebase project or create a new one.
Set your public directory to build (assuming you're using Create React App).
Configure it as a single-page app by answering "Yes" to the prompt.
Step 4: Build Your Project
Before deploying, build your React app:

bash
Copy code
npm run build
Step 5: Deploy to Firebase
Now you can deploy your app:

bash
Copy code
firebase deploy
After deployment, Firebase will provide a URL where your app is hosted.

Troubleshooting Backend Hosting
If you're encountering issues hosting the backend, consider the following tips:

Check Server Configuration: Ensure your server (e.g., Express) is set up correctly and listening on the right port.
Environment Variables: Make sure your API keys and environment variables are configured correctly for the hosting environment.
CORS Issues: If your frontend can't access the backend, check your CORS settings. You may need to enable CORS on your backend server.
Deployment Logs: Review logs from your hosting provider (e.g., Heroku) to diagnose any deployment issues.
API Endpoint: Verify that the frontend is pointing to the correct backend URL in your API calls.
