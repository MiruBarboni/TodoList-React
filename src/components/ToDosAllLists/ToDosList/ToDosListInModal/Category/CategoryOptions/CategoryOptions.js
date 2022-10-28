import cssStyle from './CategoryOptions.module.css';

const DUMMY_categories = [
	'Books',
	'Business',
	'Education',
	'Entertaiment',
	'Finance',
	'Food-and-Drink',
];

const CategoryOptions = (props) => {
	const categories = DUMMY_categories.map((categ) => {
		return (
			<div
				className={cssStyle.option}
				key={categ}
				onClick={() => props.onCategoryClick(categ)}
			>
				{categ}
			</div>
		);
	});
	return <div className={cssStyle.optionsContainer}>{categories}</div>;
};

export default CategoryOptions;
