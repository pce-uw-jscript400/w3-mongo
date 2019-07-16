# MongoDB

By the end of this lesson, you should be able to connect to a non-relational database (MongoDB) and perform basic CRUD operations.

## Core Learning Objective

*	Interact with a document database

## Sub-Objectives

* Connect to a MongoDB database with Mongoose
* Perform basic CRUD operations on the database
* Build and run specific queries
* Validate schemas
* Model complex application ideas using embedded data models

## Installation

1. Fork & clone

1. `cp nodemon.sample.json nodemon.json`

1. Create a new Cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) titled something like `general-purpose` or reuse one you already have.

1. Update the `MONGO_DB_CONNECTION` in your `nodemon.json` file with the full connection string. Make sure you include the password you set up for the database and change the name of the database from `test` to something lke `television_characters_dev`.

1. `npm install`

1. `npm run dev`

Once installation is working, try creating and requesting resources. Note that there is currently no validation set up.

### Instructions & Guiding Questions

- [ ] Take a moment to look through the code that already exists in this repository. Run the code and test out each route, ensuring it does what you expect.

---

- [ ] We will be using both [mongoose](https://mongoosejs.com/docs/guide.html) and [mongodb](https://docs.mongodb.com/manual/) to build this project. Open up each project's documentation.

* **Question:** What is the difference between mongoose and mongodb?

* **Your Answer:**

mongodb is the database and mongoose allows us to access the data in the database without writing SQL.

---

- [ ] MongoDB uses a number of terms that may be to new to you such as database, collection, and document.

* **Question:** What is the difference between the above terms? [This page](https://docs.mongodb.com/manual/core/databases-and-collections/) may help.

* **Your Answer:**

database - something that has a number of collections in it.
collection - collections is the mongodb version of a table and has many documents.
document - a document is a single record.

---

- [ ] Create a new file with the path of `api/models/series.js`. In that file, [define the schema](https://mongoosejs.com/docs/guide.html#definition) for a television series. Include the fields "title", "start_year", and "season_count".

* **Question:** Where does `String` and `Number` come from?

* **Your Answer:**

This is like a create table statement in SQL where you would define the type of value in a field.

---

- [ ] Merge the following into your schema:
  ```js
  {
    _id: Schema.Types.ObjectId
  }
  ```

* **Question:** Describe what the above code is adding to your schema.

* **Your Answer:**

It's adding a primary key. 

---

- [ ] Remove the line we just added from your schema.

* **Question:** If we create a new document, will there be an ID? Why or why not?

* **Your Answer:**

Yes since it automatically adds an id.

---

- [ ] Add the following object as the _second argument_ to the `new Schema()` statement.
  ```js
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
  ```

* **Question:** Describe what the above code is adding to your schema.

* **Your Answer:**

It adds information on when something was created and each time it was updated. Also changing from camel case to snake case. 

---

- [ ] Import the model into your `routes/series.js` file. Use either basic promises or `async/await` to update the `GET /` method to retrieve from the database instead of the given array. [This page](https://mongoosejs.com/docs/documents.html) or [this page](https://mongoosejs.com/docs/api.html#Model) may be useful.

* **Question:** What method do you use to return all documents from a collection?

* **Your Answer:**

`.find()`

---

- [ ] Update the API so that you can create documents in the database. You may either use the `<document>.save()` method or the `Model.create()` method.

* **Question:** What happens if you do not include all the fields as specified in the schema?

* **Your Answer:**

If the fields aren't required then the object is still created without those fields.

---

- [ ] Take a moment to view your new document in the MongoDB Atlas console.

---

- [ ] Update the API so that you retrieve a document by ID.

* **Question:** There are a couple different ways to accomplish this goal. Which method did you choose?

* **Your Answer:**

`Series.findByID(req.params.id)`

---

- [ ] Update the API so that you are able to update a document. Use the [Model.updateOne()](https://mongoosejs.com/docs/api.html#model_Model.updateOne) method.

* **Question:** What are the arguments for `Model.updateOne()`?

* **Your Answer:**

There are three parameters for `Model.updateOne()`; filter, doc and options.

* **Question:** The response you receive is _not_ the document you updated. What information is being represented here? Try replacing `Model.updateOne()` with the [Model.findOneAndUpdate()](https://mongoosejs.com/docs/api.html#model_Model.findOneAndUpdate) and see the difference in the result.

* **Your Answer:**



* **Question:** This new method will return the _old document_ instead of the new one. What option can you add to your statement to return the new one?

* **Your Answer:**

`{new: true}`

* **Question:** Another field was updated when you ran this command. Which one was it?

* **Your Answer:**

updated_at

* **Question:** Take a look at the terminal window running your server. You are likely getting the following deprecation warning:
  ```
  DeprecationWarning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-
  ```
  Take a look [at this page](https://mongoosejs.com/docs/deprecations#findandmodify) to see how to fix it. Describe the changes that took place.

* **Your Answer:**

`useFindAndModify: false`

---

- [ ] Update the API so that you can successfully delete a record. Use the [Model.findOneAndDelete()](https://mongoosejs.com/docs/api.html#model_Model.findOneAndDelete) method.

---

- [ ] A lot of information is being returned on each request. Some of this information we may want to keep private. Using the [.select()](https://mongoosejs.com/docs/api.html#query_Query-select) method, return only the "_id", "title", "start_year", and "season_count" on all the above requests.

* **Question:** At least one of these will throw an error. Which one? How can you get around this issue?

* **Your Answer:** 

.select(`title start_year`)

---

- [ ] Modify your `GET /api/series` route so that you can search through the content based off of query parameters. For example, if your request was `GET /api/series?start_year=1997`, it would return all series that start in 1997.

---

- [ ] At the moment, there is no validation set on creating any series. Add validation so that each of the three fields are required in order to post to series. Handle any errors that arise with a status code 400 and a brief, standardized message.

* **Question:** You may notice that you can add custom error messages to individual fields failing. Try adding these and take a look at the error message received. How can you make use of those specific messages for each field?

* **Your Answer:**

The error message from each of these fields can be used to create more specific messages for a user who inputs incorrect information.

---

- [ ] With Mongo, it is simple to create complex data structures. Add a `characters` field to your Series model that is an array of objects. Each object should have a `name` and `image_url`. Only the `name` field on the character should be required. _Note: Don't forget to change your select statements to include the `characters` field!_

* **Question:** Take a look at the response from making a new series with a character. What field was created that you did not have to define?

* **Your Answer:**

It created an _id field for the actor.

* **Question:** With the current routes that we have, how would you upate the name of a character in a series?

* **Your Answer:**

use the PUT route to update a character.

---

- [ ] While we can now update [subdocuments](https://mongoosejs.com/docs/subdocs.html), it is difficult to make changes that only relate to a single subdocument. To do so, we should make a new set of routes that relates to characters. Start by creating a `GET ALL` route for characters. The route will look something like the following and will return only the list of characters:
  ```
  GET /api/series/:seriesID/characters
  ```

* **Question:** Where did you decide to put this route and why?

* **Your Answer:**



---

Spend the rest of class building out the other routes for characters. A few notes to help:

* It's worth reading the [subdocument](https://mongoosejs.com/docs/subdocs.html) documentation in full
* Take note of the `.id()` method for finding subdocuments by id
* Note that in order to save subdocuments, you will need to save the parent record; in our case, you should be calling `series.save()`, _not_ `character.save()`


If you're interested in going further, I would recommend looking into [references](https://mongoosejs.com/docs/populate.html).

## Resources

* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
* [Mongoose](https://mongoosejs.com/)