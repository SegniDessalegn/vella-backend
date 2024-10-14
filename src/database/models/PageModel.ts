import { Document, model, Schema } from "mongoose";

/**
 * Interface representing the Page document structure in MongoDB.
 * Extends the Mongoose Document interface to include custom fields.
 */
export interface IPage extends Document {
	/**
	 * Page of the page.
	 * @type {string}
	 * @required true
	 */
	page: string;

	/**
	 * The URL of the page, used as the _id in MongoDB.
	 * @type {string}
	 * @required true
	 */
	_id: string; // Use _id instead of url

	/**
	 * A description of the page.
	 * @type {string}
	 * @required false
	 */
	description?: string; // Optional field
}

/**
 * Schema definition for the Page model.
 * This defines the structure of the documents within the 'pages' collection.
 */
const pageSchema = new Schema<IPage>({
	/**
	 * _id field (using url as the unique identifier).
	 */
	_id: {
		type: String,
		required: true, // URL (used as _id) is required
	},

	/**
	 * Page field configuration.
	 */
	page: {
		type: String,
		required: true, // Page is required
	},

	/**
	 * Description field configuration.
	 */
	description: {
		type: String,
		required: false, // Description is optional
	},
});

/**
 * Mongoose model for the Page schema.
 * This model is associated with the 'pages' collection in MongoDB.
 */
const PageModel = model<IPage>(
	"Page", // Name of the model
	pageSchema, // Schema used for the model
	"pages", // Name of the MongoDB collection
);

/**
 * Export the Page model for use in other parts of the application.
 */
export default PageModel;