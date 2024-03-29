import { AutoTable } from "@lib/components/AutoTable";
import RenderPrimitive from "@lib/components/AutoTable/TableBody/RenderDataValue/RenderPrimitive";
import { nonePrimitiveTypes, getDataType } from "@lib/utils";
import { AutoTableOptions } from "@lib/components/AutoTable/AutoTable";

interface RenderDataValueParams {
  value: unknown;
  tableIndex: number;
  options: AutoTableOptions;
}

export const RenderDataValue: React.FC<RenderDataValueParams> = (props) => {
  const { value, tableIndex, options } = props;

  if (nonePrimitiveTypes.some((n) => n === getDataType(value)))
    return (
      <AutoTable data={value} tableIndex={tableIndex + 1} options={options} />
    );
  return <RenderPrimitive value={value as object} />;
};
