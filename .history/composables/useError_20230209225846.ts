export interface UseErrorOptions {
    /**
     * Details about error
     *
     * @param true
     */
    statusMessage: string
    /**
     * Error code
     *
     * @param true
     */
    statusCode: number
}
export const useError = (options: UseErrorOptions) => {
    throw createError({
        statusCode: options.statusCode,
        statusMessage: options.statusMessage,
    })
}