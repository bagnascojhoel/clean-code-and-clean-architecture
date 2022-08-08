import axios from "axios"
import ErrorDto from "../../../../../src/infrastructure/rest/dto/ErrorDto"
import { down, FAKE_REST_API_URL, up } from "./fakeRestApi"

describe('Infrastructure > RestPresentation > ErrorHandling', () => {

    beforeAll(async () => {
        await up()
    })

    afterAll(async () => {
        await down()
    })

    it('Should handle not found', async () => {
        await axios.get(`${FAKE_REST_API_URL}/not-found-url`).catch(err => {
            expect(err.response?.status).toBe(404)
            expect(err.response?.data).toEqual(ErrorDto.of(`Cannot GET /api/not-found-url`, 404))
        })
    })
})