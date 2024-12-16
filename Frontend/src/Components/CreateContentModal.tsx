//controlled component
interface propsF {
  open: boolean;
}
export function CreateContentModal(props: propsF) {
  return (
    <div>
      {props.open && (
        <div className="w-screen h-screen bg-red-200 fixed top-0 left-0 opacity-40"></div>
      )}
    </div>
  );
}
