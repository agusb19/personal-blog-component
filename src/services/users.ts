import { addPath, PATHS, API_URL } from '../utils/config'
import type { IUser, UserInfo, UserResponse } from '../types/users'

export class User implements IUser {
    url: string

    constructor() {
        this.url = addPath(PATHS.USER, API_URL)
    }

    getData = async ({ token }: UserInfo['token']) => {
        const url = addPath('/data', this.url)
                
        const options = {
            headers: new Headers({'Authorization': `Bearer ${token}`}),
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['data']
    }

    validate = async ({ api_key }: UserInfo['apiKey']) => {
        const url = addPath('/key', this.url)
        
        const options = {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({ api_key })
        }

        const response = await fetch(url, options)
        return await response.json() as UserResponse['token']
    }
}