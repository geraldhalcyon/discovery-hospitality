import Link from "next/link";
export default function Custom404() {
  return (
    <div className="bg-gray-100 flex py-[50px] flex-col items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-[140px] mb-[15px] font-bold text-primary">404</h1>
        <p className="text-2xl font-semibold text-gray-600 mb-4">
          Page Not Found
        </p>
        <p className="text-lg text-gray-700 mb-8">
          {`The page you're looking for doesn't exist.`}
        </p>
        <Link
          href="/"
          className="text-lg font-semibold text-blue-500 hover:underline"
        >
          Go back to homepage
        </Link>
      </div>
    </div>
  );
}
