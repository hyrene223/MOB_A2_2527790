# HyrenePortfolio — Test Log

**Student Name:** Nsabimana Irene  
**Registration Number:** 25/27790  
**Course:** SWE 3409 — Mobile Application Development  
**Assignment:** Assignment 2 — My Name Is Personal Portfolio App  
**Application:** HyrenePortfolio  
**Platform:** Android  
**Test Type:** Manual functional testing

## 1. Testing Objective

The objective of testing was to verify that HyrenePortfolio displays personal portfolio information correctly, supports profile editing and photograph selection, saves information locally, and remains usable offline.

## 2. Test Environment

- **Development framework:** React Native and Expo
- **Programming language:** TypeScript
- **Local storage:** AsyncStorage and application document storage
- **Device:** Android phone
- **Installation:** Standalone Android APK

## 3. Functional Test Cases

| Test ID | Test case | Expected result | Result |
|---|---|---|---|
| TC-01 | Launch the installed application | Application opens successfully | PASS |
| TC-02 | View personal identity information | Name, nickname, introduction, and education display | PASS |
| TC-03 | View portfolio projects | Both projects and their descriptions display | PASS |
| TC-04 | Edit profile information and save | Updated information is saved | PASS |
| TC-05 | Capture or select a profile photograph | Selected photograph displays in the profile | PASS |
| TC-06 | Close and reopen the application | Saved information and photograph remain available | PASS |
| TC-07 | Use core portfolio features offline | Saved portfolio information remains accessible without internet | PASS |
| TC-08 | Run the installed APK without Expo Go | Application operates independently of Expo Go | PASS |

## 4. Test Summary

**Total test cases:** 8  
**Passed:** 8  
**Failed:** 0  
**Overall result:** PASS

The application was installed and opened successfully on an Android phone. The tested profile, project display, editing, photograph handling, local persistence, offline access, and standalone installation features worked as expected.

## 5. Conclusion

Based on the manual tests performed, HyrenePortfolio met the functional checks listed in this test log. The application was verified on an Android phone, and the core portfolio features were confirmed to work as expected.

**Tested by:** Nsabimana Irene  
**Registration Number:** 25/27790
