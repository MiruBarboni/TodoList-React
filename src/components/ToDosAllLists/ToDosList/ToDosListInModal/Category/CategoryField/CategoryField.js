import cssStyle from './CategoryField.module.css';

const CategoryField = ({ id, isCategoriesBoxOpen, ...props }) => {
	return (
		<div
			className={`${cssStyle.listCategory} ${
				isCategoriesBoxOpen ? cssStyle.rotateArrow : ''
			}`}
			onClick={props.onToggleCategoriesHandler}
		>
			{props.selectCategory}
		</div>
	);
};

export default CategoryField;
