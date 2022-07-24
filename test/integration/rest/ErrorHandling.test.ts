import axios from "axios"
import ErrorDto from "../../../src/infra/rest/dto/ErrorDto"
import { SERVER_URL } from "./constants"

it('Should handle not found', async () => {
    axios.get(`${SERVER_URL}/not-found-url`).catch(err => {
        expect(err.response.status).toBe(404)
        expect(err.response.data).toEqual(ErrorDto.of(`Cannot GET /api/not-found-url`, 404))
    })
})