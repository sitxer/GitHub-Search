import axios from 'axios'

export function searchRepo(search, page, perPage) {
    return axios
        .get('https://api.github.com/search/repositories', {
            params: {
                q: search === '' ? 'stars:>100' : `${search} in:name`,
                sort: 'stars',
                per_page: perPage,
                page,
            },
        })
        .then((res) => res.data)
}

export function getRepo(owner, repo) {
    return axios.get(`https://api.github.com/repos/${owner}/${repo}`).then((res) => res.data)
}
