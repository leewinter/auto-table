import { useMemo } from "react";
import { getDataType } from "../../utils";
import RenderBoolValue from "./RenderBoolValue";

function RenderPrimitive({ value }) {
  const type = useMemo(() => {
    return getDataType(value);
  }, [value]);

  if (type === "boolean") return <RenderBoolValue value={value} />;

  return <span>{value}</span>;
}

export default RenderPrimitive;
