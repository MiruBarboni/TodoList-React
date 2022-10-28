import Button from '../../UI/Button/Button';

import cssStyle from './ControlListBtn.module.css';

const ControlListBtn = (props) => {
	return (
		<Button
			className={`${cssStyle.btn} ${props.className ? props.className : ''}`}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export default ControlListBtn;
