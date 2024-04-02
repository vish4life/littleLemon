import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
    return new Promise((resolve, reject) => {
        db.transaction(
            (tx) => {
                tx.executeSql(
                    'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
                );
            },
            reject,
            resolve
        );
    });
}

export async function getMenuItems() {
    return new Promise((resolve) => {
        db.transaction((tx) => {
            tx.executeSql('select * from menuitems', [], (_, { rows }) => {
                resolve(rows._array);
            });
        });
    });
}

export function saveMenuItems(menuItems) {
    const values = menuItems.map((ite) => [ite.id, ite.title, ite.price, ite.category]);
    const flatValues = values.flat();
    const placeHolder = values.map(() => '(?,?,?,?)').join(',');
    db.transaction((tx) => {
        tx.executeSql(
            `insert into menuitems (uuid,title,price,category) values ${placeHolder};`, flatValues
        );
        // 2. Implement a single SQL statement to save all menu data in a table called menuitems.
        // Check the createTable() function above to see all the different columns the table has
        // Hint: You need a SQL statement to insert multiple rows at once.
    });
    alert('inserted the data');
}

/**
 * 4. Implement a transaction that executes a SQL statement to filter the menu by 2 criteria:
 * a query string and a list of categories.
 *
 * The query string should be matched against the menu item titles to see if it's a substring.
 * For example, if there are 4 items in the database with titles: 'pizza, 'pasta', 'french fries' and 'salad'
 * the query 'a' should return 'pizza' 'pasta' and 'salad', but not 'french fries'
 * since the latter does not contain any 'a' substring anywhere in the sequence of characters.
 *
 * The activeCategories parameter represents an array of selected 'categories' from the filter component
 * All results should belong to an active category to be retrieved.
 * For instance, if 'pizza' and 'pasta' belong to the 'Main Dishes' category and 'french fries' and 'salad' to the 'Sides' category,
 * a value of ['Main Dishes'] for active categories should return  only'pizza' and 'pasta'
 *
 * Finally, the SQL statement must support filtering by both criteria at the same time.
 * That means if the query is 'a' and the active category 'Main Dishes', the SQL statement should return only 'pizza' and 'pasta'
 * 'french fries' is excluded because it's part of a different category and 'salad' is excluded due to the same reason,
 * even though the query 'a' it's a substring of 'salad', so the combination of the two filters should be linked with the AND keyword
 *
 */
export async function filterByQueryAndCategories(query, activeCategories) {
    return new Promise((resolve, reject) => {
        // console.log('in db file for query: ', query);
        // console.log('in db file for activecategories: ',activeCategories)
        if (query.length > 0) {
            db.transaction((tx) => {
                tx.executeSql('select * from menuitems where category like (?) or title like (?);', [`%${query}%`, `%${query}%`], (_, { rows }) => {
                    // console.log(rows._array);
                    if (rows._array.length > 0) {
                        // console.log('Data available');
                        resolve(rows._array);
                    }
                    else {
                        const noData = [
                            {
                                "category": "Appetizers",
                                "id": 1,
                                "price": "",
                                "title": `No Menu for ${query}`,
                                "uuid": "1"
                            },
                            {
                                "category": "Salads",
                                "id": 2,
                                "price": "",
                                "title": `No Menu for ${query}`,
                                "uuid": "2"
                            },
                            {
                                "category": "Beverages",
                                "id": 3,
                                "price": "",
                                "title": `No Menu for ${query}`,
                                "uuid": "3"
                            },
                        ]
                        // console.log(noData);
                        resolve(noData);
                    }

                },
                    (_, error) => {
                        console.log(error);
                        reject(error);
                    }
                );
            });
        }
        if (activeCategories.length > 0) {
            // console.log(activeCategories);
            const placeHolder = activeCategories.map(() => '?').join(',');
            // console.log(placeHolder);
            const values = [...activeCategories];
            db.transaction((tx) => {
                // console.log('inside select block with where clause');
                tx.executeSql(`select * from menuitems where category in (${placeHolder})`, values, (_, { rows }) => {
                    // console.log('rows array: ',rows._array);
                    resolve(rows._array);
                },
                    (_, error) => {
                        // console.error('SQL error: ',error);
                        reject(error);
                    }
                );
            });
        }
        // resolve(SECTION_LIST_MOCK_DATA);
    });
}
