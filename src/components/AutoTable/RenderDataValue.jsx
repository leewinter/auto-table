import AutoTable from "./AutoTable";
import RenderPrimitive from "../RenderPrimitive";
import { getDataType, nonePrimitiveTypes } from "../../utils";

function RenderDataValue({ val, tableClass, tableIndex }) {
  if (nonePrimitiveTypes.some((n) => n === getDataType(val)))
    return (
      <AutoTable
        data={val}
        tableClass={tableClass}
        tableIndex={tableIndex + 1}
      />
    );
  return <RenderPrimitive value={val} />;
}

export default RenderDataValue;
