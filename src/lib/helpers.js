export const paginatorPages = (meta) => {

    if (meta?.current_page === 1) {
        if (meta?.last_page >= 3) {
            return [1, 2, 3];
        }

        let pages = [meta?.current_page];
        
        for (let i = meta?.current_page; i <= meta?.last_page; i++) {
            if (
                (pages.length >= 3) 
                || 
                ((i + 1) > meta?.last_page)
            ) break;
            
            console.log('pushing', i + 1);
            pages.push(i + 1);
        }

        return pages;
    } 

    else if (meta?.current_page === meta?.last_page) {
        if (meta?.last_page >= 3) {
            return [meta?.last_page - 2, meta?.last_page - 1, meta?.last_page] ;
        }
        
        let pages = [];
        
        for (let i = meta?.last_page; i >= meta?.current_page; i--) {
            if (pages.length >= 3 || i < meta?.current_page) break;

            pages.push(i - 1);
        }

        pages.push(meta?.last_page);

        return pages;
    }

    else {
        return [meta?.current_page - 1, meta?.current_page , meta?.current_page + 1];
    }
}