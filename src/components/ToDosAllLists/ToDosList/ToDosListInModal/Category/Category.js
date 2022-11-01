import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import CategoryField from './CategoryField/CategoryField';
import CategoryOptions from './CategoryOptions/CategoryOptions';

import { updateList } from '../../../../../api/updateList';

import cssStyle from './Category.module.css';

const Category = ({ id }) => {
	const dispatch = useDispatch();

	const [isCategoriesBoxOpen, setIsCategoriesBoxOpen] = useState(false);

	const { category } = useSelector((state) =>
		state.lists.find((list) => list.id === id)
	);
	const [selectCategory, setSelectCategory] = useState(category);

	const toggleCategoriesHandler = () => {
		setIsCategoriesBoxOpen((state) => !state);
	};

	const categoryClickHandler = (clickedCategory) => {
		toggleCategoriesHandler();
		setSelectCategory(clickedCategory);

		dispatch(updateList({ category: clickedCategory }, id));
	};

	return (
		<div className={cssStyle.selectBox}>
			{isCategoriesBoxOpen && (
				<CategoryOptions onCategoryClick={categoryClickHandler} />
			)}

			<CategoryField
				id={id}
				onToggleCategoriesHandler={toggleCategoriesHandler}
				selectCategory={selectCategory}
				isCategoriesBoxOpen={isCategoriesBoxOpen}
			/>
		</div>
	);
};

export default Category;
