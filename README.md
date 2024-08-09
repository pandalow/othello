# othello
This is a simple Othello game built with React and Spring Boot. It supports both two-player local matches and games against a basic computer opponent.

The frontend leverages extensive state management techniques, with BoardContext being utilized to efficiently manage the overall state of the application.

On the backend, there's no database involvement; instead, the game logic is powered by the MiniMax algorithm with alpha-beta pruning, providing a straightforward AI opponent for single-player games.

## Reference
- https://medium.com/@gmu1233/how-to-write-an-othello-ai-with-alpha-beta-search-58131ffe67eb


## Prerequisites
### React dependencies
- Node.js version: 20.14.0
- npm version: 10.7.0
- tailwind version: 3.4.7

### Springboot
- Springboot version: 3.3.2
- Java sdk : openjdk 21.0.2
- lombok

## How to run project on localhost:
  - Clone the repository
  - In REACT project:
    - Install dependencies. Navigate to the project directory in your terminal. Run `npm install` or `yarn install` to install the project's dependencies.
    - Start the development server Run `npm run dev` to start the development server. This will start a local server at http://localhost:5173 where you can view the application.
  - In Springboot:
    - In your vim, running`OthelloServerApplication.class`
