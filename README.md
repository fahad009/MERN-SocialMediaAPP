## MERN STACK | Social Media & Entertainment Application

### Introduction

Welcome to our web application, a dynamic platform that allows users to share their stories, connect with others, and
engage in real-time conversations, as well as read books and listen to audio books. Our app provides a user-friendly
interface that makes it easy to create and share content, discover new books and audiobooks, and connect with
like-minded individuals from around the world. With features such as bookshelves, audiobook players, commenting, and
liking, our platform fosters a vibrant community that encourages creativity, collaboration, and social interaction, as
well as a love for literature. Whether you're an avid reader, a writer, or just looking for a new way to connect with
others, our app provides a fun and engaging space where you can share your passions, discover new content, and build
meaningful relationships.

### Features

<ol>
<li>Add Episode</li>
<li>Add Season</li>
<li>Add Story</li>
<li>Edit Episode</li>
<li>Edit Scenes</li>
<li>Edit Story</li>
<li>Posting and sharing</li>
<li>Commenting</li>
<li>Liking and favoriting</li>
<li>Chatting</li>
<li>Notifications</li>
</ol>

### Main Technologies/Libraries Used

<ul>
<li>React.js</li>
<li>Firebase</li>
<li>Flux</li>
<li>Bootstrap</li>
<li>core-js</li>
<li>enzyme</li>
<li>moment</li>
<li>node-sass</li>
<li>noty</li>
<li>numeral</li>
<li>react-list-drag-and-drop</li>
<li>react-loading-skeleton</li>
<li>react-quill</li>
<li>react-redux</li>
<li>redux</li>
<li>uuidv4</li>
</ul>

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information for test.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### 🗄️ Project Structure

Most of the code lives in the `src` folder and looks like this:

````
.
├── public
├── src/
│   ├── assets/
│   │   └── icons/
│   │       ├── index.js
│   │       ├── logo.js
│   │       ├── logo-negative.js
│   │       └── sygnet.js
│   ├── containers/
│   │   ├── index.js
│   │   ├── TheContent.js
│   │   ├── TheFooter.js
│   │   └── TheHeader.js
│   ├── reuseable/
│   │   ├── config.js
│   │   ├── DocsLink.js
│   │   ├── index.js
│   │   └── Utility.js
│   ├── scss
│   ├── views/
│   │   ├── base/
│   │   │   ├── AddEpisode.js
│   │   │   ├── AddSeason.js
│   │   │   ├── AddStory.js
│   │   │   ├── EditEpisode.js
│   │   │   ├── EditScenes.js
│   │   │   ├── EditStory.js
│   │   │   ├── GenericAssets.js
│   │   │   ├── index.js
│   │   │   ├── scene_box.css
│   │   │   ├── Stories.js
│   │   │   ├── stripe.css
│   │   │   └── style.css
│   │   ├── buttons
│   │   ├── charts
│   │   ├── dashboard
│   │   ├── icons
│   │   ├── logs
│   │   ├── notifications
│   │   ├── pages
│   │   ├── theme
│   │   ├── users
│   │   ├── widgets
│   │   └── UserLanding.js
│   ├── App.js
│   ├── index.js
│   ├── ployfill.js
│   ├── routes.js
│   ├── store.js
│   └── serviceWorker.js
├── .eslintcache
├── .gitignore
├── jsconfig.json
├── package.json
└── Readme.md
````