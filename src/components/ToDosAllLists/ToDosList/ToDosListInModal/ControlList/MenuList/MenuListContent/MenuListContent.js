import React from 'react';
import cssStyle from './MenuListContent.module.css';

import DeleteBtn from '../DeleteBtn/DeleteBtn';
import CopyBtn from '../CopyBtn/CopyBtn';

const MenuListContent = React.forwardRef((props, listMenuRef) => {
	const id = props.id;
	return (
		<div ref={listMenuRef} className={cssStyle.container}>
			<DeleteBtn id={id} />
			<CopyBtn id={id} />
		</div>
	);
});

export default MenuListContent;
