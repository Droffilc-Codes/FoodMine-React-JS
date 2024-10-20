import React from 'react'

// DateTime.defaultProps = {
//     options: {
//         weekday: "short", 
//         year: "numeric", 
//         day: "numeric", 
//         month: "long", 
//         hour: "numeric", 
//         minute: "numeric", 
//         second: "numeric"
//     }
// }
const defaultOptions = {
    weekday: "short", 
    year: "numeric", 
    month: "long", 
    day: "numeric", 
    hour: "numeric", 
    minute: "numeric", 
    second: "numeric"
};
// export default function DateTime({date, 
//     options:{ weekday, year, day, month, hour, minute, second }
// }) {
    export default function DateTime({date, options = defaultOptions}) {

        const { weekday, year, month, day, hour, minute, second } = options;

   if(!date) console.log("No date found")

    var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale

    const getDate = () => 
        new Intl.DateTimeFormat(currentLocale,{
            year,
            month,
            weekday,
            day,
            hour,
            minute,
            second,
        }).format(Date.parse(date))

  return (<> {getDate()}</>)
}

