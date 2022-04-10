export default {
    addList(context, payload) {
        return new Promise(resolve => {
            // 如果新添加的待办，原先有，就是编辑，要替换元素
            let oldList = context.state.todoList.find(item => item.id == payload.id)
            if (oldList) {
                const editList = {
                    newList: payload,
                    oldList: oldList
                }
                context.commit('editTodoList', editList)
                resolve('编辑成功')
                let currentIndex = context.state.currentDateTodo.find(item => item.id == payload.id)
                if (currentIndex) {
                    const editList = {
                        newList: payload,
                        oldList: currentIndex
                    }
                    context.commit('editCurrentList', editList)
                }
            } else {
                // 如果原先没有，就是新建，要添加元素
                context.commit('addTodoList', payload)
                resolve('新建成功')

                // 如果提交的日期是当前日期，就再保存到 currentDateTodo
                const date = new Date()

                if (payload.time.toDateString() == date.toDateString()) {
                    context.commit("saveCurrentList", payload);
                }
            }


        })
    },
    deleteList(context, payload) {
        // 点击删除，如果id在todolist查找到，就todolist.splice；否则donelist.splice
        const todoIndex = context.state.todoList.findIndex(val => val.id == payload)
        context.commit("deleteTodoList", todoIndex);
        const currentIndex = context.state.currentDateTodo.findIndex(val => val.id == payload)
        context.commit("deleteCurrentList", currentIndex);
    },
    selectList(context) {
        let selectList = context.state.todoList.filter((item) => {
            const date = new Date(item.time)
            const selectTime = new Date(context.state.selectTime)
            return date.toDateString() == selectTime.toDateString();
        });
        context.commit("saveSelectList", selectList);
    }

}