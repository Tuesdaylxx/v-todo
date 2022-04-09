export function refreshYesterday(todoList) {
    const yesterday = new Date();
    yesterday.setTime(yesterday.getTime() - 24 * 60 * 60 * 1000);
    let formatYesterday = (yesterday + "").substring(0, 15);

    function yesterdayTodo(val) {
        let formatTodo = (val.time + "").substring(0, 15);
        return formatTodo == formatYesterday;
    }
    let yesterdayList = todoList.filter(yesterdayTodo);
    console.log(formatYesterday);
    console.log(yesterdayTodo(todoList));

    console.log(yesterdayList);
    return yesterdayList
}
