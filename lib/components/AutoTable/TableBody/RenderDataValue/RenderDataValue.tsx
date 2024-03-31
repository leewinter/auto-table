import { AutoTable } from "@lib/components/AutoTable";
import RenderPrimitive from "@lib/components/AutoTable/TableBody/RenderDataValue/RenderPrimitive";
import { nonePrimitiveTypes, getDataType } from "@lib/utils";
import { TableContainerOptions } from "@lib/components/AutoTable/TableContainer/TableContainer";

interface RenderDataValueParams {
  value: unknown;
  tableIndex: number;
  options: TableContainerOptions;
}

export const RenderDataValue: React.FC<RenderDataValueParams> = (props) => {
  const { value, tableIndex, options } = props;

  if (nonePrimitiveTypes.some((n) => n === getDataType(value)))
    return (
      <AutoTable data={value} tableIndex={tableIndex + 1} options={options} />
    );
  return <RenderPrimitive value={value as object} />;
};
