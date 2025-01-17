/* eslint-disable react/prop-types */
import React from "react";

import { t } from "ttag";

import PopoverWithTrigger from "metabase/components/PopoverWithTrigger";
import DimensionInfoPopover from "metabase/components/MetadataInfo/DimensionInfoPopover";
import CheckBox from "metabase/core/components/CheckBox";
import StackedCheckBox from "metabase/components/StackedCheckBox";

export default function FieldsPicker({
  className,
  dimensions,
  selectedDimensions,
  isAll,
  isNone,
  onSelectAll,
  onSelectNone,
  onToggleDimension,
  triggerElement = t`Columns`,
  disableSelected,
  ...props
}) {
  const selected = new Set(selectedDimensions.map(d => d.key()));
  return (
    <PopoverWithTrigger
      triggerElement={triggerElement}
      triggerClasses={className}
      sizeToFit
      {...props}
    >
      <ul className="pt1">
        {(onSelectAll || onSelectNone) && (
          <li className="px1 pb1 flex align-center border-bottom mb1">
            <StackedCheckBox
              label={isAll && onSelectNone ? t`Select none` : t`Select all`}
              checked={isAll}
              indeterminate={!isAll && !isNone}
              disabled={isAll && !onSelectNone}
              onChange={() => {
                if (isAll) {
                  onSelectNone();
                } else {
                  onSelectAll();
                }
              }}
              className="mr1"
            />
          </li>
        )}
        {dimensions.map(dimension => (
          <DimensionInfoPopover dimension={dimension} key={dimension.key()}>
            <li className="px1 pb1 flex align-center">
              <CheckBox
                disabled={disableSelected && selected.has(dimension.key())}
                checked={selected.has(dimension.key())}
                label={dimension.displayName()}
                onChange={() => {
                  onToggleDimension(dimension, !selected.has(dimension.key()));
                }}
                className="mr1"
              />
            </li>
          </DimensionInfoPopover>
        ))}
      </ul>
    </PopoverWithTrigger>
  );
}
