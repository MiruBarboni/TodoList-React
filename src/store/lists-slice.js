import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const listsSlice = createSlice({
	name: 'lists',
	initialState: [
		{
			id: '0.28903038705869855',
			title: 'Buy books',
			category: 'Business',
			color: '#fbf8cc',
			todoList: [
				{
					id: '0.41743196021888207',
					text: 'Becoming - Michelle Obama',
					isChecked: false,
				},
				{ id: '0.7554772188639602', text: 'Dopamine', isChecked: true },
				{
					id: '0.7461380951011114',
					text: 'The Da Vinci Code',
					isChecked: true,
				},
				{ id: '0.2640082730250657', text: 'Hunger Games', isChecked: true },
				{
					id: '0.011564956588274722',
					text: 'The Lord of the Rings',
					isChecked: true,
				},
				{
					id: '0.6567646291157401',
					text: 'Where the crawdads sing',
					isChecked: true,
				},
			],
		},
		{
			id: '0.6826260115392955',
			title: 'Shopping List',
			category: 'Business',
			color: '#fbf8cc',
			todoList: [
				{ id: '0.95269212942016', text: 'Sugar', isChecked: true },
				{ id: '0.7907897201222733', text: 'Bread', isChecked: false },
				{ id: '0.9065029156801292', text: 'Oranges', isChecked: false },
				{ id: '0.8539074801474997', text: 'Milk', isChecked: true },
			],
		},
		{
			id: '0.5686549069771549',
			title: 'Copy of Shopping List',
			category: 'Food-and-Drink',
			color: '#c9e4ca',
			todoList: [
				{ id: '0.2635336322138879', text: 'Chocolate', isChecked: false },
				{ id: '0.5562532378887344', text: 'Sugar', isChecked: false },
				{ id: '0.491801701934931', text: 'Bread', isChecked: false },
				{ id: '0.24655363551290743', text: 'Oranges', isChecked: false },
				{ id: '0.9543361322574446', text: 'Milk', isChecked: false },
			],
		},
	],
	reducers: {
		deleteAllLists() {
			return [];
		},
		addList(state) {
			const id = uuidv4();
			const newList = {
				id,
				title: '',
				category: 'Select a category',
				color: '#ead2ac',
				todoList: [],
			};

			state.push(newList);
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
