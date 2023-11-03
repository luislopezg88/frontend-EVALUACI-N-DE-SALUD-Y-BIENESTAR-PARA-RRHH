export const converDatetoString = (date: Date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month <= 9 ? '0' + month : month}-${day <= 9 ? '0' + day : day}`
}