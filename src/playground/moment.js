import moment from 'moment';

const date = moment(0);
const dateBefore = moment(0).subtract(4, 'days').valueOf();
const dateAfter = moment(0).add(4, 'days').valueOf();

console.log(
    'isBefore', date, moment(dateBefore), date.isSameOrBefore(moment(dateBefore))
);

console.log(
    'isAfter', date, moment(dateAfter), date.isSameOrAfter(moment(dateAfter))
);
