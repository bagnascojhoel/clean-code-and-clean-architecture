export default class ErrorDto {
    private constructor(readonly message: string, readonly httpStatus: number) {
        if (httpStatus < 100 || httpStatus > 599) throw new Error('Invalid HTTP status')
    }

    public static of(message: string, httpStatus: number): ErrorDto {
        return new ErrorDto(message, httpStatus)
    }
}
