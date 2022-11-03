import { createSlice } from '@reduxjs/toolkit';

const listsSlice = createSlice({
	name: 'lists',
	initialState: [],

	reducers: {
		replaceLists(state, action) {
			return action.payload;
		},
		addList(state, action) {
			state.push(action.payload);
		},

		deleteAllLists() {
			return [];
		},
		deleteList(state, action) {
			const id = action.payload;
			return state.filter((item) => item.id !== id);
		},
		updateList(state, action) {
			const { id, toUpdate } = action.payload;
			return state.map((list) => {
				if (list.id === id)
					return {
						...list,
						...toUpdate,
					};
				else return list;
			});
		},

		//Reducers for ToDos items
		deleteToDo(state, action) {
			const { listId, todoId } = action.payload;

			const list = state.find((list) => list.id === listId);
			list.todoList = list.todoList.filter((todo) => todo.id !== todoId);
		},

		addTodo(state, action) {
			const { listId, todoObj } = action.payload;

			const list = state.find((list) => list.id === listId);

			list.todoList.unshift(todoObj);
		},

		updateToDo(state, action) {
			const { listId, todoId, toUpdate } = action.payload;

			const list = state.find((list) => list.id === listId);

			list.todoList = list.todoList.map((todo) => {
				if (todo.id === todoId)
					return {
						...todo,
						...toUpdate,
					};
				else return todo;
			});
		},
	},
});

export const listsActions = listsSlice.actions;

export default listsSlice;
