import { User } from '../services/users'
import { useEffect } from 'react'
import { useQuery, useMutation } from "@tanstack/react-query"

const userService = new User()

type UseValidation = {
    updateToken: (token: string) => void
}

type UseUserData = {
    token: string
}

export const useValidation = ({ updateToken }: UseValidation) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['user', 'validate'],
        mutationFn: userService.validate,

        onError: () => {
            console.error('Internal error, please try again')
        },
        onSuccess: (data) => {
            data.success || console.error(`Failed to validate user, message: ${data.error.message}`)
            data.success && updateToken(data.result.token)
        } 
    })

    return {
        signIn: mutate,
        isPending
    }
}

export const useUserData = ({ token }: UseUserData) => {

    const { data, isPending, isLoading, isError, refetch } = useQuery({
        queryKey: ['user', 'data', token],
        queryFn: ({ queryKey }) => userService.getData({ token: queryKey[2] }),
        
        staleTime: Infinity,
        enabled: token !== ''
    })

    useEffect(() => {
        
        if(isError) {
            console.error('Internal error, please try again')
        }

        if(!isError && !isLoading && !isPending && !data.success) {
            console.error(`Failed to get user data, message: ${data.error.message}`)
        }

    }, [isPending, isLoading, isError, data])

    return {
        userData: data?.success ? data.result.data[0] : null,
        refetchUser: refetch
    }
}