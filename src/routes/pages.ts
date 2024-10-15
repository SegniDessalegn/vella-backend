import type {
	Request,
	Response,
	NextFunction,
} from "express";
import ServerFailedError from "../errors/ServerFailedError";
import { IDataResponse } from "../types/response";
import { IPage } from "../database/models/PageModel";
import PageController from "../controllers/PageController";
import { cleanUrl } from "../utils/url";

/**
 * Handles GET requests to retrieve pages from the PageController.
 * This function attempts to fetch all pages and returns them in the response.
 *
 * @param req - The HTTP request object.
 * @param res - The HTTP response object.
 * @param next - The next middleware function in the stack.
 * @returns A response with the retrieved pages or an error if the operation fails.
 */
export async function getPages(
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<Response | void> {
	try {
		// Fetch all pages from the PageController
		const data = await PageController.getAll();

		// Create a response object with the retrieved data
		const response: IDataResponse<IPage[]> = {
			message: "Pages retrieved successfully",
			status: "success",
			data: data,
		};

		// Send the response with the data and a 200 status code
		return res.status(200).json(response);
	} catch {
		// If an error occurs, pass a new ServerFailedError to the next middleware
		return next(
			new ServerFailedError("Failed to retrieve pages."),
		);
	}
}

export async function getPage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    try {
        const data = await PageController.getPageById(cleanUrl(req.params[0]));

        // Create a response object with the retrieved data
        const response: IDataResponse<IPage | null> = {
            message: "Page retrieved successfully",
            status: "success",
            data: data,
        };

        // Send the response with the data and a 200 status code
        return res.status(200).json(response);
    } catch {
        // If an error occurs, pass a new ServerFailedError to the next middleware
        return next(
            new ServerFailedError("Failed to retrieve page."),
        );
    }
}

export async function createPage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    try {
        // Fetch all pages from the PageController
        const data = await PageController.createPage(req.body.page, req.body.url, req.body.description);

        // Create a response object with the retrieved data
        const response: IDataResponse<IPage> = {
            message: "Page created successfully",
            status: "success",
            data: data,
        };

        // Send the response with the data and a 200 status code
        return res.status(200).json(response);
    } catch {
        // If an error occurs, pass a new ServerFailedError to the next middleware
        return next(
            new ServerFailedError("Failed to create page."),
        );
    }
}

export async function updatePage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    try {
        // Fetch all pages from the PageController
        const data = await PageController.updatePage(req.body.page, cleanUrl(req.params[0]), req.body.description);

        // Create a response object with the retrieved data
        const response: IDataResponse<IPage | null> = {
            message: "Page updated successfully",
            status: "success",
            data: data,
        };

        // Send the response with the data and a 200 status code
        return res.status(200).json(response);
    } catch {
        // If an error occurs, pass a new ServerFailedError to the next middleware
        return next(
            new ServerFailedError("Failed to update page."),
        );
    }
}

export async function deletePage(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | void> {
    try {
        // Fetch all pages from the PageController
        const data = await PageController.deletePage(cleanUrl(req.params[0]));

        // Create a response object with the retrieved data
        const response: IDataResponse<IPage | null> = {
            message: "Page deleted successfully",
            status: "success",
            data: data,
        };

        // Send the response with the data and a 200 status code
        return res.status(200).json(response);
    } catch {
        // If an error occurs, pass a new ServerFailedError to the next middleware
        return next(
            new ServerFailedError("Failed to delete page."),
        );
    }
}