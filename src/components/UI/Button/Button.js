import cssStyle from './Button.module.css';

const Button = (props) => {
	return (
		<button
			className={`${cssStyle.btn} ${props.className ? props.className : ''}`}
			onClick={props.onClick}
		>
			{props.children}
		</button>
	);
};

export default Button;
