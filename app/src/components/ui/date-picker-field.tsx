import type { FC } from "react";
import { Calendar, DateField, DatePicker } from "@heroui/react";
import { parseDate, type DateValue } from "@internationalized/date";
import { cn } from "@/lib/utils";

interface DatePickerFieldProps {
  value?: string | null;
  onChange?: (value: string | null) => void;
  ariaLabel: string;
  isDisabled?: boolean;
  className?: string;
}

function toCalendarDate(value: string | null | undefined): DateValue | null {
  if (!value) {
    return null;
  }

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

function toIsoDate(value: DateValue | null): string | null {
  if (!value) {
    return null;
  }

  return `${value.year}-${String(value.month).padStart(2, "0")}-${String(value.day).padStart(2, "0")}`;
}

export const DatePickerField: FC<DatePickerFieldProps> = ({
  value,
  onChange,
  ariaLabel,
  isDisabled,
  className,
}) => {
  return (
    <DatePicker
      className={cn("w-52", className)}
      value={toCalendarDate(value)}
      onChange={(next) => onChange?.(toIsoDate(next))}
      isDisabled={isDisabled}
      aria-label={ariaLabel}
    >
      <DateField.Group fullWidth>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>
        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>
      <DatePicker.Popover className="min-w-63 w-auto max-w-none">
        <Calendar aria-label={ariaLabel}>
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>
          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>
          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
};
