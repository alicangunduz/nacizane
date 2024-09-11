import React from "react";
import Link from "next/link";

function Announcement() {
  return (
    <div className="bg-primary px-4 py-3 text-white">
      <p className="text-center text-sm font-medium">
        Nacizane open-source bir üründür.{" "}
        <Link
          href="https://github.com/alicangunduz/nacizane"
          className="inline-block underline"
          target="_blank"
        >
          Buraya tıklayarak contributor olabilirsiniz.
        </Link>
      </p>
    </div>
  );
}

export default Announcement;
