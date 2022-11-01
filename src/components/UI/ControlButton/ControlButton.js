import Button from '../../UI/Button/Button';

import cssStyle from './ControlButton.module.css';

const ControlButton = (props) => {
	return (
		<Button
			className={`${cssStyle.btn} ${props.className ? props.className : ''}`}
			onClick={props.onClick}
		>
			{props.children}
		</Button>
	);
};

export default ControlButton;
