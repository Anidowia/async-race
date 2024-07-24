import React from "react";
import styles from "./Divider.module.scss";

const Divider: React.FC = () => (
	<div className={`${styles.divider} ${styles.donotcross}`} />
);

export default Divider;
