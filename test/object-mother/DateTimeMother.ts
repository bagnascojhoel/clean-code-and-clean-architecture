import { DateTime } from "luxon";

function createDouglasBirthdayAt2022(): DateTime {
    return DateTime.fromISO('2022-01-01');
}

export default { createDouglasBirthdayAt2022 }