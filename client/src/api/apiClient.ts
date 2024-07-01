import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:3000/transactions/'
})
export const apiClientUser = axios.create({
  baseURL: 'http://localhost:3000/user/'
})

export enum ApiMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export enum ApiEndpoint {
  LOGIN = '/login',
  TRANSACTIONS = '/transactions',
  PAGINATION = '/pagination',
  FILTRATED = '/filtered',
  PAGINATION_FILTRATED = '/pagination/filtered',
  DOWNLOAD = '/download',
  USER = '/user'
}
