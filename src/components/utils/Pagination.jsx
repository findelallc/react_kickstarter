import { Button, Input } from "@heroui/react";

export const Pagination = ({ setPagination, config = { skip: 0, lastDataCount: 0, take: 3, setter: false } }) => {

    return <>
        <div className="flex justify-center gap-2 mt-10 mx-auto w-[150px]">
            <Input label="" variant="solid" classNames={{ input: 'bg-white', inputWrapper: 'bg-white my-auto border-2 w-[100px]' }}
                placeholder="Page Size" type="number" value={config.take}
                onChange={(e) => setPagination({ ...config, take: parseInt(e.target.value) })} />
            <Button isDisabled={config.take > config.lastDataCount}
                color="primary"
                onPress={() => setPagination({
                    ...config,
                    skip: parseInt(config.skip) + parseInt(config.take),
                    take: config.take, setter: true
                })}
                className="my-auto font-bold">Load</Button>
        </div>
    </>
}