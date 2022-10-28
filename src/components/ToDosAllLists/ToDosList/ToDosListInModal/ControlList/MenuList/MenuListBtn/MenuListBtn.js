import Button from '../../../../../../UI/Button/Button';

import cssStyle from './MenuListBtn.module.css';

const MenuListBtn = (props) => {
	return (
		<Button
			className={`${cssStyle.btn} ${props.className ? props.className : ''}`}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export default MenuListBtn;
