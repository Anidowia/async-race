import React from "react";

import GithubLogo from "../../common/svgs/GithubLogo";
import VercelLogo from "../../common/svgs/VercelLogo";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => (
	<footer>
		<div className={styles.footer}>
			<div className={styles.content}>
				<GithubLogo />
				<h2>Made with 💜 By</h2>
			</div>
			<VercelLogo />
		</div>
	</footer>
);

export default Footer;
