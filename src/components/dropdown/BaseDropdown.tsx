import classNames from "classnames";
import React from "react";
import Select, { components } from "react-select";
import { SelectComponentsConfig } from "react-select/lib/components";
import { Props } from "react-select/lib/Select";
import { Size } from "../EnumValues";
import { Icon } from "../icons/Icon";

import "./library.scss.nomangle";

const styles = require("./styles.scss");

// Use custom components so we can assign our own styles via CSS modules
// Ignore usages of any since we're just doing thin wrappers over react-select
const Menu = (props: any) => (
  <components.Menu className={styles.menu} {...props}>
    {props.children}
  </components.Menu>
);

const Control = (props: any) => (
  <components.Control className={styles.dropdownControl} {...props}>
    {props.children}
  </components.Control>
);

const DropdownIndicator = (props: any) =>
  components.DropdownIndicator && (
    <components.DropdownIndicator
      className={styles.dropdownIndicator}
      {...props}
    >
      <Icon type="dropdown" className={styles.dropdownIcon} />
    </components.DropdownIndicator>
  );

const MenuList = (props: any) => (
  <components.MenuList className={styles.menuList} {...props}>
    {props.children}
  </components.MenuList>
);

const Option = (props: any) => (
  <components.Option className={styles.option} {...props}>
    {props.children}
  </components.Option>
);

const Placeholder = (props: any) => (
  <components.Placeholder className={styles.placeholder} {...props}>
    {props.children}
  </components.Placeholder>
);

const ValueContainer = (props: any) => (
  <components.ValueContainer className={styles.valueContainer} {...props}>
    {props.children}
  </components.ValueContainer>
);

const SingleValue = (props: any) => (
  <components.SingleValue className={styles.singleValue} {...props}>
    {props.children}
  </components.SingleValue>
);

export const baseComponents: SelectComponentsConfig<any> = {
  Menu,
  Control,
  DropdownIndicator,
  MenuList,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
};

export interface IBaseDropdownProps<T> extends Props<T> {
  components?: SelectComponentsConfig<T>;
  styles?: any;
  size?: Size;
}

export const baseComponentOptionStyles = (base: any) => ({
  ...base,
  color: "#313840 !important",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "16px !important"
});

export const baseComponentMenuStyles = (base: any) => {
  return {
    ...base,
    borderRadius: "3px !important",
    marginTop: "1px !important",
    boxShadow:
      "0 4px 12px 0 rgba(0, 0, 0, 0.03), 0 7px 25px 0 rgba(0, 0, 0, 0.03), 0 0 0 1px rgba(0, 0, 0, 0.03); !important"
  };
};

export class BaseDropdown<T> extends React.Component<
  IBaseDropdownProps<T>,
  {}
> {
  public static defaultProps: Partial<IBaseDropdownProps<any>> = {
    components: {}
  };

  public render() {
    const customComponents = {
      ...baseComponents,
      ...this.props.components
    };

    return (
      <Select
        className={classNames(
          styles.dropdown,
          this.props.size,
          this.props.className
        )}
        menuPortalTarget={document.body}
        classNamePrefix="dropdown"
        components={customComponents}
        styles={this.props.styles || {}}
        isSearchable={this.props.isSearchable || false}
        {...this.props}
      />
    );
  }
}
