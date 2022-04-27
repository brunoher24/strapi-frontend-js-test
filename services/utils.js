const UTILS = {
    formatFrenchDate(dateStr) {
        const splitedDate = dateStr.split('T');
        const date_ = splitedDate[0].split('-').reverse().join('-');
        const time_ = splitedDate[1].split('.')[0];
        return `le ${date_} à ${time_}`;
    }
}