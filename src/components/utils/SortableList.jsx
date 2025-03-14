import { DndContext, closestCenter } from '@dnd-kit/core'
import {
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
    arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
    Card,
    CardBody,
    Chip,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Button,
    cn,
} from '@heroui/react'
import moment from 'moment'
import Icons from './Icons'
import { getRandomColor } from '../../services/utils.service'
import PropTypes from 'prop-types'
import { IoMdEye } from 'react-icons/io'
import QuestionEditor from '../editor/QuestionEditor'

const SortableItem = ({ id, children }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        cursor: 'grab',
    }

    return (
        <Card
            ref={setNodeRef}
            className="my-2 border-1 px-4 dark:border-zinc-800"
            shadow="none"
            style={style}
            {...attributes}
            {...listeners}
            as="div"
            fullWidth
        >
            <CardBody>{children}</CardBody>
        </Card>
    )
}

const SortableList = ({
    items,
    setItems,
    onContextAction,
    viewIcon,
    navigation,
    showDelete,
    showArchive,
    showManage,
}) => {
    /**
     * handle drag event
     * @param {*} event
     * @returns
     */
    const handleDragEnd = (event) => {
        const { active, over } = event

        if (!over || active.id === over.id) return

        const oldIndex = items.findIndex((item) => item.ID === active.id)
        const newIndex = items.findIndex((item) => item.ID === over.id)

        // Call the parent-provided `setItems` with the reordered items
        const updatedItems = arrayMove(items, oldIndex, newIndex)
        setItems(updatedItems)
    }

    const handleCardClick = (id) => {
        if (navigation) {
            navigation(id)
        }
    }

    return (
        <DndContext
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
        >
            <SortableContext
                items={items.map((item) => item.ID)}
                strategy={verticalListSortingStrategy}
            >
                {items.map((item) => (
                    <SortableItem key={item.ID} id={item.ID}>
                        <div className="flex justify-between">
                            <div className="my-auto flex justify-start gap-3">
                                <Icons.RxDragHandleHorizontal
                                    size={22}
                                    className="my-auto"
                                />
                                <div className="my-auto">
                                    <Avatar
                                        isBordered
                                        radius="full"
                                        size="sm"
                                        src={
                                            item.IMAGE ||
                                            `https://ui-avatars.com/api/?background=` +
                                                getRandomColor() +
                                                `&bold=true&rounded=true&font-size=0.4&color=010101&name=` +
                                                item.NAME
                                        }
                                    />
                                </div>
                                <div className="my-auto">
                                    <span className="font-bold">
                                        {item.NAME || item.TITLE}
                                    </span>
                                    <QuestionEditor
                                        description={item.DESCRIPTION}
                                        elId={item.ID}
                                        readOnly={true}
                                        truncateText={true}
                                    />
                                    {/* {item.DESCRIPTION ? (
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                                            {item.DESCRIPTION}
                                        </p>
                                    ) : (
                                        ''
                                    )} */}

                                    <small className="text-themePrimary block text-xs mt-2">
                                        Last updated on{' '}
                                        {moment(item.UPDATED_AT).format('ll')}
                                    </small>
                                </div>
                            </div>
                            <div className="my-auto flex gap-2">
                                <div className="my-auto">
                                    <Chip
                                        size="sm"
                                        classNames={{
                                            content: 'font-bold capitalize',
                                        }}
                                        radius="sm"
                                        color={
                                            ['active', 'true'].includes(
                                                item.STATUS
                                            )
                                                ? 'success'
                                                : 'danger'
                                        }
                                    >
                                        {['active', 'true'].includes(
                                            item.STATUS
                                        )
                                            ? 'active'
                                            : 'inactive'}
                                    </Chip>
                                </div>
                                <div className="my-auto">
                                    {viewIcon && (
                                        <Button
                                            onPress={() =>
                                                handleCardClick(item.ID)
                                            }
                                            size="sm"
                                            isIconOnly
                                            variant="light"
                                        >
                                            <IoMdEye className="text-lg text-secondary" />
                                        </Button>
                                    )}
                                    <Dropdown showArrow shadow="lg">
                                        <DropdownTrigger>
                                            <Button
                                                className="min-w-8 px-2"
                                                variant="light"
                                                size="sm"
                                            >
                                                <Icons.HiDotsVertical
                                                    size={20}
                                                />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu
                                            selectionMode="single"
                                            disallowEmptySelection
                                            onAction={(key) =>
                                                onContextAction(key, item.ID)
                                            }
                                            variant="solid"
                                        >
                                            <DropdownItem
                                                key="manage"
                                                endContent={
                                                    <Icons.HiOutlineWrench
                                                        size={18}
                                                    />
                                                }
                                                className={cn(
                                                    !showManage && 'hidden'
                                                )}
                                            >
                                                Manage
                                            </DropdownItem>

                                            <DropdownItem
                                                key="archive"
                                                endContent={
                                                    <Icons.LuFolderArchive
                                                        size={15}
                                                    />
                                                }
                                                className={cn(
                                                    'text-danger',
                                                    !showArchive && 'hidden'
                                                )}
                                                color="danger"
                                            >
                                                Archive
                                            </DropdownItem>
                                            <DropdownItem
                                                key="delete"
                                                endContent={
                                                    <Icons.GoTrash size={15} />
                                                }
                                                className={cn(
                                                    'text-danger',
                                                    !showDelete && 'hidden'
                                                )}
                                                color="danger"
                                            >
                                                Delete
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </SortableItem>
                ))}
            </SortableContext>
        </DndContext>
    )
}

export default SortableList

SortableList.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired,
    onContextAction: PropTypes.func,
    navigation: PropTypes.func,
    viewIcon: PropTypes.bool,
    showDelete: PropTypes.bool,
    showArchive: PropTypes.bool,
    showManage: PropTypes.bool,
}

SortableItem.propTypes = {
    children: PropTypes.node.isRequired,
    id: PropTypes.string.isRequired,
    href: PropTypes.string,
}
