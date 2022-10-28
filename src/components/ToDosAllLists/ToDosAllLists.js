import { useSelector } from 'react-redux';

import ToDoList from './ToDosList/ToDosList';
import { filterList } from '../../utils/searchLists';

const ToDosAllLists = () => {
	const lists = useSelector((state) => state.lists);
	const searchedValue = useSelector((state) => state.ui.searchedValue);

	const todosListsArray = lists
		.filter((list) => filterList(list, searchedValue))
		.map((list) => {
			return <ToDoList key={list.id} id={list.id} />;
		});

	return <>{todosListsArray}</>;
};

export default ToDosAllLists;
