import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

/**
 * Middleware to authenticate if the JWT token passed in the request is valid.
 */
export function authenticateJWTToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token = req.headers['authorization']

	if (token == null) {
		return res.status(401).json({
			message: 'Error: invalid token.'
		})
	}

	const secretJWTKey = process.env.ACCESS_TOKEN_SECRET

	if (secretJWTKey === undefined) {
		return res.status(500).json({
			message: 'Error: Secret JWT key was not defined'
		})
	}

	jwt.verify(token, secretJWTKey as string, function (err, data) {
		if (err) {
			return res.status(403).json({
				message: 'Error: Invalid token'
			})
		}

		// Add user data to the request body
		req.body.user = data
		next()
	})
}
