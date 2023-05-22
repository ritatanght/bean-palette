import RotateLoader from "react-spinners/RotateLoader";

export default function Loading() {
  return (
    <div className="loader">
      <RotateLoader
        color="#dbc1ac"
        loading={true}
        size={15}
        aria-label="Loading Spinner"
      />
    </div>
  );
}
