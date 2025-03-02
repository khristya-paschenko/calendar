# Welcome to Calendar

This is a **Calendar App** that allows users to **add, edit, and delete events** with specific dates and times. Users can also select a **repeat option** when creating an event using a bottom sheet menu. The available repeat options are:

- **Never** (one-time event)
- **Once a week**
- **Twice a month**
- **Every month**

### Features:
✅ **Create Events** – Users can schedule events with a selected time and date.  
✅ **Repeat Options** – Choose from multiple recurrence options when adding an event.  
✅ **Edit & Delete Events** – Users can modify or remove events as needed.  
✅ **Event Restrictions** – Users **cannot create or edit past events** to maintain accuracy.  
✅ **Conflict Prevention** – The app ensures that events **do not overlap**, preventing scheduling conflicts.

## Getting Started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app
   ```bash
    npm start
   ```
   
## Key Technologies Used

- [Expo](https://docs.expo.dev/more/expo-cli/)
- [useContext](https://react.dev/reference/react/useContext)
- [AsyncStorage](https://www.npmjs.com/package/@react-native-async-storage/async-storage)
- [BottomSheet](https://www.npmjs.com/package/@gorhom/bottom-sheet)
- [RNCalendars](https://www.npmjs.com/package/react-native-calendars)
- [RNDateTimePicker](https://www.npmjs.com/package/@react-native-community/datetimepicker)

