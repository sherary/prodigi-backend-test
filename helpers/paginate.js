module.exports = (objects, page) => {
    if (typeof page == 'undefined') {
        page = 1
    }
    const startPage = (page - 1) * 10;
    const endPage = page * 10;
    const result = objects.slice(startPage, endPage);
    
    if (objects.length > 10) {
        return objects = result
    }

    return objects
}