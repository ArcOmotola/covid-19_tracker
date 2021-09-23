export const sortData = (data) => {     // sorts data from api according to number of cases in descending order
    const sortedData = [...data];         

    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;                  
        } else {
            return 1;
        }
    })

    return sortedData;
}



// //SIMILARLY

// export const sortData = (data) => {     
//     const sortedData = [...data];         

//     sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));

//     return sortedData;
// }

