interface RenderBoolValueParams {
  value: boolean;
}

export const RenderBoolValue: React.FC<RenderBoolValueParams> = (props) => {
  const { value } = props;

  return <span>{value ? "✔" : "✘"}</span>;
};
