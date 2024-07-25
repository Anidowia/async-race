import React from "react";

import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => (
	<div className={styles.spinner} data-testid="spinnerContainer" />
);

export default LoadingSpinner;
