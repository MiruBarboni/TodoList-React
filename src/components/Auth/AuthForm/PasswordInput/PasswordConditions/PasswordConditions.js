import React from 'react';

import Condition from './Condition/Condition';

import cssStyle from './PasswordConditions.module.css';

const PasswordConditions = ({ passwordIsValid }) => {
	const minLengthVal = passwordIsValid.minLength;
	const upperCaseLVal = passwordIsValid.upperCaseL;
	const lowerCaseLVal = passwordIsValid.lowerCaseL;
	const numsVal = passwordIsValid.nums;
	const specialCharsVal = passwordIsValid.specialChars;

	return (
		!(
			minLengthVal &&
			upperCaseLVal &&
			lowerCaseLVal &&
			numsVal &&
			specialCharsVal
		) && (
			<div className={cssStyle.container}>
				<div className={cssStyle.subContainer}>
					<Condition isValid={minLengthVal}>At least 8 char.</Condition>
					<Condition isValid={upperCaseLVal}>At least 1 upper letter</Condition>
					<Condition isValid={lowerCaseLVal}>At least 1 lower letter</Condition>
					<Condition isValid={numsVal}>At least 1 number </Condition>
					<Condition isValid={specialCharsVal}>
						At least 1 special char.
					</Condition>
				</div>
			</div>
		)
	);
};

export default PasswordConditions;
