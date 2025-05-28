/**
 * A collection of utility functions for performing Vector3 operations.
 * This object acts as a namespace for Vector3 related helper methods.
 * @namespace Vector3utils
 */
export const Vector3utils = {
	/**
	 * A constant representing the zero vector {x:0, y:0, z:0}.
	 * @type {{x: number, y: number, z: number}}
	 */
	vector3Zero: {x:0,y:0,z:0},
	/**
	 * Checks if the provided object is a valid Vector3 (has x, y, z as numbers).
	 * @param {{x: number, y: number, z: number}} vector - The vector to validate.
	 * @returns {boolean} - True if valid, false otherwise.
	 */
	isValidVector3(vector){
		if(isNaN(vector.x) || isNaN(vector.y) || isNaN(vector.z)) return false;
		else return true;
	},
	/**
	 * Subtracts vector `b` from vector `a`.
	 * Note: The method name "substract" is a common misspelling of "subtract".
	 * @param {{x: number, y: number, z: number}} a - The first vector.
	 * @param {{x: number, y: number, z: number}} b - The second vector, to be subtracted from `a`.
	 * @returns {{x: number, y: number, z: number}} - The resulting vector.
	 * @throws {TypeError} - If either `a` or `b` is not a valid Vector3.
	 */
	substract(a,b){
		if(!this.isValidVector3(a) || !this.isValidVector3(b)) throw TypeError("Arguments 'a' and/or 'b' provided weren't valid vector3");
		return{
			x: a.x - b.x,
			y: a.y - b.y,
			z: a.z - b.z
		}
	},
	/**
	 * Calculates the magnitude (length) of a vector.
	 * @param {{x: number, y: number, z: number}} xyz - The vector.
	 * @returns {number} - The magnitude of the vector.
	 * @throws {TypeError} - If `xyz` is not a valid Vector3.
	 */
	magnitude(xyz){
		if(!this.isValidVector3(xyz)) throw TypeError("Argument xyz provided wasn't a valid vector3");
		const {x,y,z} = xyz;
		return Math.sqrt(x**2 + y**2 + z**2);
	},
	/**
	 * Calculates the Euclidean distance between two vectors.
	 * @param {{x: number, y: number, z: number}} from - The starting vector.
	 * @param {{x: number, y: number, z: number}} to - The ending vector.
	 * @returns {number} - The distance between the two vectors.
	 * @throws {TypeError} - If either `from` or `to` is not a valid Vector3.
	 */
	distanceTo(from,to){
		if(!this.isValidVector3(from) || !this.isValidVector3(to)) throw TypeError("Arguments 'from' and/or 'to' provided weren't valid vector3");
		const newVector = this.substract(from, to);
		const distance = this.magnitude(newVector);
		return distance;
	},
	/**
	 * Normalizes a vector (scales it to a magnitude of 1).
	 * Returns a zero vector if the input is a zero vector.
	 * @param {{x: number, y: number, z: number}} xyz - The vector to normalize.
	 * @returns {{x: number, y: number, z: number}} - The normalized vector.
	 * @throws {TypeError} - If `xyz` is not a valid Vector3.
	 */
	normalize(xyz){
		if(!this.isValidVector3(xyz)) throw TypeError("Argument xyz provided wasn't a valid vector3");
		const {x,y,z} = xyz;
		const magnitude = Math.sqrt(x * x + y * y + z * z);
		if (magnitude === 0) return { x: 0, y: 0, z: 0 };
		return {
		  x: x / magnitude,
		  y: y / magnitude,
		  z: z / magnitude
		};
	}
}