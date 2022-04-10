export function refreshYesterday(todoList) {
    const date = new Date();
    let yesterday = date.setTime(date.getTime() - 24 * 60 * 60 * 1000);
    const stringYesterday = new Date(yesterday);
    let formatYesterday = stringYesterday.toDateString();

    let yesterdayList = todoList.filter((val) => {
        const todo = new Date(val.time);
        let formatTodo = todo.toDateString();
        return formatTodo == formatYesterday;
    });

    return yesterdayList
}
