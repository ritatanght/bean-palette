"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container page-container">
      <h2 className="text-center">Oops! Something went wrong.</h2>
      <button className="error__btn btn" onClick={() => reset()}>
        Try again
      </button>
    </div>
  );
}
