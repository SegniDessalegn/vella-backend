import ExampleModel, {
	IExample,
} from "../database/models/ExampleModel"; // Import the Example model and interface
import PageModel, { IPage } from '../database/models/PageModel';
import logger from "../utils/logger"; // Import the logger for logging errors

/**
 * Controller class for managing Example operations.
 */
export default class ExampleController {
	/**
	 * Fetches all Example documents from the pagebase.
	 * @returns A promise that resolves to an array of IExample objects.
	 * @throws Will throw an error if the retrieval fails.
	 */
	public static async getAll(): Promise<IExample[]> {
		try {
			// Attempt to fetch all documents from the ExampleModel
			const pages = await ExampleModel.find<IExample>();
			return pages; // Return the fetched page
		} catch (err) {
			// Log an error message with additional context
			logger.error(
				`Failed to fetch Examples: ${(err as Error).message}`,
			);
			throw err; // Re-throw the error for further handling
		}
	}
}
