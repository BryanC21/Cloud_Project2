export const isEmpty = obj => {
    return Object.keys(obj).length === 0;
}


export const createUrl = url => {
    var url = new URL(window.location.origin + url);
    const searchParams = new URLSearchParams(document.location.search);
    const restaurant_id = searchParams.get('restaurant_id');
    const table_id = searchParams.get('table_id');
    if (restaurant_id) {
        url.searchParams.append('restaurant_id', restaurant_id);
    }
    if (table_id) {
        url.searchParams.append('table_id', restaurant_id);
    }
    return url.href;
}