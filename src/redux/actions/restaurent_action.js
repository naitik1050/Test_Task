import axios from 'axios';

const headers = {
    'Content-Type': 'application/json',
}

export async function restaurantList() {
    return axios.get(`http://205.134.254.135/~mobile/interview/public/api/restaurants_list`)
}
