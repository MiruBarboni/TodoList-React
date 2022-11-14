import React from 'react';

import cssStyle from './Card.module.css';

const Card = (props) => {
	return (
		<section
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			onClick={props.onClick}
			className={`${cssStyle.card} ${props.className ? props.className : ''}`}
			style={{ backgroundColor: props.backgroundColor || '#fff' }}
		>
			{props.children}
		</section>
	);
};

export default Card;
