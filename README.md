# HyrenePortfolio — Personal Portfolio App

**Student Name:** Nsabimana Irene  
**Registration Number:** 25/27790  
**Institution:** INES-Ruhengeri  
**Programme:** Software Engineering  
**Course:** SWE 3409 — Mobile Application Development  
**Assignment:** Assignment 2 — My Name Is Personal Portfolio App

## 1. Project Overview

HyrenePortfolio is a personal portfolio mobile application developed using React Native, Expo, and TypeScript. It allows the user to present their personal information, education, skills, profile photograph, and software development projects in one place.

The application is designed for Android and supports offline use. Portfolio information and the selected profile photograph are stored locally on the device so that the information remains available after the application is closed and reopened.

## 2. Main Features

- **Personal profile:** Displays the student's name, nickname, and introduction.
- **Education:** Presents educational background.
- **Skills management:** Allows skills to be added, edited, and removed.
- **Profile photograph:** Supports taking a photograph with the camera or selecting one from the gallery.
- **Local persistence:** Saves portfolio information and the profile photograph on the device.
- **Project portfolio:** Displays two software development projects with descriptions and technologies used.
- **Input validation:** Checks required information before saving.
- **Offline support:** Core portfolio features work without an internet connection after installation.

## 3. Projects Included

### Project 1: Musanze Safe Market

A mobile application project designed to support market inspections and record management.

**Technologies:** React Native, Expo, TypeScript.

**Main functions include:**
- Recording vendor and stall information.
- Capturing inspection evidence photographs.
- Recording inspection details and risk information.
- Accessing saved inspection records.

### Project 2: School Management System

A desktop application project designed to support school administration and student record management.

**Technologies:** Java, Java Swing, JDBC, MySQL.

**Main functions include:**
- User login and registration.
- Student record management.
- Recording marks and calculating grades.
- Retrieving student information and generating reports.

## 4. Technologies Used

- React Native
- Expo
- TypeScript
- AsyncStorage for local portfolio data
- Expo Image Picker for camera and gallery access
- Expo File System for profile photograph storage
- Git and GitHub for version control and source code hosting
- Expo Application Services (EAS) for Android APK builds

## 5. Installation

### Option A: Install the Android APK

Download the Android APK from the build page:

[HyrenePortfolio Android APK build](https://expo.dev/accounts/hyrene/projects/hyreneportfolio/builds/2536a4d3-17c6-4d66-84fc-ea82b164072b)

Open the build page and download the APK if it is available. Transfer it to your Android device if necessary, open the file, and follow the device's installation prompts.

### Option B: Run the source code

**Requirements:**
- Node.js
- npm
- Git
- An Android device with Expo Go for development, or an Android emulator

Clone the repository:

```bash
git clone https://github.com/hyrene223/MOB_A2_2527790.git
```

Open the project directory:

```bash
cd MOB_A2_2527790
```

Install dependencies:

```bash
npm install
```

Start the Expo development server:

```bash
npx expo start
```

Follow the Expo instructions to run the application on a compatible device or emulator.

## 6. Offline Functionality and Data Storage

The application stores portfolio information locally using AsyncStorage. The selected profile photograph is copied into the application's document directory so it can be accessed later.

Core portfolio viewing, editing, and saved-data retrieval are designed to work offline. An internet connection may be required for downloading the APK or installing dependencies during development.

## 7. Testing

The application was installed and opened successfully on an Android phone. The following checks were performed:

- Personal identity information displays correctly.
- Both portfolio projects are displayed.
- Profile information can be edited and saved.
- A profile photograph can be captured or selected from the gallery.
- Saved information and the profile photograph remain available after reopening the app.
- Core application features work offline.
- The installed APK runs independently of Expo Go.

## 8. Repository

**GitHub:** https://github.com/hyrene223/MOB_A2_2527790

The repository contains the application's source code, Expo configuration, TypeScript files, and dependency lockfile.

## 9. Author

**Nsabimana Irene**  
Registration Number: **25/27790**  
Software Engineering  
INES-Ruhengeri

*Developed as part of the SWE 3409 Mobile Application Development assignment.*
