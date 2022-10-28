import cssStyle from './Icon.module.css';

const Icon = (props) => {
	return (
		<span
			className={`material-symbols-outlined ${cssStyle.icon} 
            ${props.className ? props.className : ''}`}
			onClick={props.onClick}
			id={props.id}
		>
			{props.children}
		</span>
	);
};

export default Icon;
