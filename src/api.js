import axios from "axios";

export function searchRepo(search, page) {
    if (search === '') {
        search = 'stars:>100'
        page = 1
    }
    return axios.get('https://api.github.com/search/repositories', {
        params: {
            q: search,
            sort: 'stars',
            per_page: 10,
            page: page,
        }
    }).then(res => res.data);
}
