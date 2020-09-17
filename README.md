# React-calendar


## To run

1. ```npm install```
2. ```npm start```

## To run tests

```npm test```


#
### What was implemented:


##### Mandatory Features
- [x] Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also,
include a city.
- [x] Display reminders on the calendar view in the correct time order.
- [x] Allow the user to select color when creating a reminder and display it appropriately.
- [x] Ability to edit reminders – including changing text, city, day, time and color.
- [x] Add a weather service call from a free API such as Open Weather Map, and get the
weather forecast (ex. Rain) for the date of the calendar reminder based on the city.
- [x] Unit test the functionality: Ability to add a new "reminder" (max 30 chars) for a user
entered day and time. Also, include a city.


##### Bonus (Optional)
- [x] Expand the calendar to support more than the current month.
- [Partially] Properly handle overflow when multiple reminders appear on the same date. 
  - Partially because reminders with same hour dont overflow.

- [x] Functionality to delete one or ALL the reminders for a specific day



---
## Guide

Click in one day in calendar and a modal will open to:
- Create a reminder for that day
or
- Delete all reminders of that day


Click in one reminder on a day to:
- Open a modal to see details and weather (located on the left side of action buttons)
- Edit or Delete reminder