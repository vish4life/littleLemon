# Little Lemon Restaurant Menu app
This project is a simple restaurant menu app which displays the available menu and allows user to filter based on the categories selected or search items in the search bar.

## Tech Stack
* React Native
* EXPO

### The mobile application should contain the following
* Menu Screen:
    > * Search bar at the top which allows user to type the item looked for
    > * Categories bar which allows user to select or deselect a category
    > * Menu list (dynamically rendered)

# Technical Design
### Code Flow:
The app consists of three main components
> * Search Bar
> * Categories Bar
> * Menu section

Detailed Code Processing Logic of every component
> Search Bar:
> > * Search bar is from react-native-papers
> > * handleSearchChange method gets invoked which looksup for the values from database (database available in database.js file)

> Categories Bar:
> > * The categories bar is an array with hardcoded values of Appetizers, Salads & Beverages
> >  * These are pressable components which are set in 'Filters.js' file which invoke 'handleFiltersChange' method, which inturn triggers the database filterByQueryAndCategories method

> Menu list:
> > * Menu List is a section list which gets invoked from static data set in utils.js file
> > * Once the data is fetched from API and created in Expo sql, then values are fetched from DB
> > * The creation logic lies in useEffect userhook

### Run project
* In the project directory (src), you can run: `npm start`
* Runs the app in the Expo go or Simulators (like Android Go).


## Sample Snippets
### Application
iOS version from IphoneX (ExpoGo app)
* ![Full Menu Page](https://github.com/vish4life/littleLemon/blob/main/snaps/fullMenu.png)
* ![Appetizers Page](https://github.com/vish4life/littleLemon/blob/main/snaps/app.png)
* ![Salads Page](https://github.com/vish4life/littleLemon/blob/main/snaps/salad.png)
* ![Beverages Page](https://github.com/vish4life/littleLemon/blob/main/snaps/bev.png)
* ![Appetizers & Salads Page](https://github.com/vish4life/littleLemon/blob/main/snaps/appSal.png)
* ![Appetizers & Beverages Page](https://github.com/vish4life/littleLemon/blob/main/snaps/appBev.png)
* ![Salad & Beverages Page](https://github.com/vish4life/littleLemon/blob/main/snaps/saladBev.png)
* ![Search Bar Page](https://github.com/vish4life/littleLemon/blob/main/snaps/substring.png)
* ![No Menu Page](https://github.com/vish4life/littleLemon/blob/main/snaps/noMenu.png)