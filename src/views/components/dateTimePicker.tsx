import React from "react";
import parse from "date-fns/parse";
import format from "date-fns/format";

import {
    dateTimeToUnixTime,
    DateFormat,
    TimeFormat,
} from "../../helpers/datetime";

/** Helper for `new Date()`. */
const FDate = (v: number | undefined) => new Date(v || 0);

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
        date: FDate(this.props.initialValue),
    };
    componentDidUpdate = (prevProps: Props, prevState: State) => {
        if (this.props.onChange) {
            if (prevState.date !== this.state.date) {
                this.props.onChange(dateTimeToUnixTime(this.state.date));
            }
        }
        if (this.props.initialValue !== prevProps.initialValue) {
            this.setState({ date: FDate(this.props.initialValue) });
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
    // TODO: add an "Unset" button
    render = () => {
        let date, time;
        try {
            date = format(this.state.date, DateFormat);
            time = format(this.state.date, TimeFormat);
        } catch {
            date = "";
            time = "";
        }
        return (
            <div>
                <input
                    type="date"
                    onChange={this.updateDate}
                    value={date}
                    required={this.props.dateRequired}
                />
                <input
                    type="time"
                    onChange={this.updateTime}
                    value={time}
                    required={this.props.timeRequired}
                />
            </div>
        );
    };
}

export default DateTimePicker;
