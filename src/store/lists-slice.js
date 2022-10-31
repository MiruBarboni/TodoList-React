import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const listsSlice = createSlice({
	name: 'lists',
	initialState: [],

	reducers: {
		//replace the list from UI with the list that is loading from Firebase
		replaceLists(state, action) {
			return action.payload;
		},
		deleteAllLists() {
			return [];
		},
		addList(state, action) {
			state.push(action.payload);
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
		copyList(state, action) {
			const id = action.payload;
			const list = _.cloneDeep(state.find((item) => item.id === id));

			list.title
				? (list.title = `Copy of ${list.title}`)
				: (list.title = 'Copy of Untitle List');

			list.id = uuidv4();
			list.todoList.forEach((todo) => {
				todo.id = uuidv4();
			});

			state.push(list);
		},

		//Reducers for ToDos items
		deleteToDo(state, action) {
			const { listId, todoId } = action.payload;

			const list = state.find((list) => list.id === listId);
			list.todoList = list.todoList.filter((todo) => todo.id !== todoId);

			// list.todoList.splice(
			// 	list.todoList.findIndex((todo) => todo.id === todoId),
			// 	1
			// );
		},
		addTodo(state, action) {
			const listId = action.payload;

			const list = state.find((list) => list.id === listId);

			const todoId = uuidv4();
			const newTodo = {
				id: todoId,
				text: '',
				isChecked: false,
			};

			list.todoList.unshift(newTodo);
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
