import { Card, CardBody, cn } from '@heroui/react'
import Icons from './Icons'
import PropTypes from 'prop-types'

export const EmptyList = ({ size = 40, image = false, className }) => {
    return (
        <>
            <Card radius="sm" className={cn(className)}>
                <CardBody className="text-center p-20">
                    <div className="flex justify-center">
                        <Icons.GiEmptyMetalBucketHandle size={size} />
                    </div>
                    <p className="my-4">
                        We have no items to show you at this moment.
                    </p>
                </CardBody>
            </Card>
        </>
    )
}

EmptyList.propTypes = {
    size: PropTypes.number,
    image: PropTypes.bool,
    className: PropTypes.string,
}
