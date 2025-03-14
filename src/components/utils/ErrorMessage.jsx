import { cn } from '@heroui/theme'
import PropTypes from 'prop-types'
import { BiError } from 'react-icons/bi'

const ErrorMessage = ({ message, size = 'md' }) => {
    return (
        <div className="my-16 flex flex-col justify-center items-center">
            <BiError
                className={cn('text-red-500', {
                    'text-4xl': size === 'sm',
                    'text-6xl': size === 'md',
                    'text-9xl': size === 'lg',
                })}
            />
            <p className="text-red-500 font-bold">{message}</p>
        </div>
    )
}

export default ErrorMessage
ErrorMessage.propTypes = {
    message: PropTypes.string,
    size: PropTypes.string,
}
