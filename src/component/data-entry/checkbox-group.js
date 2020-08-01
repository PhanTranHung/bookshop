import React, {useState, useEffect} from "react";
import {Checkbox} from "antd";
import "../css/checkbox-group.css";
import {useMounted} from "../../helper/useMounted";

function CheckboxGroup({
                         options = [],
                         drawBack = 0,
                         itemLayout,
                         value = [],
                         onChange,
                       }) {
  const [selected, setSelected] = useState(value);
  const isMounted = useMounted();

  useEffect(() => {
    if (onChange && isMounted) onChange(selected);
    // eslint-disable-next-line
  }, [selected]);

  useEffect(() => {
    setSelected(value);
    // eslint-disable-next-line
  }, [value]);

  const handle = (event) => {
    if (selected.indexOf(event.target.value) >= 0)
      setSelected(selected.filter((item) => item !== event.target.value));
    else setSelected([...selected, event.target.value]);
  };

  return (
    <div>
      {options.map((item) => (
        <div
          key={item.value}
          className="checkbox-item_medium"
          style={{paddingLeft: `${drawBack}px`}}
        >
          <Checkbox
            checked={selected.length > 0 && selected.indexOf(item.value) >= 0}
            name={item.value}
            value={item.value}
            onChange={(event) => handle(event)}
          >
            {item.label}
          </Checkbox>
        </div>
      ))}
    </div>
  );
}

export default CheckboxGroup;
