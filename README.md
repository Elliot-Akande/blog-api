# Restful Blog API

This is a simple and lightweight RESTful API for creating and managing blog posts. It uses Nodejs, Express, MongoDB, and JWT for authorization. The project was created to practice use of the RESTful methodology and Json Web Tokens.

## Features

- **Blog Post Management**: Authors can Create, Read, Update, and Delete blog posts with any user being able to Read published blog posts and comments. Each blog post has a title, content, author, timestamp, and published status.
- **Commenting System**: Add comments to blog posts with a custom username. You can get all the comments on a specific blog post by it's id.
- **Authentication and Authorization**: Register and login as an author with a username and password. You will receive a JWT on login that can be used for authorization on subsequent requests. The full suite of CRUD operations can only be performed on an author's own blog posts.
- **Input Validation and Sanitization**: Validate and sanitize user input to prevent malicious attacks and ensure data integrity. Appropriate error messages are sent if recieved input is invalid or malformed.

## Installation

To install the project, you need to have Node.js and MongoDB installed on your system. Then, clone this repository and run the following commands in the project directory:

```bash
# Install dependencies
npm install

# Start the server
npm start
```

The server will run on `http://localhost:3000` by default. You can change the port and other configurations in the `www.js` file.

## Usage

The API supports the following endpoints:

### Blog Posts

- `POST /posts` - Create a new blog post. Requires `title` and `content` fields in request body. You need to be authenticated by providing a valid JWT in the request header. The response will return the created post with an id, author, timestamp, and isPublished status.
- `GET /posts/public` - Get all the published blog posts. The response will return an array of posts with their details.
- `GET /posts/:post_id` - Get a specific blog post by its id. You do not need to be authenticated if the post is published. If the post is unpublished, you must be the author of the post and provide a valid JWT in the request header. The response will return the blog post details.
- `GET /author/:author_id/posts` - Get all the blog posts by a specific author. You must be the author and provide a valid JWT in the request header. The response will return an array of posts with their details.
- `PUT /posts/:post_id` - Update a specific blog post by its id. Requires `title`, `content` and `isPublished` fields in request body. You must be the author of the post and provide a valid JWT in the request header. The response will return the updated post details.
- `DELETE /posts/:post_id` - Delete a specific blog post by its id. You must be the author of the post and provide a valid JWT in the request header.

### Comments

- `POST /posts/:post_id/comments` - Create a new comment on a specific blog post. You do not need to be authenticated for this endpoint. Requires `author` (custom username string, not reference to Author) and `content` fields in request body. The response will return the created comment's details.
- `GET /posts/:post_id/comments` - Get all the comments on a specific blog post. The response will return an array of comments with their details.

### Authentication

- `POST /login` - Login as an author. Requires `username` and `password` fields in request body. The response will return a JWT that you can use for subsequent requests that require authorization.
- `POST /signup` - Signup as a new author. Requires `username`, `password` and `passwordConfirmation` fields in request body.
