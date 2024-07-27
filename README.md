# Tag Quest Backend API

## Introduction

**Tag Quest** is a photo tagging app inspired by the classic game "Where's Waldo?". The backend API handles all the server-side logic, including storing character positions, validating user selections, tracking time, and recording scores. This README provides an overview of the backend setup and functionalities.

## Project Overview

The backend of Tag Quest is built using Node.js and Express.js. It communicates with a MongoDB database to manage game data and user scores. The API provides endpoints to validate character positions, track user times, and maintain a high scores leaderboard.

## Technologies Used

-  **Backend**: Node.js, Express.js
-  **Database**: MongoDB
-  **Environment Management**: dotenv

## Features

-  **Character Validation**: API endpoint to validate if the selected character is correctly tagged.
-  **Time Tracking**: Server-side time tracking to prevent score manipulation.
-  **High Scores**: Endpoint to record and retrieve high scores.
-  **Database Management**: MongoDB for storing game data and user scores.

## Endpoints

-  **POST /api/game/check-attempt**: Validate the character selection and checks winning status.
-  **POST /api/game/start**: Start the game and track the start time.
-  **GET /api/players?page=&pageSize=**: Retrieve the list of high scores by page.

Thank you for using Tag Quest!
