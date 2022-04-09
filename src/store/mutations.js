
export default {
    // 添加待做
    addTodoList(state, payload) {
        state.todoList.push(payload)
    },
    // 编辑替换
    editTodoList(state, editList) {
        let oldListIndex = state.todoList.findIndex(val => val.id === editList.oldList.id)
        state.todoList.splice(oldListIndex, 1, editList.newList);
    },
    // 删除待做
    deleteTodoList(state, index) {
        state.todoList.splice(index, 1);
    },
    deleteCurrentList(state, index) {
        state.currentDateTodo.splice(index, 1);
    },
    // 将待做改为已做
    completeList(state, id) {
        let doneIndex = state.todoList.findIndex(val => val.id === id)
        state.todoList[doneIndex].done = true;
    },
    // 将已做改为待做
    notCompleteList(state, id) {
        let todoIndex = state.todoList.findIndex(val => val.id === id)
        state.todoList[todoIndex].done = false;
    },

    // 存入选择的日历日期
    saveSelectTime(state, payload) {
        state.selectTime = payload
    },
    // 存入当前选中日期的日程
    saveCurrentList(state, payload) {
        state.currentDateTodo.push(payload)
    },
    saveSelectList(state, payload) {
        state.currentDateTodo = payload
    },

    // 获取昨天的列表
    getYesterdayList(state, payload) {
        state.yesterdayList = payload
    },
    //  倒计时
    getCountDown(state, payload) {
        state.countDown = parseFloat(payload) + parseFloat(state.countDown)
        console.log(state.countDown);
        console.log(payload);
    },

    // 切换主题
    changeTheme(state, payload) {
        state.theme = payload
    },


}


