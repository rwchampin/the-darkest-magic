export interface UseErrorOptions {
    /**
     * Details about error
     *
     * @param true
     */
    statusMessage: String
    /**
     * Error code
     *
     * @param true
     */
    statusCode: Number
}
export const useError = ( options:UseErrorOptions) => {
    throw createError({
        statusCode: options.statusCode,
        statusMessage: options.statusMessage,
    })
}