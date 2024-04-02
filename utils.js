import { useRef, useEffect } from 'react';

export const SECTION_LIST_MOCK_DATA = [
    {
        title: 'Appetizers',
        data: [
            {
                id: '1',
                title: 'Pasta',
                price: '10',
            },
            {
                id: '3',
                title: 'Pizza',
                price: '8',
            },
        ],
    },
    {
        title: 'Salads',
        data: [
            {
                id: '2',
                title: 'Caesar',
                price: '2',
            },
            {
                id: '4',
                title: 'Greek',
                price: '3',
            },
        ],
    },
];

/**
 * 3. Implement this function to transform the raw data
 * retrieved by the getMenuItems() function inside the database.js file
 * into the data structure a SectionList component expects as its "sections" prop.
 * @see https://reactnative.dev/docs/sectionlist as a reference
 */
export function getSectionListData(data) {
    // SECTION_LIST_MOCK_DATA is an example of the data structure you need to return from this function.
    // The title of each section should be the category.
    // The data property should contain an array of menu items. 
    // Each item has the following properties: "id", "title" and "price"
    // console.log(data);
    const groupedData = {};
    data.forEach((item)=>{
        if(!groupedData[item.category]){
            groupedData[item.category] = [];
        }
        groupedData[item.category].push({
            id:item.id,
            title:item.title,
            price:item.price,
        });
    });
    const section_list_data = Object.keys(groupedData).map((category)=>({
        title:category,
        data:groupedData[category]
    }))
    // console.log(section_list_data);
    // return SECTION_LIST_MOCK_DATA;
    return section_list_data;
}

export function useUpdateEffect(effect, dependencies = []) {
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}
