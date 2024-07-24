export const getRandomCarName = (list: string[]) =>
	list[Math.floor(Math.random() * list.length)];
