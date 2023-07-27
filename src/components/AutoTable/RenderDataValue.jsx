import AutoTable from "./AutoTable";
import RenderPrimitive from "../RenderPrimitive";
import { getDataType, nonePrimitiveTypes } from "../../utils";

function RenderDataValue({ val, tableClass, tableIndex, options }) {
  if (nonePrimitiveTypes.some((n) => n === getDataType(val)))
    return (
      <AutoTable
        data={val}
        tableClass={tableClass}
        tableIndex={tableIndex + 1}
        options={options}
      />
    );
  return <RenderPrimitive value={val} />;
}

export default RenderDataValue;
