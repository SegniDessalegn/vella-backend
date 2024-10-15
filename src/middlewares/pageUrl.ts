import type {
	Request,
	Response,
	NextFunction,
} from "express";
import { cleanUrl } from "../utils/url";

/**
 * Middleware function to handle 404 Not Found errors.
 * This middleware is called when a requested resource cannot be found.
 *
 * @param req - The incoming request object.
 * @param res - The outgoing response object.
 * @param next - The next middleware function in the stack.
 * @returns void
 */
export default function pageUrl(
	req: Request,
	res: Response,
	next: NextFunction,
): void {
	/**
	 * Create a new NotFoundError with a descriptive message
	 * including the original requested URL.
	 */

	if (req.body.url) {
		req.body.url = cleanUrl(req.body.url);
	}

	next();
}
