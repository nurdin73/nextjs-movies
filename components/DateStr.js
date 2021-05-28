function DateStr({date}) {
    const monthStr = [
        { id: 0, name: "Janunary" },
        { id: 1, name: "February" },
        { id: 2, name: "March" },
        { id: 3, name: "April" },
        { id: 4, name: "Mei" },
        { id: 5, name: "Juny" },
        { id: 6, name: "July" },
        { id: 7, name: "August" },
        { id: 8, name: "September" },
        { id: 9, name: "October" },
        { id: 10, name: "November" },
        { id: 11, name: "Desember" },
    ]

    const dateClass = new Date(date)

    const getMonth = monthStr.filter(month => {
        if(month.id === dateClass.getMonth()) {
            return month
        }
    })
    
    const dateStr = getMonth[0].name + ", " + dateClass.getDate() + " " + dateClass.getFullYear()

    return (
        <span>{dateStr}</span>
    )
}

export default DateStr