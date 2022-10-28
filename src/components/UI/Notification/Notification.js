import classes from './Notification.module.css';

const Notification = (props) => {
	let specialClasses = '';

	const cssClasses = `${classes.notification} ${specialClasses}`;

	return (
		<section className={cssClasses}>
			<p>{props.children}</p>
		</section>
	);
};

export default Notification;
