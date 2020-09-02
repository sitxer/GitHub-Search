import axios from 'axios'

export function searchRepo(search, page, perPage) {
    if (search === '') {
        search = 'stars:>100'
    }
    return axios
        .get('https://api.github.com/search/repositories', {
            params: {
                q: search,
                sort: 'stars',
                per_page: perPage,
                page,
            },
        })
        .then((res) => res.data)
}
