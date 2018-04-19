const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [
	{
		_id: userOneId,
		email: 'user1@example.com',
		password: 'user1pwd',
		tokens: [
			{
				access: 'auth',
				token: jwt.sign({ _id: userOneId, access: 'auth' }, process.env.JWT_SECRET_KEY).toString()
			}
		]
	},
	{
		_id: userTwoId,
		email: 'user2@example.com',
		password: 'user2pwd',
		tokens: [
			{
				access: 'auth',
				token: jwt.sign({ _id: userTwoId, access: 'auth' }, process.env.JWT_SECRET_KEY).toString()
			}
		]
	}
];

// Create dummy todos
const todos = [
	{
		_id: new ObjectID(),
		text: 'First test todo',
		completed: false,
		_creator: userOneId
	},
	{
		_id: new ObjectID(),
		text: 'Second test todo',
		completed: true,
		completedAt: 12345,
		_creator: userTwoId
	}
];

const populateTodos = (done) => {
	/**
	 * Models and collections are pretty much the same as a model represents a collection
	 * and an instance of a model represents a single document.
	 * The difference is that calling methods (e.g. Model.create) on your model
	 * will invoke any validation and hooks you wrote.
	 *
	 * --> That's why Todo.remove() deletes all the todos
	 */
	Todo.remove({}).then(() => {
		// Add the dummy todos to database
		return Todo.insertMany(todos);
	}).then(() => done());
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		const user1 = new User(users[0]).save();
		const user2 = new User(users[1]).save();

		return Promise.all([user1, user2]);
	}).then(() => done());
};


module.exports = { todos, populateTodos, users, populateUsers };