import Input from "../Input/Input";
import Button from "../button/Button";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
	const handleButtonClick = () => {};

	return (
		<>
			<header className={styles.header}>
				<h3>ASYNC RACE</h3>
				<ul className="header-menu">
					<li>Garage</li>
					<li>Winners</li>
				</ul>
			</header>
			<hr />
			<div className={styles.grid}>
				<div className={styles.buttons}>
					<div className={styles["buttons-create"]}>
						<Input type="text" />
						<Button
							buttonText="CREATE"
							onClick={handleButtonClick}
							type="button"
						/>
						<Input type="color" value="#0077e5" />
					</div>
					<div className={styles["buttons-update"]}>
						<Input type="text" />
						<Button
							buttonText="UPDATE"
							onClick={handleButtonClick}
							type="button"
						/>
						<Input type="color" value="#004f98" />
					</div>
					<div className={styles["buttons-race"]}>
						<div className={styles.race}>
							<Button
								buttonText="RACE"
								onClick={handleButtonClick}
								type="button"
							/>
						</div>
						<Button
							buttonText="RESET"
							onClick={handleButtonClick}
							type="button"
						/>
						<div className={styles.generate}>
							<Button
								buttonText="GENERATE CARS"
								onClick={handleButtonClick}
								type="button"
							/>
						</div>
					</div>
				</div>
				<div className={styles.page}>
					<h2>Cars: 1</h2>
					<h2>Page 1/1</h2>
				</div>
			</div>
		</>
	);
};

export default Header;
