// ** Core JWT Import
import useJwt from '@src/@core/auth/jwt/useJwt'
import JwtConfig from './JwtConfig'

const { jwt } = useJwt({})

export default jwt
