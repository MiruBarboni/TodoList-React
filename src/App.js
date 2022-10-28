import ControlLists from './components/ControlLists/ControlLists';
import ToDosAllLists from './components/ToDosAllLists/ToDosAllLists';
import SearchLists from './components/SearchLists/SearchLists';

function App() {
	return (
		<>
			<SearchLists />
			<ControlLists />
			<ToDosAllLists />
		</>
	);
}

export default App;
