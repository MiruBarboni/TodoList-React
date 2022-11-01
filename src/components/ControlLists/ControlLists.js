import AddButton from './ControlListsBtns/AddButton/AddButton';
import DeleteButton from './ControlListsBtns/DeleteButton/DeleteButton';

import cssStyle from './ControlLists.module.css';

const ControlLists = () => {
	return (
		<section className={cssStyle.container}>
			<AddButton />
			<DeleteButton />
		</section>
	);
};

export default ControlLists;
