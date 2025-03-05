# AidaUserApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Insights into the Thought Process During Development
The development process focused on creating a modular and maintainable codebase. The application was designed with a component-based architecture to ensure reusability and separation of concerns. Angular services were used for state management and HTTP communication to keep the components clean and focused on the UI logic.

## Use of Additional Packages or Libraries
- **Angular Material:** Used for UI components and styling.
- **RxJS:** Used for reactive programming and handling asynchronous operations.
- **Karma:** Used for running unit tests.
- **Protractor:** Used for running end-to-end tests.

## Potential Future Improvements
- **Authentication and Authorization:** Implement user authentication and role-based access control.
- **State Management:** Integrate a state management library like NgRx for more complex state management.
- **Performance Optimization:** Optimize the application for better performance and faster load times.
- **Responsive Design:** Improve the responsiveness of the application for better user experience on mobile devices.

## Challenges Faced and Solutions Implemented
- **State Management:** Managing the state of the application was challenging. This was addressed by using Angular services and BehaviorSubject for state management.
- **Component Communication:** Ensuring smooth communication between components was challenging. This was addressed by using Angular's input and output properties and services for shared state.
- **Testing:** Writing comprehensive tests for the application was challenging. This was addressed by using Angular's testing utilities and writing unit tests and end-to-end tests.

## Example API Usage and Endpoints
The application communicates with a backend server to fetch and manage user data. Here are some example API endpoints:

### Get all users:

**GET** `/api/users`

**Response:**
```json
[
  {
    "id": "1",
    "fullName": "John Doe",
    "displayName": "johndoe",
    "email": "john.doe@example.com",
    "details": "Some details about John Doe",
    "role": "VIEWER"
  },
  ...
]
```

### Add a new user:

**POST** `/api/users`

**Request body:**
```json
{
  "fullName": "Jane Doe",
  "displayName": "janedoe",
  "email": "jane.doe@example.com",
  "details": "Some details about Jane Doe",
  "role": "ADMIN"
}
```

### Update a user:
**PUT** `/api/users/:id`

**Request body:**
```json
{
  "fullName": "Jane Doe",
  "displayName": "janedoe",
  "email": "jane.doe@example.com",
  "details": "Updated details about Jane Doe",
  "role": "ADMIN"
}
```

### Delete a user:

**DELETE** `/api/users/:id`
