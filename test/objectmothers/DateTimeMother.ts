import { DateTime } from "luxon";

function createDouglasBirthday(): DateTime {
    return DateTime.fromISO('2022-01-01');
}

export default { createDouglasBirthday }