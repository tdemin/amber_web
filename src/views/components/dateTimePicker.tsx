import React from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";

import {
    dateTimeToUnixTime,
    DateFormat,
    TimeFormat,
} from "../../helpers/datetime";

interface Props {
    dateRequired?: boolean;
    timeRequired?: boolean;
    initialValue?: number;
    onChange?: (date: number) => void;
}
interface State {
    date: Date;
}
export class DateTimePicker extends React.Component<Props, State> {
    state = {
        date: new Date(this.props.initialValue || 0),
    };
    componentDidUpdate = (_p: Props, prevState: State) => {
        if (this.props.onChange) {
            if (prevState.date !== this.state.date) {
                this.props.onChange(dateTimeToUnixTime(this.state.date));
            }
        }
    };
    updateDate = (e: React.FormEvent<HTMLInputElement>) => {
        // event input is a string of format like "2020-01-03"
        // eslint-disable-next-line react/no-access-state-in-setstate
        const date = parse(e.currentTarget.value, DateFormat, this.state.date);
        this.setState({ date });
    };
    updateTime = (e: React.FormEvent<HTMLInputElement>) => {
        // input is a string of format like "13:45"
        // eslint-disable-next-line react/no-access-state-in-setstate
        const date = parse(e.currentTarget.value, TimeFormat, this.state.date);
        this.setState({ date });
    };
    inputInitValue = (date: Date, fmt: string): string => {
        if (date.getTime()) {
            return format(date, fmt);
        }
        return "";
    };
    // TODO: add an "Unset" button
    render = () => (
        <div>
            <input
                type="date"
                onChange={this.updateDate}
                value={this.inputInitValue(this.state.date, DateFormat)}
                required={this.props.dateRequired}
            />
            <input
                type="time"
                onChange={this.updateTime}
                value={this.inputInitValue(this.state.date, TimeFormat)}
                required={this.props.timeRequired}
            />
        </div>
    );
}

export default DateTimePicker;
