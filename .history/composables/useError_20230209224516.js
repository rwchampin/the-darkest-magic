export interface useErrorOptions {
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
export const useError = ({ options }) => {
    throw createError({
        statusCode: options.statusCode,
        statusMessage: options.statusMessage,
    })
}