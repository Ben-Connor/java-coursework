import { CalendarDateTime } from "@internationalized/date"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock } from "lucide-react"
import { useRef, useState } from "react"
import { DateValue, TimeValue, useDateSegment, useInteractOutside, useLocale, useTimeField } from "react-aria"
import { 
    DateFieldState,
    DatePickerStateOptions,
    DateSegment as IDateSegment,
    useDatePickerState,
    useTimeFieldState
} from "react-stately"
import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Toggle } from "@/components/ui/toggle"
import { DialogPopover, PopoverContent, PopoverTrigger } from "./dialog-popover"
import { DATE_FORMAT } from "@/lib/consts"

interface DateSegmentProps {
    segment: IDateSegment
    state: DateFieldState
}

const DateSegment = ({segment, state}: DateSegmentProps) => {
    const ref = useRef(null)

    const {segmentProps: {...segmentProps}} = useDateSegment(segment, state, ref)

    return (
        <div {...segmentProps} ref={ref}
             className={cn("focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none", segment.type !== "literal" ? "px-[1px]" : "", segment.isPlaceholder ? "text-muted-foreground" : "")}>
            {segment.text}
        </div>
    )
}

const TimeField = ({hasTime, onHasTimeChange, disabled, ...props}: {
    disabled: boolean
    hasTime: boolean
    onHasTimeChange: (hasTime: boolean) => void
    value: TimeValue | null
    onChange: (value: TimeValue | null) => void
}) => {
    const ref = useRef<HTMLDivElement | null>(null)

    const {locale} = useLocale()
    const state = useTimeFieldState({
        ...props,
        locale,
    })

    useTimeField(props, state, ref)

    return (
        <div className={cn("mt-1 flex items-center space-x-2 pt-4", disabled ? "cursor-not-allowed opacity-70" : "")}>
            <Toggle
                disabled={disabled}
                pressed={hasTime}
                onPressedChange={onHasTimeChange}
                size="lg"
                variant="outline"
                aria-label="Toggle time"
            >
                <Clock size="16px"/>
            </Toggle>
            {hasTime && (
                <div
                    ref={ref}
                    className="inline-flex h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    {state.segments.map((segment, i) => (
                        <DateSegment key={i} segment={segment} state={state}/>
                    ))}
                </div>
            )}
        </div>
    )
}

const dateToCalendarDateTime = (date: Date | null): CalendarDateTime | null => {
    if (!date) return null

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const millisecond = date.getMilliseconds()

    return new CalendarDateTime(year, month, day, hour, minute, second, millisecond)
}

interface DatePickerProps {
    value?: { date?: Date | undefined, hasTime: boolean }
    onChange: (value: { date: Date | undefined, hasTime: boolean }) => void
    isDisabled?: boolean
}

export const DialogFormDatetimePicker = (props: DatePickerProps) => {
    const contentRef = useRef<HTMLDivElement | null>(null)

    const [open, setOpen] = useState(false)
    const hasTime = props.value?.hasTime || false

    const onChangeWrapper = (value: DateValue | null, newHasTime?: boolean) => {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        props.onChange({date: value?.toDate(timeZone), hasTime: newHasTime ?? hasTime})
    }
    const datePickerProps: DatePickerStateOptions<CalendarDateTime> = {
        value: props.value?.date ? dateToCalendarDateTime(props.value.date) : undefined,
        onChange: onChangeWrapper,
        isDisabled: props.isDisabled,
        granularity: "minute",
    }

    const state = useDatePickerState(datePickerProps)
    useInteractOutside({
        ref: contentRef,
        onInteractOutside: () => {
            setOpen(false)
        },
    })

    const dateDisplayFormat = hasTime ? `${DATE_FORMAT} HH:mm` : DATE_FORMAT

    return (
        <DialogPopover open={open} onOpenChange={setOpen} aria-label="Date Time Picker">
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "flex h-12 min-w-[240px] justify-start text-left",
                        !props.value && "text-muted-foreground",
                    )}
                >
                    <CalendarIcon className="mr-2 size-4"/>
                    {props.value?.date ? format(props.value.date, dateDisplayFormat) : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent ref={contentRef} className="w-auto" align="start">
                <Calendar
                    mode="single"
                    selected={props.value?.date || undefined}
                    onSelect={value => onChangeWrapper(dateToCalendarDateTime(value ?? null))}
                    initialFocus
                    footer={
                        <TimeField
                            aria-label="Time Picker"
                            disabled={!props.value?.date}
                            hasTime={hasTime}
                            onHasTimeChange={newHasTime =>
                                onChangeWrapper(dateToCalendarDateTime(props.value?.date ?? null), newHasTime)
                            }
                            value={hasTime && !!state.timeValue ? state.timeValue : null}
                            onChange={(value: TimeValue | null) => value && state.setTimeValue(value)}
                        />
                    }
                />
            </PopoverContent>
        </DialogPopover>
    )
}
