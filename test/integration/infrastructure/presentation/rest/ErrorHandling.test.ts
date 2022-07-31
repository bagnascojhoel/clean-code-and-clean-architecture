import axios from "axios"
import ErrorDto from "../../../../../src/presentation/rest/dto/ErrorDto"
import { SERVER_URL } from "./constants"

describe('Presentation > Rest > ErrorHandling', () => {
    it('Should handle not found', async () => {
        await axios.get(`${SERVER_URL}/not-found-url`).catch(err => {
            expect(err.response?.status).toBe(404)
            expect(err.response?.data).toEqual(ErrorDto.of(`Cannot GET /api/not-found-url`, 404))
        })
    })
})