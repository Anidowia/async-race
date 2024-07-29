## Task "Async Race"

## 📚 Links

- [Server Mock Repo](https://github.com/mikhama/async-race-api)
- [Demo Video](https://youtu.be/aLjibbo9spo)
- [Frontend Github](https://github.com/Anidowia/async-race)
- [Deployed UI](https://async-race-phi.vercel.app/)

## Checklist 400/400 pts

## Basic Structure (80 points)

- [x] **Two Views (10 points):** Implement two primary views: "Garage" and "Winners".
- [x] **Garage View Content (30 points):** The "Garage" view must display:
  - [x] Name of view
  - [x] Car creation and editing panel
  - [x] Race control panel
  - [x] Garage section
- [x] **Winners View Content (10 points):** The "Winners" view should display:
  - [x] Name of view ("Winners")
  - [x] Winners table
  - [x] Pagination
- [x] **Persistent State (30 points):** Ensure the view state remains consistent when navigating between views. This includes preserving page numbers and input states. For example, page number shouldn't be reset, input controls should contain that they contained before switching, etc.

## Garage View (90 points)

- [x] **Car Creation And Editing Panel. CRUD Operations (20 points):** Enable users to create, update, and delete cars. A car has two attributes: "name" and "color". Empty and too long names should be handled. For "delete"-operation car should be deleted from "garage" table as well as from "winners".
- [x] **Color Selection (10 points):** Allow color selection from an RGB palette ([like here](https://colorspire.com/rgb-color-wheel/)), displaying the selected color on the car's image along with its name.
- [x] **Random Car Creation (20 points):** There should be a button to create random cars (100 cars per click). Name should be assembled from two random parts, for example "Tesla" + "Model S", or "Ford" + "Mustang" (At least 10 different names for each part). Color should be also generated randomly.
- [x] **Car Management Buttons (10 points):** Provide buttons near each car's image for updating its attributes or deleting it.
- [x] **Pagination (10 points):** Implement pagination for the "Garage" view, displaying 7 cars per page.
- [x] **EXTRA POINTS (20 points):**
  - [x] **Empty Garage** Handle empty garage with user friendly message "No Cars" or something like this. Do it at your discretion.
  - [x] **Empty Garage Page** If you remove the last one car on the page, you should be moved on the previous page, to hide the empty one.

## 🏆 Winners View (50 points)

- [x] **Display Winners (15 points):** After some car wins it should be displayed at the "Winners view" table.
- [x] **Pagination for Winners (10 points):** Implement pagination for the "Winners" view, with 10 winners per page.
- [x] **Winners Table (15 points):** The table should include columns for the car's №, image, name, number of wins, and best time in seconds. If the same car wins more than once the number of wins should be incremented while best time should be saved only if it's better than the stored one.
- [x] **Sorting Functionality (10 points):** Allow users to sort the table by the number of wins and best time, in ascending or descending order.

## 🚗 Race (170 points)

- [x] **Start Engine Animation (20 points):** User clicks to the engine start button near each car -> UI is waiting for car's velocity answer -> animate the car and makes another request to drive. In case api returned 500 error car animation should be stopped.
- [x] **Stop Engine Animation (20 points):** User clicks to the engine stop button near each car -> UI is waiting for answer for stopping engine -> car returned to it's initial place.
- [x] **Responsive Animation (30 points):** Ensure car animations are fluid and responsive on screens as small as 500px.
- [x] **Start Race Button (10 points):** Start button should start the race for all cars on the current page.
- [x] **Reset Race Button (15 points):** Reset button should return all cars to their starting positions.
- [x] **Winner Announcement (5 points):** After some car finishes first user should see the message contains car's name that shows which one has won.
- [x] **Button States (20 points):** Start engine button should be disabled in case car is already in driving mode. As well as stop engine button should be disabled when car is on it's initial place.
- [x] **Actions during the race (50 points):** Control over actions during a running race. Such as, deleting or editing a car, changing a page or view. Adding new cars. You can block buttons and stop the race. The main thing is to ensure predictable operation of the application.

## 🎨 Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points):** Prettier is correctly set up with two scripts in `package.json`: `format` for auto-formatting and `ci:format` for checking issues.
- [x] **ESLint Configuration (5 points):** ESLint is configured with the [Airbnb style guide](https://www.npmjs.com/package/eslint-config-airbnb). A `lint` script in `package.json` runs ESLint checks. Configuration files should reflect strict TypeScript settings as per `tsconfig.json`.

## 🌟 Overall Code Quality. (100 points) _Skip during self-check_

- [ ] **(Up to 100 points)** Discretionary points awarded by the reviewer based on overall code quality, readability
  - [ ] **Modular Design** The application should be clearly divided into logical modules or layers, such as API interaction, UI rendering, and state management.
  - [ ] **Function Modularization** Code should be organized into small, clearly named functions with specific purposes. Common functions moved to helper. Each function should not exceed 40 lines.
  - [ ] **Code Duplication and Magic Numbers** Minimize code duplication and maintain readability by avoiding the use of magic numbers or strings throughout the codebase.
  - [ ] **Readability** Clear, readable code. Understandable names of variables, functions, modules
  - [ ] **Extra features** _Example for React: Custom hooks, Portals, React Router_

## 🔄 Evaluation Rules

- **[@Candidate]** The UI should be deployed to gh-pages, Netlify, or a similar service, and the link should be included in the `README.md`.
- **[@Reviewer]** You should clone the [server repository](https://github.com/mikhama/async-race-api.git) and keep the server running during the functionality review.
- **[@Reviewer]** Test task should be evaluated based on both functional and non-functional requirements.
- **[@Candidate]** Pay close attention to details in the implementation, as bugs and deviations from the requirements can impact your score.
- **[@Reviewer]** If bugs are found, the following deductions can be applied:
  - (**-30**) Major bug (implemented functionality works but breaks down after certain manipulations, with unexpected errors in the browser's console).
  - (**-10**) Minor bug (implemented functionality works but behaves inconsistently after certain manipulations, such as a button not becoming enabled after changing some state, with no errors in the browser's console).
  - **Note:** If you repeatedly press the "start engine button" then the "stop engine button" or the "start race button" then the "reset race button" and see a "404" or "429" error, this is not considered a bug.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
