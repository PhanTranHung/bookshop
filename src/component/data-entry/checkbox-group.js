import React, { useState, useEffect } from "react";
import { Checkbox } from "antd";
import "./checkbox-group.css";

function CheckboxGroup({
  options = [],
  drawBack = 0,
  itemLayout,
  onChange,
  ...props
}) {
  // console.log("CHANGE");
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    onChange(selected);
    // eslint-disable-next-line
  }, [selected]);
  const handle = (e) => {
    if (selected.indexOf(e.target.value) >= 0)
      setSelected(selected.filter((item) => item !== e.target.value));
    else setSelected([...selected, e.target.value]);
  };

  return (
    <div>
      {options.map((item) => (
        <div
          key={item.value}
          className="checkbox-item_medium"
          style={{ paddingLeft: `${drawBack}px` }}
        >
          <Checkbox
            checked={selected.indexOf(item.value) >= 0}
            name={item.value}
            value={item.value}
            onChange={(e) => handle(e)}
          >
            {item.label}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
