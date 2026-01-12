# How to Get Your Public Link (Deployment)

Since this application requires a Database, a Server, and a Client, it needs to be hosted on a cloud provider. I have configured the project to work seamlessly with **Render.com**, which offers a free tier.

## Step 1: Sign Up
1.  Go to [https://dashboard.render.com/](https://dashboard.render.com/)
2.  Sign up/Log in (easiest with your GitHub account).

## Step 2: Create a Blueprint
1.  Click **New +** button in the dashboard.
2.  Select **Blueprint**.
3.  Connect your GitHub repository: `Minenkodi/Portfolio`.
4.  Render will automatically detect the `render.yaml` file I created in this repo.
5.  Click **Apply**.

## Step 3: Wait & Launch
1.  Render will create 3 services:
    *   **expenses-db**: Your database.
    *   **fin-track-server**: Your backend API.
    *   **fin-track-client**: Your frontend website.
2.  Wait for the build to finish (it may take a few minutes).
3.  Once "Live", click on **fin-track-client**.
4.  The URL shown there (e.g., `https://fin-track-client.onrender.com`) is your **Public Link**.

You can share this link with anyone!
