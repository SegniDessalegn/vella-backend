import PageModel, { IPage } from '../database/models/PageModel';
import logger from "../utils/logger"; // Import the logger for logging errors

/**
 * Controller class for managing Page operations.
 */
export default class PageController {
    /**
     * Fetches all Page documents from the database.
     * @returns A promise that resolves to an array of IPage objects.
     * @throws Will throw an error if the retrieval fails.
     */
    public static async getAll(): Promise<IPage[]> {
        try {
            const pages = await PageModel.find<IPage>();
            return pages;
        } catch (err) {
            logger.error(`Failed to fetch pages: ${(err as Error).message}`);
            throw err;
        }
    }

    /**
     * Fetches a single Page document by its URL (_id).
     * @param pageId - The URL of the page to retrieve.
     * @returns A promise that resolves to the IPage object or null if not found.
     * @throws Will throw an error if the retrieval fails.
     */
    public static async getPageById(pageId: string): Promise<IPage | null> {
        try {
            const page = await PageModel.findById(pageId);
            return page;
        } catch (err) {
            logger.error(`Failed to fetch the page with ID ${pageId}: ${(err as Error).message}`);
            throw err;
        }
    }

    /**
     * Creates a new Page document.
     * @param page - The page title.
     * @param url - The URL of the page (used as _id).
     * @param description - Optional description of the page.
     * @returns A promise that resolves to the newly created IPage object.
     * @throws Will throw an error if creation fails (e.g., duplicate URL).
     */
    public static async createPage(page: string, url: string, description?: string): Promise<IPage> {
        try {
            const newPage = await PageModel.create({ page, _id: url, description });
            return newPage;
        } catch (err) {
            logger.error(`Failed to create a new page with URL ${url}: ${(err as Error).message}`);
            throw err;
        }
    }

    /**
     * Updates an existing Page document.
     * Note: The URL (_id) cannot be updated. To change the URL, delete the old document and create a new one.
     * @param pageId - The current URL of the page to update.
     * @param page - The new page title.
     * @param description - The new description of the page.
     * @returns A promise that resolves to the updated IPage object or null if not found.
     * @throws Will throw an error if the update fails.
     */
    public static async updatePage(pageId: string, page: string, description?: string): Promise<IPage | null> {
        try {
            const updatedPage = await PageModel.findByIdAndUpdate(
                pageId,
                { page, description },
                { new: true, runValidators: true }
            );
            return updatedPage;
        } catch (err) {
            logger.error(`Failed to update the page with ID ${pageId}: ${(err as Error).message}`);
            throw err;
        }
    }

    /**
     * Updates the URL of an existing Page document by deleting the old document and creating a new one.
     * @param oldUrl - The current URL of the page.
     * @param newPageData - An object containing the new page data, including the new URL.
     * @returns A promise that resolves to the newly created IPage object.
     * @throws Will throw an error if the operation fails.
     */
    public static async updatePageUrl(oldUrl: string, newPageData: { page: string; url: string; description?: string }): Promise<IPage> {
        const session = await PageModel.startSession();
        session.startTransaction();
        try {
            // Delete the old document
            const deletedPage = await PageModel.findByIdAndDelete(oldUrl).session(session);
            if (!deletedPage) {
                throw new Error(`Page with URL ${oldUrl} does not exist.`);
            }

            // Create a new document with the updated URL
            const newPage = await PageModel.create([{
                _id: newPageData.url,
                page: newPageData.page,
                description: newPageData.description,
            }], { session });

            await session.commitTransaction();
            session.endSession();

            return newPage[0];
        } catch (err) {
            await session.abortTransaction();
            session.endSession();
            logger.error(`Failed to update the page URL from ${oldUrl} to ${newPageData.url}: ${(err as Error).message}`);
            throw err;
        }
    }

    /**
     * Deletes a Page document by its URL (_id).
     * @param pageId - The URL of the page to delete.
     * @returns A promise that resolves to the deleted IPage object or null if not found.
     * @throws Will throw an error if the deletion fails.
     */
    public static async deletePage(pageId: string): Promise<IPage | null> {
        try {
            const deletedPage = await PageModel.findByIdAndDelete(pageId);
            return deletedPage;
        } catch (err) {
            logger.error(`Failed to delete the page with ID ${pageId}: ${(err as Error).message}`);
            throw err;
        }
    }
}