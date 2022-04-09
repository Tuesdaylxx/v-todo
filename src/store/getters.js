export default {
    // 待做列表本身 在newlist中有使用
    todoListContent(state) {
        return state.todoList
    },

    todoListLength(state) {
        return state.todoList.length
    },

    // 当前日程
    currentTodoList(state) {
        const todoList = state.currentDateTodo.filter(item => {
            return item.done == false
        })
        return todoList
    },
    currentDoneList(state) {
        const doneList = state.currentDateTodo.filter(item => {
            return item.done == true
        })
        return doneList
    },
    // 昨日完成
    yesterdayDone(state) {
        let doneList = state.yesterdayList.filter((val) => {
            return val.done == true
        })
        return doneList.length
    },
    yesterdayRate(state) {
        let doneList = state.yesterdayList.filter((val) => {
            return val.done == true
        })
        if (state.yesterdayList.length == 0) {
            return 0
        } else {
            return (doneList.length / state.yesterdayList.length * 100).toFixed(0)
        }

    },

    // 累计完成
    totalDone(state) {
        let doneList = state.todoList.filter((val) => {
            return val.done == true
        })
        return doneList.length
    },
    totalRate(state) {
        let doneList = state.todoList.filter((val) => {
            return val.done == true
        })
        if (state.todoList.length == 0) {
            return 0
        } else {
            return (doneList.length / state.todoList.length * 100).toFixed(0)
        }
    }
}

