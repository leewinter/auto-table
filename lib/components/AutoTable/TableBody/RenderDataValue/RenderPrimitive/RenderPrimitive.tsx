import { useMemo } from "react";
import { getDataType } from "@lib/utils";
import RenderBoolValue from "@lib/components/AutoTable/TableBody/RenderDataValue/RenderPrimitive/RenderBoolValue";

type RenderPrimitiveParams = {
  value: object;
};

export const RenderPrimitive: React.FC<RenderPrimitiveParams> = ({ value }) => {
  const type = useMemo(() => {
    return getDataType(value);
  }, [value]);

  if (type === "boolean") return <RenderBoolValue value={Boolean(value)} />;

  return <span>{`${value}`}</span>;
};
