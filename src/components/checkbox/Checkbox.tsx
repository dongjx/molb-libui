import * as React from "react";

const styles = require("./checkbox.scss");

export interface ICheckboxProps {
  onCheckboxClick: any;
  checked: boolean;
  disabled: boolean;
  clickableElement?: JSX.Element | string;
}

interface ICheckboxState {
  checked: boolean;
}

export class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
  public static defaultProps: Partial<ICheckboxProps> = {
    checked: false,
    disabled: false
  };

  public static getDerivedStateFromProps = (
    props: ICheckboxProps,
    state: ICheckboxState
  ) => (state.checked === props.checked ? null : { checked: props.checked });

  constructor(props: ICheckboxProps) {
    super(props);
    this.state = { checked: props.checked };
  }

  public render() {
    const { checked, disabled } = this.props;
    return (
      <div className={styles.checkboxWrapper} data-scrollpoint={true}>
        <span className={styles.checkbox}>
          <input
            type="checkbox"
            checked={checked}
            disabled={disabled}
            className={styles.checkboxInput}
            onChange={this.onCheckboxClick}
          />
          <span className={styles.inner} />
        </span>
        {this.props.clickableElement && (
          <span
            className={styles.clickableElement}
            onClick={this.onClickableElementClick}
          >
            {this.props.clickableElement}
          </span>
        )}
      </div>
    );
  }

  private onCheckboxClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.onCheckedValueChange(event.target.checked);
  };

  private onClickableElementClick = () => {
    if (this.props.disabled) {
      return;
    }
    this.onCheckedValueChange(!this.state.checked);
  };

  private onCheckedValueChange(newValue: boolean) {
    this.setState({ checked: newValue });
    this.props.onCheckboxClick(newValue);
  }
}
